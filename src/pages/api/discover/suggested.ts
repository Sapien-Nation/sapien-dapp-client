/* istanbul ignore file */

import { matchSorter } from 'match-sorter';

// types
import type { Tribe } from 'tools/types/tribe';
import type { NextApiRequest, NextApiResponse } from 'next';

// fixtures
import tribe1 from 'tools/fixtures/tribe_1.json';
import tribe2 from 'tools/fixtures/tribe_2.json';
import tribe3 from 'tools/fixtures/tribe_3.json';
import tribe4 from 'tools/fixtures/tribe_4.json';
import topic1 from 'tools/fixtures/topic_1.json';
import topic2 from 'tools/fixtures/topic_2.json';
import topic3 from 'tools/fixtures/topic_3.json';

// mocks
import { mockTribe } from 'tools/mocks/tribe';

const description =
  'Lorem ipsum dolor sit ame, consectetur adipiscing elit. Ut mattis purus elit, quis elei fend consectetur adipiscing elit sit ame...';

const tribes: Array<any> = [
  mockTribe({ ...tribe1, description, topics: [topic1.name] }),
  mockTribe({ ...tribe2, description, topics: [] }),
  mockTribe({ ...tribe3, description, topics: [topic3.name] }),
  mockTribe({ ...tribe4, description, topics: [topic2.name] }),
];

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<{ cursor: null; hasMore: boolean; tribes: Array<Tribe> }>
) => {
  const { query } = req;
  const { searchTerm, topic } = query;

  let response = tribes;
  if (searchTerm) {
    response = matchSorter(tribes, String(searchTerm), {
      keys: ['name'],
    });
  }

  if (topic) {
    response = tribes.filter(({ topics }) => topics.includes(String(topic)));
  }

  res.status(200).json({
    cursor: null,
    hasMore: false,
    tribes: response,
  });
};

export default handler;
