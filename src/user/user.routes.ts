import { Router } from 'express';
import userController from './user.controller';

const routes = Router();

routes.get('/', async (_, res) => {
  const users = await userController.list();
  res.json(users);
});

routes.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await userController.get(userId);
  res.json(user);
});

routes.post('/', async (req, res) => {
  const { email, name } = req.body;
  const user = await userController.create({
    email,
    name,
  });
  res.json(user);
});

routes.put('/:userId', async (req, res) => {
  const { email, name } = req.body;
  const { userId } = req.params;
  const user = await userController.update(userId, {
    email,
    name,
  });
  res.json(user);
});

routes.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await userController.remove(userId);
  res.json(user);
});

export default routes;
