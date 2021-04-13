import { cache } from 'swr';

// utils
import { render, screen, user } from 'utils/tests';

// mocks
import { mockTribe, mockTribePermission } from 'tools/mocks/tribe';

// components
import { TribeNavigation } from 'components/navigation/TribeNavigation';

// mocks
const permissions = mockTribePermission();
const tribes = [mockTribe({ permissions })];

const defaultProps = {
  tribes,
};

const renderComponent = (props = {}) =>
  render(<TribeNavigation {...defaultProps} {...props} />);

beforeEach(() => {
  localStorage?.clear();

  cache.set('/api/tribes/followed', { tribes });
  jest.clearAllMocks();
});

test('render correctly', () => {
  renderComponent();

  // default render
  expect(screen.getByRole('heading', { name: 'Sapien' })).toBeInTheDocument();

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
    tribes: [newTribes],
  });

  renderComponent({ tribes: newTribes });

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
