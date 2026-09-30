import { Request, Response } from 'express';
import { ProductService, createProductSchema } from '../services/product.service';

export class ProductController {
  static async create(req: Request, res: Response) {
    const body = createProductSchema.parse(req.body);
    const product = await ProductService.create(body);
    return res.status(201).json(product);
  }

  static async list(req: Request, res: Response) {
    const products = await ProductService.list();
    return res.json(products);
  }
}
