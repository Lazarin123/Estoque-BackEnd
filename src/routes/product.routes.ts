import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const productRoutes = Router();

productRoutes.post('/', ProductController.create);
productRoutes.get('/', ProductController.list);

export { productRoutes };
