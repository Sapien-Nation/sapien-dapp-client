jest.unmock('axios');
import { authInstance } from 'api';
import MockAdapter from 'axios-mock-adapter';

// api
import { login } from 'api/authentication';

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
