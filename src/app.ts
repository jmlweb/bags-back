import express from 'express';
import bodyParser from 'body-parser';

import userRoutes from './user/user.routes';
import connect from './connect';

const app = express();

app.use(bodyParser.json());

connect();

app.get('/', (_, res) => {
  res.send('it works!');
});

app.use('/user', userRoutes);

export default app;
