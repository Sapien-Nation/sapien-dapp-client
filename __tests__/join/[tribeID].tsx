// api
import { joinTribe } from 'api/tribe';

// utils
import { render, setAllTribes, waitFor } from 'utils/testUtils';

// components
import InvitePage from 'pages/join/[tribeID]';

// mocks
import { mockProfileTribe } from 'tools/mocks/tribe';

jest.mock('api/tribe');

const tribe = mockProfileTribe();
(joinTribe as jest.Mock).mockResolvedValue(tribe);

const push = jest.fn();

beforeEach(() => {
  setAllTribes();
});

test('on error', () => {
  (joinTribe as jest.Mock).mockRejectedValueOnce({});

  render(<InvitePage />, { route: { push, query: { tribeID: tribe.id } } });

  expect(push).not.toHaveBeenCalled();
});

test('on success', async () => {
  render(<InvitePage />, { route: { push, query: { tribeID: tribe.id } } });

  await waitFor(() => {
    expect(push).toHaveBeenCalledWith(`/tribes/${tribe.id}/home`);
  });

  expect(joinTribe).toHaveBeenCalledWith(tribe.id);
});
