import mongoose from 'mongoose';

import { getConfigItem } from './utils';

function connect(): void {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  mongoose.set('debug', process.env.NODE_ENV === 'dev');

  mongoose.connect(
    getConfigItem(
      process.env.NODE_ENV === 'test'
        ? 'TEST_MONGO_CONNECTION_STRING'
        : 'MONGO_CONNECTION_STRING',
    ),
  );
}

export default connect;
