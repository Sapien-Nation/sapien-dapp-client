// api
import { joinTribe } from 'api/tribe';

// utils
import { render } from 'utils/testUtils';

// components
import InvitePage from 'pages/join/[tribeID]';

// mocks
import { mockProfileTribe } from 'tools/mocks/tribe';

jest.mock('api/tribe');

const tribe = mockProfileTribe();
(joinTribe as jest.Mock).mockResolvedValue(tribe);

const push = jest.fn();

test('can join', () => {
  render(<InvitePage />, { route: { query: { tribeID: tribe.id } } });

  expect(true).toBe(true);
});
