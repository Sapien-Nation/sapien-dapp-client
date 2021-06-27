// api
import { login } from 'api/authentication';

// components
import LoginPage from 'pages/login';

// utils
import { render, screen, user, waitFor } from 'utils/testUtils';

// mocks
import { mockRouter } from 'mocks/routes';

// mock data
jest.mock('api/authentication');

const token = '123';
const torus = '123';
(login as jest.Mock).mockResolvedValue({ token, torus });

const email = 'jhon@doe.com';
const password = '123456';
const userAgent = 'user agent';
const error = 'Error';
const setSession = jest.fn();

(global as any).userAgent = jest.spyOn(navigator, 'userAgent', 'get');
(global as any).userAgent.mockReturnValue(userAgent);

beforeEach(() => {
  jest.clearAllMocks();
});

const getLoginButton = () => screen.getByRole('button', { name: 'Log In' });

const renderComponent = () =>
  render(<LoginPage />, { user: { setSession }, router: mockRouter() });

test('renders correctly', async () => {
  renderComponent();

  expect(screen.getByRole('heading', { name: 'Log in' })).toBeInTheDocument();

  // links
  expect(
    screen.getByRole('link', { name: 'Forgot password?' })
  ).toHaveAttribute('href', '/forgot-password');
  expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute(
    'href',
    '/register'
  );

  // validation
  user.click(getLoginButton());
  await waitFor(() => {
    expect(login).not.toHaveBeenCalled();
  });

  user.type(screen.getByRole('textbox', { name: 'Email or username' }), email);
  user.type(screen.getByLabelText(/password/i), password);

  // onError
  (login as jest.Mock).mockRejectedValueOnce(error);
  user.click(getLoginButton());

  await waitFor(() => {
    expect(login).toHaveBeenCalledWith({
      email,
      password,
      redirect: '/',
      client: userAgent,
      remember: true,
    });

    expect(screen.getByText(error)).toBeInTheDocument();
  });

  // onSuccess
  jest.clearAllMocks();
  user.click(screen.getByRole('checkbox', { name: 'Remember me' }));
  user.click(getLoginButton());
  await waitFor(() => {
    expect(login).toHaveBeenCalledWith({
      email,
      password,
      redirect: '/',
      client: userAgent,
      remember: false,
    });

    expect(setSession).toHaveBeenCalledWith({ torus, token });
  });
});