/* istanbul ignore file */
// types
import type { NextApiRequest, NextApiResponse } from 'next';

// fixutures
import channel_1 from 'tools/fixtures/channel_1.json';
import channel_2 from 'tools/fixtures/channel_2.json';
import channel_3 from 'tools/fixtures/channel_3.json';
import channel_4 from 'tools/fixtures/channel_4.json';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  return res.status(200).json({
    channels: id === '1' ? [channel_2, channel_3, channel_4] : [channel_1],
  });
};

export default handler;
