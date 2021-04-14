/* istanbul ignore file */
import cookie from 'cookie';

// types
import type { NextApiResponse, NextApiRequest } from 'next';

// mocks
import { mockUser } from 'tools/mocks/user';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('sapien_v3_12', '123456', {
        httpOnly: true,
      })
    );
    return res.status(200).json(mockUser());
  } else {
    return res.status(500).send('Weirdo');
  }
};

export default handler;
