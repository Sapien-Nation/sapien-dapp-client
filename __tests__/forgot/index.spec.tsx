// api
import { forgot } from 'api/authentication';

// utils
import {
  mockRouter,
  render,
  screen,
  setLoggedOutUser,
  user,
  waitFor,
} from 'utils/testUtils';

// components
import ForgotPasswordPage from 'pages/forgot/index';

// mocks
jest.mock('api/authentication');

const push = jest.fn();
const router = mockRouter({
  push,
});

(forgot as jest.Mock).mockReturnValue(null);

beforeEach(() => {
  setLoggedOutUser();
});

const error = { message: 'Error' };
const getSignupButton = () =>
  screen.getByRole('button', { name: 'Send Email' });

test('forgot page', async () => {
  render(<ForgotPasswordPage />, { route: router });

  expect(screen.getByRole('img', { name: 'auth-image' })).toHaveAttribute(
    'src',
    'https://d1bdmh0gdusw0k.cloudfront.net/images/misc/asset2.jpeg'
  );
  expect(screen.getByRole('img', { name: 'sapien' })).toHaveAttribute(
    'src',
    '/images/logooutlined.svg'
  );

  expect(
    (
      screen.getByRole('link', {
        name: 'Remember Password?',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/login');

  expect(
    screen.getByRole('heading', {
      name: 'Reset your password',
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      'Enter the email address associated with your account and we will send you a link to reset your password.'
    )
  ).toBeInTheDocument();

  const email = 'jhon@doe.com';
  await user.type(screen.getByRole('textbox', { name: 'email' }), email);

  // on error
  (forgot as jest.Mock).mockRejectedValueOnce(error.message);
  await user.click(getSignupButton());

  expect(await screen.findByText(error.message)).toBeInTheDocument();
  expect(forgot).toHaveBeenCalledWith({ email });

  // on success
  (forgot as jest.Mock).mockClear();
  await user.click(getSignupButton());

  await waitFor(() => {
    expect(forgot).toHaveBeenCalledWith({ email });
  });

  expect(push).toHaveBeenCalledWith('/forgot/success');
});
