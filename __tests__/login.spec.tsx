// api
import { login } from 'api/authentication';

// utils
import {
  render,
  screen,
  setLoggedOutUser,
  user,
  waitFor,
  mockRouter,
} from 'utils/testUtils';

// components
import LoginPage from 'pages/login';

// mocks
jest.mock('api/authentication');

const push = jest.fn();
const router = mockRouter({
  push,
});

(login as jest.Mock).mockReturnValue({
  token: 'token',
  torus: 'torus',
  refresh: 'refresh',
});

beforeEach(() => {
  setLoggedOutUser();
});

const error = { message: 'Error' };
const getSignupButton = () => screen.getByRole('button', { name: 'Sign in' });

test('can login', async () => {
  render(<LoginPage />, { route: router });

  expect(screen.getByRole('img', { name: 'auth-image' })).toHaveAttribute(
    'src',
    'https://d1bdmh0gdusw0k.cloudfront.net/images/misc/asset2.jpeg'
  );
  expect(screen.getByRole('img', { name: 'sapien' })).toHaveAttribute(
    'src',
    '/images/logooutlined.svg'
  );

  expect(
    screen.getByRole('heading', {
      name: 'Log in',
    })
  ).toBeInTheDocument();

  expect(
    (
      screen.getByRole('link', {
        name: 'Forgot your password?',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/forgot');
  expect(
    (
      screen.getByRole('link', {
        name: 'register',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/register');

  const email = 'jhon@doe.com';
  const password = '12345678';
  user.type(screen.getByRole('textbox', { name: 'email' }), email);
  user.type(screen.getByLabelText(/Password/i), password);

  // on error
  (login as jest.Mock).mockRejectedValueOnce(error.message);
  user.click(getSignupButton());

  expect(await screen.findByText(error.message)).toBeInTheDocument();
  expect(login).toHaveBeenCalledWith({
    email,
    client: 'user-agent-test',
    redirect: '/',
    password,
  });

  // on success
  (login as jest.Mock).mockClear();
  user.click(getSignupButton());

  await waitFor(() => {
    expect(login).toHaveBeenCalledWith({
      email,
      client: 'user-agent-test',
      redirect: '/',
      password,
    });
  });

  expect(push).toHaveBeenCalledWith('/');
});
