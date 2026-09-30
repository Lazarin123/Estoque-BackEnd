import { prisma } from '../utils/prisma';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
});

export class ProductService {
  static async create(data: z.infer<typeof createProductSchema>) {
    return prisma.product.create({
      data,
    });
  }

  static async list() {
    return prisma.product.findMany();
  }

  static async findById(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error('Produto não encontrado.');
    return product;
  }
}
