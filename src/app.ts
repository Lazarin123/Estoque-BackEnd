import express from 'express';
import cors from 'cors';
import { productRoutes } from './routes/product.routes';
import { orderRoutes } from './routes/order.routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use(errorHandler);

export { app };
