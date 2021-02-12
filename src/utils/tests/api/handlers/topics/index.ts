import { rest } from 'msw';

// mocks
import { mockTopics } from 'mocks/topics';

const handlers = [
  rest.get('/api/topics/all', async (req, res, ctx) => {
    return res(ctx.json({ topics: mockTopics() }));
  })
];
export default handlers;
