import { prisma } from '../utils/prisma';
import { z } from 'zod';

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ).min(1),
});

export class OrderService {
  static async createOrder(data: z.infer<typeof createOrderSchema>) {
    // Transação ACID com isolamento e verificação atômica de estoque para evitar concorrência
    return await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      for (const item of data.items) {
        // 1. Bloqueia a linha do produto no banco (Pessimistic Locking implícito no update atômico)
        // Verificamos se o estoque é suficiente na própria query atômica para race conditions.
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Produto com ID ${item.productId} não encontrado.`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Estoque insuficiente para o produto: ${product.name}. Disponível: ${product.stock}, Solicitado: ${item.quantity}`);
        }

        // 2. Decrementa o estoque de forma segura e atômica condicional
        const updatedProduct = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: { gte: item.quantity }, // Garante que o estoque ainda é suficiente (Optimistic/Atomic check)
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        if (updatedProduct.count === 0) {
          throw new Error(`Concorrência detectada: Estoque esgotado para o produto ${product.name} no momento da compra.`);
        }

        const itemTotal = Number(product.price) * item.quantity;
        totalAmount += itemTotal;

        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });
      }

      // 3. Cria o pedido efetivamente
      const order = await tx.order.create({
        data: {
          totalAmount,
          status: 'PAID',
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
        },
      });

      return order;
    });
  }
}
