import { cache } from 'swr';

// utils
import { render, screen, user } from 'utils/tests';

// mocks
import { mockRouter } from 'mocks/routes';
import { mockTribe, mockTribePermission } from 'tools/mocks/tribe';

// components
import { TribeNavigation } from 'components/navigation/TribeNavigation';

// mocks
const permissions = mockTribePermission();
const tribes = [mockTribe({ permissions })];
const mockRoute = mockRouter({
  query: {
    tribeid: tribes[0].id,
  },
});
const renderComponent = (router = mockRoute) =>
  render(<TribeNavigation />, { router });

beforeEach(() => {
  jest.clearAllMocks();
});

test('render correctly', () => {
  cache.set('/api/tribes/followed', { tribes });
  renderComponent();

  // default render
  expect(screen.getByRole('button', { name: 'Sapien' })).toBeInTheDocument();

  // click badge store
  user.click(screen.getByRole('button', { name: /badge store/i }));

  // click tribe name
  user.click(screen.getByRole('button', { name: 'Sapien' }));

  // create channel
  expect(
    screen.queryByRole('button', {
      name: /create channel/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', {
      name: /create square/i,
    })
  ).toBeInTheDocument();
});

test('cant see add channel button', () => {
  const newTribes = [
    mockTribe({ permissions: { canAddChannel: false, canAddSquare: false } }),
  ];
  cache.set('/api/tribes/followed', {
    tribes: newTribes,
  });

  renderComponent({
    ...mockRoute,
    query: {
      tribeid: newTribes[0].id,
    },
  });

  expect(
    screen.queryByRole('button', {
      name: /create channel/i,
    })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', {
      name: /create square/i,
    })
  ).not.toBeInTheDocument();
});
