import { cache } from 'swr';

// utils
import { render, screen, user, within } from 'utils/tests';

// components
import { Navbar } from 'components/navigation';

// mocks
import { mockUser } from 'tools/mocks/user';

const renderComponent = () => render(<Navbar />);

beforeEach(() => {
  cache.set('/api/users/me', { me: mockUser() });

  jest.clearAllMocks();
});

test('logged in', () => {
  const { rerender } = renderComponent();

  const userMenu = screen.getByRole('button', {
    name: /slowpoke/i,
  });
  expect(userMenu).toBeInTheDocument();
  expect(within(userMenu).getByRole('img', { hidden: true })).toHaveAttribute(
    'alt',
    'slowpoke'
  );

  // menu
  user.click(userMenu);

  const logoutItem = screen.getByRole('menuitem', { name: /logout/i });
  expect(logoutItem).toBeInTheDocument();

  // logout
  cache.set('/api/users/me', undefined);
  user.click(logoutItem);
  rerender(<Navbar />);
  expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
});

test('logged out', () => {
  cache.set('/api/users/me', undefined);

  renderComponent();

  expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
});
