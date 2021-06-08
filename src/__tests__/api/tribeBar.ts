import axios from 'api';
import MockAdapter from 'axios-mock-adapter';

// api
import * as tribeBarAPI from 'api/tribeBar';

// mocks
import { mockTribe } from 'tools/mocks/tribeBar';

// Mock data
const response = { message: 'Some error' };
const mock = new MockAdapter(axios);

test('createTribe', async () => {
  const tribe = mockTribe();
  const body = new FormData();

  // on success
  mock.onPost('api/tribe/create', body).replyOnce(200, tribe);
  await expect(tribeBarAPI.createTribe(body)).resolves.toEqual(tribe);

  // on error
  mock.onPost('api/tribe/create', body).replyOnce(400, response);
  await expect(tribeBarAPI.createTribe(body)).rejects.toEqual(response.message);
});
