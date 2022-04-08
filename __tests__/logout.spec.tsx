import * as Sentry from '@sentry/nextjs';

// api
import { logout } from 'api/authentication';

// utils
import {
  mockRouter,
  render,
  setLoggedOutUser,
  setUser,
  waitFor,
  screen,
} from 'utils/testUtils';

// components
import LogoutPage from 'pages/logout';

// mocks
jest.mock('@sentry/nextjs');
jest.mock('api/authentication');

const push = jest.fn();
const router = mockRouter({
  push,
  pathname: '/logout',
});

(logout as jest.Mock).mockReturnValue({});

const renderPage = () => render(<LogoutPage />, { route: router });

test('should not call logout when logged out', () => {
  setLoggedOutUser();
  renderPage();

  expect(logout).not.toHaveBeenCalled();
  expect(push).toHaveBeenCalledWith('/');
});

describe('', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const error = { message: 'Error' };

  test('on error', async () => {
    const loggedInUser = setUser();
    (logout as jest.Mock).mockRejectedValueOnce(error.message);
    renderPage();

    await waitFor(() => {
      expect(logout).toHaveBeenCalledWith({ email: loggedInUser.email });
    });
    expect(Sentry.captureException).toHaveBeenCalledWith(error.message);

    expect(push).toHaveBeenCalledWith('/');
  });

  test('on success', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.queryByText(error.message)).not.toBeInTheDocument();
    });

    expect(push).toHaveBeenCalledWith('/');
  });
});
