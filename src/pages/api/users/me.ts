/* istanbul ignore file */
// types
import type { NextApiRequest, NextApiResponse } from 'next';

// mocks
import { mockUser } from 'mocks/user';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return (
    res
      .status(200)
      // @ts-ignore
      .json({ me: req.cookies.sapien_v3_12 ? mockUser() : undefined })
  );
};

export default handler;
