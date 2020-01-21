import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../../src/app';
import truncate from '../../util/truncate';
import factory from '../../factories';

describe('UserController', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('shound encrypt user password when new user created', async () => {
    const user = await factory.create('User', { password: '123456' });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('shound be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should no be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should update the user', async () => {
    const user = await factory.attrs('User', {
      email: 'jonasvargaski@hotmail.com',
    });

    await request(app)
      .post('/users')
      .send(user);
  });
});
