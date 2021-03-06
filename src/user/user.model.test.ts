import mongoose from 'mongoose';

import User from './user.model';
import connect from '../connect';

describe('User model', () => {
  beforeAll(async () => {
    connect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('validation throws an error when the name of the user is not correct', async () => {
    const user = new User({
      email: 'testuser@test.com',
      name: 'testuser',
    });
    expect(user.validate).toThrow();
  });

  it('validation not throws for valid data', async () => {
    const user = new User({
      email: 'testuser@test.com',
      name: 'Test user',
    });

    await user.save();

    const results = await User.find();
    expect(results).toHaveLength(1);
  });
});
