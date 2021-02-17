/* istanbul ignore file */

// types
import type { NextApiResponse, NextApiRequest } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return res.status(200).json('1001');
  } else {
    return res.status(500).send('Weirdo');
  }
};

export default handler;
