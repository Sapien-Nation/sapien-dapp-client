/* istanbul ignore file */
// types
import type { NextApiResponse } from 'next';

// mocks
import { mockTopics } from 'tools/mocks/topics';

const handler = (_: unknown, res: NextApiResponse) =>
  res.status(200).json({ topics: mockTopics() });

export default handler;
