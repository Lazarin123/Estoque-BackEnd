import { Request, Response } from 'express';
import { OrderService, createOrderSchema } from '../services/order.service';

export class OrderController {
  static async create(req: Request, res: Response) {
    const body = createOrderSchema.parse(req.body);
    const order = await OrderService.createOrder(body);
    return res.status(201).json(order);
  }
}
