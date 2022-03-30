// utils
import { mockRouter, render, setAllTribes } from 'utils/testUtils';

// components
import IndexPage from 'pages/index';

// mocks
import { mockProfileTribe } from 'tools/mocks/tribe';

const mainTribe = mockProfileTribe();
beforeEach(() => {
  setAllTribes([mainTribe]);
});

const push = jest.fn();
const router = mockRouter({
  push,
  query: { tribeID: mainTribe.id, viewID: 'home' },
});

test('should direct to main tribe', () => {
  render(<IndexPage />, { route: router });

  expect(push).toHaveBeenCalledWith(`/tribes/${mainTribe.id}/home`);
});
