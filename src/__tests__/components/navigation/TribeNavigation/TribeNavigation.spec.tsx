import { cache } from 'swr';

// types
import type { Tribe } from 'tools/types/tribe';

// utils
import { render, screen, user } from 'utils/tests';

// mocks
import { mockTribe, mockTribes } from 'tools/mocks/tribe';

// components
import { TribeNavigation } from 'components/navigation/TribeNavigation';

// mocks
const tribes: Array<Tribe> = mockTribes();

const createChanel = jest.fn();
const defaultProps = {
  createChanel,
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
  user.click(
    screen.queryByRole('button', {
      name: /create channel/i,
    })
  );
  expect(createChanel).toHaveBeenCalled();
});

test('cant see add channel button', () => {
  const newTribes = [mockTribe({ permissions: { canAddChannel: false } })];
  cache.set('/api/tribes/followed', {
    tribes: [newTribes],
  });

  renderComponent({ tribes: newTribes });

  expect(
    screen.queryByRole('button', {
      name: /create channel/i,
    })
  ).not.toBeInTheDocument();
});
