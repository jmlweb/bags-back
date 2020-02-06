import Order, { OrderDocument } from './order.model';

type OrderParams = {
  bagsCount: number;
  user: string;
};

async function list(): Promise<OrderDocument[]> {
  return Order.find().populate('user');
}

async function get(id: string): Promise<OrderDocument | null> {
  return Order.findById(id).populate('user');
}

async function create(orderData: OrderParams): Promise<OrderDocument> {
  const order = new Order(orderData);
  return order.save();
}

async function update(
  id: string,
  orderData: Pick<OrderParams, 'bagsCount'>,
): Promise<OrderDocument | null> {
  return Order.findByIdAndUpdate(id, orderData, { new: true }).populate('user');
}

async function remove(id: string): Promise<OrderDocument | null> {
  return Order.findByIdAndDelete(id).populate('user');
}

export default {
  list,
  get,
  create,
  update,
  remove,
};
