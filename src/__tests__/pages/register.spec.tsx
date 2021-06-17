// components
import RegisterPage from 'pages/register';

// utils
import { render, screen, user, waitFor } from 'utils/testUtils';

// mock data
const email = 'jhon@doe.com';
const displayName = 'Jonathan Doe';
const password = '123456';
const username = 'johniedoe';
const userAgent = 'user agent';
const error = 'Error';
const register = jest.fn();

(global as any).userAgent = jest.spyOn(navigator, 'userAgent', 'get');
(global as any).userAgent.mockReturnValue(userAgent);

beforeEach(() => {
  jest.clearAllMocks();
});

const getSignupButton = () => screen.getByRole('button', { name: 'Sign Up' });

const renderComponent = () => render(<RegisterPage />, { user: { register } });

test('renders correctly', async () => {
  renderComponent();

  expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();

  // link
  expect(screen.getByRole('link', { name: 'Log in' })).toHaveAttribute(
    'href',
    '/login'
  );

  // validation
  user.click(getSignupButton());
  await waitFor(() => {
    expect(register).not.toHaveBeenCalled();
  });

  user.type(screen.getByLabelText(/email or phone number/i), email);
  user.type(screen.getByLabelText(/username*/i), username);
  user.type(screen.getByLabelText(/Name*/), displayName);
  user.type(screen.getByLabelText(/password*/i), password);
  user.click(
    screen.getByRole('checkbox', {
      name: 'I have read and agree to the Terms & Conditions',
    })
  );

  user.click(
    screen.getByRole('checkbox', {
      name: 'I understand that a wallet will be created for me',
    })
  );

  // onError
  register.mockRejectedValueOnce(error);
  user.click(getSignupButton());

  await waitFor(() => {
    expect(register).toHaveBeenCalledWith({
      email,
      username,
      displayName,
      password,
      redirect: '/',
      client: userAgent,
    });

    expect(screen.getByText(error)).toBeInTheDocument();
  });

  // onSuccess
  jest.clearAllMocks();
  user.click(getSignupButton());
  await waitFor(() => {
    expect(register).toHaveBeenCalledWith({
      email,
      username,
      displayName,
      password,
      redirect: '/',
      client: userAgent,
    });
  });
});
