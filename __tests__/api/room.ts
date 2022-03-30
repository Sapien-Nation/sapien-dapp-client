jest.unmock('axios');
import axios from 'api';
import MockAdapter from 'axios-mock-adapter';

// api
import { createRoom } from 'api/room';

// mocks
import { mockProfileTribe } from 'tools/mocks/tribe';

// —————————————————————————————————————————————————————————————————————————————————————————————————
const error = { message: 'Some error' };

let mock: MockAdapter;
beforeEach(() => {
  mock = new MockAdapter(axios);
});

test('createRoom', async () => {
  const tribe = mockProfileTribe();
  const apiURL = '/api/v3/room';
  const body = {
    name: 'name',
    tribeId: '1000',
  };

  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(createRoom(body)).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200, tribe);
  await expect(createRoom(body)).resolves.toEqual(tribe);
});
