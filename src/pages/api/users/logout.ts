/* istanbul ignore file */
import cookie from 'cookie';

// types
import type { NextApiResponse, NextApiRequest } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('sapien_v3_12', '', {
        maxAge: 0,
      })
    );
    return res.status(200).json(true);
  } else {
    return res.status(500).send('Weirdo');
  }
};

export default handler;
