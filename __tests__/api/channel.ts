jest.unmock('axios');
import axios from 'api';
import MockAdapter from 'axios-mock-adapter';

// api
import { createChannel, uploadImage } from 'api/channel';

// —————————————————————————————————————————————————————————————————————————————————————————————————
const error = { message: 'Some error' };

let mock: MockAdapter;
beforeEach(() => {
  mock = new MockAdapter(axios);
});

test('createChannel', async () => {
  const apiURL = '/api/v3/channel';
  const body = {
    avatar: 'avatar',
    cover: 'cover',
    name: 'name',
    tribeId: '1',
  };

  const response = {};
  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(createChannel(body)).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200, response);
  await expect(createChannel(body)).resolves.toEqual(response);
});

test('uploadImage', async () => {
  const apiURL = '/api/v3/channel/image';
  const body = new FormData();

  const response = {};
  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(uploadImage(body)).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200, response);
  await expect(uploadImage(body)).resolves.toEqual(response);
});
