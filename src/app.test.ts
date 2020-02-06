import request from 'supertest';
import mongoose from 'mongoose';

import app from './app';
import { User } from './user';

describe('app', () => {
  let user1Id: string;
  let user2Id: string;
  beforeAll(async () => {
    await User.deleteMany({});
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
});
