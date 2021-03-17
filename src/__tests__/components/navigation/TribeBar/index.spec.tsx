import { cache } from 'swr';

// types
import type { Tribe } from 'tools/types/tribe';

// utils
import { render, screen, user } from 'utils/tests';

// mocks
import { mockTribes } from 'tools/mocks/tribe';
import { mockUser } from 'tools/mocks/user';

// components
import TribeBar from 'components/navigation/TribeBar';

// mocks
const tribes: Array<Tribe> = mockTribes();

const createTribe = jest.fn();
const defaultProps = {
  createTribe,
  tribes,
};
const renderComponent = (props = {}) =>
  render(<TribeBar {...defaultProps} {...props} />);

window.URL.createObjectURL = jest.fn();

afterEach(() => {
  (window as any).URL.createObjectURL.mockReset();
});

beforeEach(() => {
  localStorage?.clear();

  cache.set('/api/users/me', { me: mockUser() });
  cache.set('/api/tribes/followed', { tribes });

  jest.clearAllMocks();
});

test('render correctly', () => {
  const mockDate = new Date('2021-02-08T00:00:00.943Z');
  jest
    .spyOn(Date.prototype, 'toISOString')
    .mockReturnValue(mockDate.toISOString());

  renderComponent();

  tribes.forEach((tribe) => {
    expect(screen.getByRole('button', { name: tribe.name })).toHaveTextContent(
      String(tribe.notificationNumber)
    );
  });

  expect(
    screen.getByRole('button', { name: /discover tribes/i })
  ).toBeInTheDocument();
  user.click(screen.getByRole('button', { name: /create tribe/i }));

  expect(createTribe).toHaveBeenCalled();
});
