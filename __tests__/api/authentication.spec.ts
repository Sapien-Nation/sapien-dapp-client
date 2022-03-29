jest.unmock('axios');
import { authInstance } from 'api';
import MockAdapter from 'axios-mock-adapter';

// api
import {
  changePassword,
  forgot,
  login,
  logout,
  refresh,
  register,
} from 'api/authentication';

// —————————————————————————————————————————————————————————————————————————————————————————————————
const error = { message: 'Some error' };

let mock: MockAdapter;
beforeEach(() => {
  mock = new MockAdapter(authInstance);
});

test('login', async () => {
  const apiURL = '/api/v3/auth/login';
  const body = {
    email: 'jhondoe@test.com',
    password: 'Sapien123456',
    redirect: '/',
    client: 'client',
  };

  const response = { token: 'token', torus: 'torus', refresh: 'refresh' };
  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(login(body)).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200, response);
  await expect(login(body)).resolves.toEqual(response);
});

test('register', async () => {
  const apiURL = '/api/v3/auth/signup';
  const body = {
    email: 'jhondoe@test.com',
    password: 'Sapien123456',
    redirect: '/',
    client: 'client',
    firstName: '',
    username: 'JohnDoe',
    lastName: '',
  };

  const response = { token: 'token', torus: 'torus', refresh: 'refresh' };
  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(register(body)).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200, response);
  await expect(register(body)).resolves.toEqual(response);
});

test('logout', async () => {
  const apiURL = '/api/v3/auth/logout';
  const body = {
    email: 'jhondoe@test.com',
  };

  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(logout(body)).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200);
  await expect(logout(body)).resolves.toBeTruthy();
});

test('forgot', async () => {
  const apiURL = '/api/v3/user/change-password';
  const body = {
    email: 'jhondoe@test.com',
  };

  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(forgot(body)).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200);
  await expect(forgot(body)).resolves.toBeTruthy();
});

test('changePassword', async () => {
  const apiURL = '/api/v3/user/reset-password';
  const body = {
    token: 'token',
    password: 'Sapien123456',
  };

  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(changePassword(body)).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200);
  await expect(changePassword(body)).resolves.toBeTruthy();
});

test('refresh', async () => {
  const apiURL = '/api/v3/auth/refresh';

  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(refresh('refresh', 'type')).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200);
  await expect(refresh('refresh', 'type')).resolves.toBeTruthy();
});
