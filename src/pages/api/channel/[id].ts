/* istanbul ignore file */

// types
import type { NextApiRequest, NextApiResponse } from 'next';

// mocks
import { mockChannel } from 'tools/mocks/channel';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    return res.status(200).json({
      channel: mockChannel(),
    });
  } else if (req.method === 'GET') {
    return res.status(200).json({
      channel: mockChannel({
        membersCount: 420,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis purus elit, quis eleifend nunc ullamcor per id. liquam molestie orci et gravida mollis.',
      }),
    });
  } else {
    return res.status(500).send('Weirdo');
  }
};

export default handler;
