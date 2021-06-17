// components
import LoginPage from 'pages/login';

// utils
import { render, screen, user, waitFor } from 'utils/testUtils';

// mock data
const email = 'jhon@doe.com';
const password = '123456';
const userAgent = 'user agent';
const error = 'Error';
const login = jest.fn();

(global as any).userAgent = jest.spyOn(navigator, 'userAgent', 'get');
(global as any).userAgent.mockReturnValue(userAgent);

beforeEach(() => {
  jest.clearAllMocks();
});

const getLoginButton = () => screen.getByRole('button', { name: 'Log In' });

const renderComponent = () => render(<LoginPage />, { user: { login } });

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

  user.type(
    screen.getByRole('textbox', { name: 'Email, phone number, or username' }),
    email
  );
  user.type(screen.getByLabelText(/password/i), password);
  user.click(screen.getByRole('checkbox', { name: 'Remember me' }));

  // onError
  login.mockRejectedValueOnce(error);
  user.click(getLoginButton());

  await waitFor(() => {
    expect(login).toHaveBeenCalledWith({
      email,
      password,
      redirect: '/',
      client: userAgent,
    });

    expect(screen.getByText(error)).toBeInTheDocument();
  });

  // onSuccess
  jest.clearAllMocks();
  user.click(getLoginButton());
  await waitFor(() => {
    expect(login).toHaveBeenCalledWith({
      email,
      password,
      redirect: '/',
      client: userAgent,
    });
  });
});
