import { rest } from 'msw';

// mocks
import { mockTribes } from 'mocks/tribe';

const handlers = [
  rest.get('/api/tribes', async (req, res, ctx) => {
    return res(ctx.json({ tribes: mockTribes() }));
  })
];
export default handlers;
