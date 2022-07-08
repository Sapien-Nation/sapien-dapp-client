// api
import { register } from 'api/authentication';

// utils
import {
  render,
  setLoggedOutUser,
  screen,
  user,
  mockRouter,
  waitFor,
} from 'utils/testUtils';

// components
import RegisterPage from 'pages/register';

// mocks
jest.mock('api/authentication');

const push = jest.fn();
const router = mockRouter({
  pathname: '/register',
  push,
});

(register as jest.Mock).mockReturnValue({
  token: 'token',
  torus: 'torus',
  refresh: 'refresh',
});

beforeEach(() => {
  setLoggedOutUser();
});

const error = { message: 'Error' };
const getSignupButton = () => screen.getByRole('button', { name: 'Sign up' });

test('can register', async () => {
  render(<RegisterPage />, { route: router });

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
      name: 'Create your Sapien account',
    })
  ).toBeInTheDocument();

  expect(
    (
      screen.getByRole('link', {
        name: 'Terms & Conditions',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/terms');
  expect(
    (
      screen.getByRole('link', {
        name: 'login',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/login');

  const email = 'jhon@doe.com';
  const username = 'jhondoe';
  const password = 'Sapien123456';

  await user.type(screen.getByRole('textbox', { name: 'email' }), email);
  await user.type(screen.getByRole('textbox', { name: 'username' }), username);

  const passwordInputs = screen.getAllByLabelText(/Password/i);
  await user.type(passwordInputs[0], password);
  await user.type(passwordInputs[1], `${password}r`);

  // no checked
  await user.click(getSignupButton());

  expect(await screen.findByText(/Please check/i)).toBeInTheDocument();

  await user.click(
    screen.getByRole('checkbox', {
      name: 'I have read and agree to the Terms & Conditions Please check',
    })
  );

  // on password don't match
  await user.click(getSignupButton());

  const matchErrors = await screen.findAllByText(/Passwords must match/i);
  expect(matchErrors.length).toBe(2);
  expect(register).not.toHaveBeenCalled();

  // on api error
  await user.clear(passwordInputs[1]);
  await user.type(passwordInputs[1], password);

  (register as jest.Mock).mockRejectedValueOnce(error.message);
  await user.click(getSignupButton());

  expect(await screen.findByText(error.message)).toBeInTheDocument();
  expect(register).toHaveBeenCalledWith({
    email,
    client: 'user-agent-test',
    redirect: '/',
    password,
    username,
    firstName: '',
    lastName: '',
  });

  // on success
  (register as jest.Mock).mockClear();
  await user.click(getSignupButton());

  await waitFor(() => {
    expect(register).toHaveBeenCalledWith({
      email,
      client: 'user-agent-test',
      redirect: '/',
      password,
      username,
      firstName: '',
      lastName: '',
    });
  });

  expect(push).toHaveBeenCalledWith('/');
});
