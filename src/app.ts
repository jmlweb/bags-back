import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';

import userRoutes from './user';
import orderRoutes from './order';
import connect from './connect';

const app = express();

app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('combined'));
}

connect();

app.get('/', (_, res) => {
  res.send('it works!');
});

app.use('/user', userRoutes);
app.use('/order', orderRoutes);

export default app;
