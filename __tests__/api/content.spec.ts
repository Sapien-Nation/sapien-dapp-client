jest.unmock('axios');
import axios from 'api';
import MockAdapter from 'axios-mock-adapter';

// api
import { createContent, deleteContent, uploadContentMedia } from 'api/content';

// —————————————————————————————————————————————————————————————————————————————————————————————————
const error = { message: 'Some error' };

let mock: MockAdapter;
beforeEach(() => {
  mock = new MockAdapter(axios);
});

test('uploadContentMedia', async () => {
  const apiURL = '/api/v3/content/image';
  const body = new FormData();
  const response = {};

  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(uploadContentMedia(body)).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200, response);
  await expect(uploadContentMedia(body)).resolves.toEqual(response);
});

test('createContent', async () => {
  const apiURL = '/api/v3/post';
  const body = {
    data: 'data',
    groupId: '1',
  };
  const response = {};

  // on error
  mock.onPost(apiURL).reply(400, error);
  await expect(createContent(body)).rejects.toEqual(error.message);

  // on success
  mock.onPost(apiURL).reply(200, response);
  await expect(createContent(body)).resolves.toEqual(response);
});

test('deleteContent', async () => {
  const contentID = '1';
  const apiURL = `/api/v3/post/${contentID}`;
  const response = {};

  // on error
  mock.onDelete(apiURL).reply(400, error);
  await expect(deleteContent(contentID)).rejects.toEqual(error.message);

  // on success
  mock.onDelete(apiURL).reply(200, response);
  await expect(deleteContent(contentID)).resolves.toEqual(response);
});
