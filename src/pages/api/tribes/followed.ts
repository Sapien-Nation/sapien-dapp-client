/* istanbul ignore file */
// types
import type { NextApiResponse } from 'next';

// mocks
import { mockTribes } from 'tools/mocks/tribe';

const handler = (_: unknown, res: NextApiResponse) =>
  res.status(200).json({ tribes: mockTribes() });

export default handler;
