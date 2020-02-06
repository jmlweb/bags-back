import mongoose, { Document, Schema } from 'mongoose';

import { validateBagsCount } from '../utils';

export interface OrderDocument extends Document {
  bagsCount: number;
  user: string;
}

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  bagsCount: {
    type: Number,
    default: 0,
    validate: {
      validator: validateBagsCount,
    },
  },
});

const Order = mongoose.model<OrderDocument>('Order', OrderSchema);

export default Order;
