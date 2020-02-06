import express from 'express';
import bodyParser from 'body-parser';

import userRoutes from './user';
import orderRoutes from './order';
import connect from './connect';

const app = express();

app.use(bodyParser.json());

connect();

app.get('/', (_, res) => {
  res.send('it works!');
});

app.use('/user', userRoutes);
app.use('/order', orderRoutes);

export default app;
