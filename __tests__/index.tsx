// utils
import { mockRouter, render, screen, setAllTribes } from 'utils/testUtils';

// components
import IndexPage from 'pages/index';

// mocks
import { mockProfileTribe, mockProfileTribeRoom } from 'tools/mocks/tribe';

const room = mockProfileTribeRoom();
const mainTribe = mockProfileTribe({ rooms: [room] });
beforeEach(() => {
  setAllTribes([mainTribe, mockProfileTribe({ id: '2000' })]);
});

const push = jest.fn();
const router = mockRouter({
  push,
  query: { tribeID: mainTribe.id, viewID: room.id },
});

test('should direct to main tribe', () => {
  render(<IndexPage />, { route: router });

  expect(push).toHaveBeenCalledWith(`/tribes/${mainTribe.id}/${room.id}`);
});
