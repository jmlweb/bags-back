import request from 'supertest';
import mongoose from 'mongoose';

import app from './app';
import { User } from './user';
import { Order } from './order';

describe('app', () => {
  let user1Id: string;
  let user2Id: string;
  let order1Id: string;
  let order2Id: string;
  beforeAll(async () => {
    await User.deleteMany({});
    await Order.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should respond to a GET method to the root', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should be possible to create some users', async () => {
    const user1Response = await request(app)
      .post('/user')
      .send({
        name: 'José Manuel Lucas',
        email: 'josemanuel@jmlweb.es',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    const user2Response = await request(app)
      .post('/user')
      .send({
        name: 'John Doe',
        email: 'johndoe@foo.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    user1Id = user1Response.body._id;
    user2Id = user2Response.body._id;
    expect(user1Response.body.email).toBe('josemanuel@jmlweb.es');
    expect(user2Response.body.email).toBe('johndoe@foo.com');
  });

  it('should be possible to fetch all users', async () => {
    const response = await request(app).get('/user');
    expect(response.body.length).toBe(2);
  });

  it('should be possible to fetch a user by id', async () => {
    const response = await request(app).get(`/user/${user1Id}`);
    expect(response.body.name).toBe('José Manuel Lucas');
  });

  it('should be possible to delete a user', async () => {
    const response = await request(app).delete(`/user/${user1Id}`);
    expect(response.body.name).toBe('José Manuel Lucas');
    const listResponse = await request(app).get('/user');
    expect(listResponse.body.length).toBe(1);
  });

  it('should be possible to update a user', async () => {
    const response = await request(app)
      .put(`/user/${user2Id}`)
      .send({
        name: 'John Doe',
        email: 'john@doe.com',
      });
    expect(response.body.email).toBe('john@doe.com');
  });

  it('should be possible to create an order for an user', async () => {
    const response1 = await request(app)
      .post('/order')
      .send({
        user: user2Id,
        bagsCount: 2,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    order1Id = response1.body._id;
    expect(response1.body.bagsCount).toBe(2);
    const response2 = await request(app)
      .post('/order')
      .send({
        user: user2Id,
        bagsCount: 1,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    order2Id = response2.body._id;
    expect(response2.body.bagsCount).toBe(1);
  });
  it('should be possible to update an order', async () => {
    const response = await request(app)
      .put(`/order/${order1Id}`)
      .send({
        bagsCount: 4,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(response.body.bagsCount).toBe(4);
  });
  it('should be possible to remove an order', async () => {
    const response = await request(app)
      .delete(`/order/${order2Id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(response.body.bagsCount).toBe(1);
  });
  it('when removing an user, the associated orders are removed also', async () => {
    const response1 = await request(app).delete(`/user/${user2Id}`);
    expect(response1.body.name).toBe('John Doe');
    const response2 = await request(app).get('/user');
    expect(response2.body.length).toBe(0);
    const response3 = await request(app).get('/order');
    expect(response3.body.length).toBe(0);
  });
});
