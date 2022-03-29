// utils
import { mockRouter, render, screen, setAllTribes } from 'utils/testUtils';

// components
import IndexPage from 'pages/index';

// mocks
import { mockProfileTribe } from 'tools/mocks/tribe';

const push = jest.fn();
const router = mockRouter({
  push,
});

const mainTribe = mockProfileTribe({ isMain: true });
beforeEach(() => {
  setAllTribes([mainTribe, mockProfileTribe({ id: '2000' })]);
});

test('should direct to main tribe', () => {
  render(<IndexPage />, { route: router });

  expect(push).toHaveBeenCalledWith(`/tribes/${mainTribe.id}/123456789`);
});
