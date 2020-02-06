import Order, { OrderDocument } from './order.model';

type OrderParams = {
  bagsCount: number;
  user: string;
};

async function list(): Promise<OrderDocument[]> {
  return Order.find();
}

async function get(id: string): Promise<OrderDocument | null> {
  return Order.findById(id);
}

async function create(orderData: OrderParams): Promise<OrderDocument> {
  const order = new Order(orderData);
  return order.save();
}

async function update(
  id: string,
  orderData: OrderParams,
): Promise<OrderDocument | null> {
  return Order.findByIdAndUpdate(id, orderData, { new: true });
}

async function remove(id: string): Promise<OrderDocument | null> {
  return Order.findByIdAndDelete(id);
}

export default {
  list,
  get,
  create,
  update,
  remove,
};
