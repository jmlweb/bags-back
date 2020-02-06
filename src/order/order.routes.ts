import { Router } from 'express';
import orderController from './order.controller';

const routes = Router();

routes.get('/', async (_, res) => {
  const orders = await orderController.list();
  res.json(orders);
});

routes.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const order = await orderController.get(orderId);
  res.json(order);
});

routes.post('/', async (req, res) => {
  const { user, bagsCount } = req.body;
  const order = await orderController.create({
    user,
    bagsCount,
  });
  res.json(order);
});

routes.put('/:orderId', async (req, res) => {
  const { bagsCount } = req.body;
  const { orderId } = req.params;
  const order = await orderController.update(orderId, {
    bagsCount,
  });
  res.json(order);
});

routes.delete('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const order = await orderController.remove(orderId);
  res.json(order);
});

export default routes;
