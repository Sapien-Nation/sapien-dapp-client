/* istanbul ignore file */
// types
import type { NextApiRequest, NextApiResponse } from 'next';

// mocks
import { mockUsers } from 'tools/mocks/user';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return res.status(200).send('Success');
  } else if (req.method === 'GET') {
    res.status(200).json({ users: mockUsers() });
  }
};

export default handler;
