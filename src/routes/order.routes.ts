import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

const orderRoutes = Router();

orderRoutes.post('/', OrderController.create);

export { orderRoutes };
