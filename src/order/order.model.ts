import mongoose, { Document, Schema } from 'mongoose';

import { UserDocument } from '../user';

export interface OrderDocument extends Document {
  bagsCount: number;
  user: UserDocument['_id'],
}

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  bagsCount: {
    type: Number,
    default: 0,
  }
});

const Order = mongoose.model<OrderDocument>('Order', OrderSchema);

export default Order;