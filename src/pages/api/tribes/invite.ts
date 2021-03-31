/* istanbul ignore file */
// types
import type { NextApiResponse } from 'next';

// mocks
import { mockUsers } from 'tools/mocks/user';

const handler = (_: unknown, res: NextApiResponse) =>
  res.status(200).json({ users: mockUsers() });

export default handler;
