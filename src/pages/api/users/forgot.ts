/* istanbul ignore file */

// types
import type { NextApiResponse, NextApiRequest } from 'next';

// mocks
import { mockUser } from 'mocks/user';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return res.status(200).json(mockUser());
  } else {
    return res.status(500).send('Weirdo');
  }
};

export default handler;
