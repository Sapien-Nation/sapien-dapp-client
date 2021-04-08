/* istanbul ignore file */
// types
import type { NextApiResponse } from 'next';

// mocks
import { mockChannel } from 'tools/mocks/channel';
import { mockTribes } from 'tools/mocks/tribe';

const handler = (_: unknown, res: NextApiResponse) =>
  res.status(200).json({
    tribes: mockTribes().map((tribe, index) => {
      if (index === 0) {
        return {
          ...tribe,
          channels: [mockChannel()],
        };
      }
      return tribe;
    }),
  });

export default handler;
