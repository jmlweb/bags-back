import User, { UserDocument } from './user.model';

async function list(): Promise<UserDocument[]> {
  return User.find();
}

async function get(id: string): Promise<UserDocument | null> {
  return User.findById(id);
}

async function create(userData: {
  email: string;
  name: string;
}): Promise<UserDocument> {
  const user = new User(userData);
  return user.save();
}

async function update(
  id: string,
  userData: {
    email: string;
    name: string;
  },
): Promise<UserDocument | null> {
  return User.findByIdAndUpdate(id, userData, { new: true });
}

async function remove(id: string): Promise<UserDocument | null> {
  return User.findByIdAndDelete(id);
}

export default {
  list,
  get,
  create,
  update,
  remove,
};
