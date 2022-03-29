jest.unmock('axios');
import axios from 'api';
import MockAdapter from 'axios-mock-adapter';

// api
import { createTribe, uploadImage } from 'api/tribe';

// mocks
import { mockProfileTribe } from 'tools/mocks/tribe';

// —————————————————————————————————————————————————————————————————————————————————————————————————
const error = { message: 'Some error' };

let mock: MockAdapter;
beforeEach(() => {
  mock = new MockAdapter(axios);
});

test('createTribe', async () => {
  const tribe = mockProfileTribe();
  const apiURL = '/api/v3/tribe';
  const body = {
    avatar: 'avatar',
    cover: 'cover',
    description: 'description',
    identifier: 'identifier',
    name: 'name',
  };

  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(createTribe(body)).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200, tribe);
  await expect(createTribe(body)).resolves.toEqual(tribe);
});

test('uploadImage', async () => {
  const tribe = mockProfileTribe();
  const apiURL = '/api/v3/tribe/image';
  const body = new FormData();

  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(uploadImage(body)).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200, tribe);
  await expect(uploadImage(body)).resolves.toEqual(tribe);
});
