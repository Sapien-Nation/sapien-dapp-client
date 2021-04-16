/* istanbul ignore file */

import { matchSorter } from 'match-sorter';

// types
import type { NextApiRequest, NextApiResponse } from 'next';

// mocks
import { mockTribe } from 'tools/mocks/tribe';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const description =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
  const tribes = [mockTribe({ description: description })];

  res.status(200).json({
    suggested: matchSorter(tribes, req.query.search as string, {
      keys: ['name'],
    }),
    tribes: matchSorter(tribes, req.query.search as string, {
      keys: ['name'],
    }),
  });
};

export default handler;
