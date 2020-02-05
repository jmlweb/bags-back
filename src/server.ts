import express from 'express';
import { getConfigItem } from './utils';

const createServer = (app: express.Application) => {
  const port = getConfigItem('port');
  app.listen(port, () => {
    // tslint:disable-next-line no-console
    console.info(`🎺 Listening on port ${port}`);
  });
  return app;
};

export default createServer;
