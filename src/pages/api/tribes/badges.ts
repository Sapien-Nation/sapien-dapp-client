/* istanbul ignore file */
// types
import type { NextApiResponse } from 'next';

// mocks
import { mockTribeBadges, mockSubscriptionBadges } from 'tools/mocks/badges';

const handler = (_: unknown, res: NextApiResponse) =>
  res.status(200).json({
    tribeBadges: mockTribeBadges(),
    subscriptionBadges: mockSubscriptionBadges(),
  });

export default handler;
