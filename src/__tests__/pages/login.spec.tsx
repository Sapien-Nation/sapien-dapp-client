// components
import LoginPage from 'pages/login';

// utils
import { render, screen } from 'utils/testUtils';

// const getLoginButton = () => screen.getByRole('button', { name: 'Log In' });

const login = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders correctly', () => {
  render(<LoginPage />, { user: { login } });

  expect(screen.getByRole('heading', { name: 'Log in' })).toBeInTheDocument();

  // links
  expect(
    screen.getByRole('link', { name: 'Forgot password?' })
  ).toHaveAttribute('href', '/forgot');
  expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute(
    'href',
    '/register'
  );

  // user.type(
  //   screen.getByRole('textbox', { name: 'Email, phone number, or username' }),
  //   'jhon@doe.com'
  // );
  // https://github.com/testing-library/dom-testing-library/issues/567
  // screen.debug(screen.getAllByLabelText(/password/));
  // user.click(screen.getByRole('checkbox', { name: 'Remember me' }));
  // user.click(getLoginButton());
});
