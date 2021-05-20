// components
import ForgotPage from 'pages/forgot-password';

// utils
import { render, screen, user, waitFor } from 'utils/testUtils';

// mock data
const email = 'jhon@doe.com';
const error = 'Error';
const forgot = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const getSendButton = () =>
  screen.getByRole('button', { name: 'Send request' });
const renderComponent = () => render(<ForgotPage />, { user: { forgot } });

test('renders correctly', async () => {
  renderComponent();

  expect(
    screen.getByRole('heading', { name: 'Forgotten Password' })
  ).toBeInTheDocument();

  // links
  expect(screen.getByRole('link', { name: 'Log in' })).toHaveAttribute(
    'href',
    '/login'
  );

  user.type(
    screen.getByRole('textbox', { name: 'Email, phone number, or username' }),
    email
  );

  // onError
  forgot.mockRejectedValueOnce(error);
  user.click(getSendButton());

  await waitFor(() => {
    expect(forgot).toHaveBeenCalledWith(email);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  // onSuccess
  jest.clearAllMocks();
  user.click(getSendButton());
  await waitFor(() => {
    expect(forgot).toHaveBeenCalledWith(email);
  });

  expect(screen.getByText('Request sent successfully')).toBeInTheDocument();
  expect(
    screen.getByText(
      /if the email and username provided match, you will receive instructions to set a new password shortly\./i
    )
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Got it!' })).toHaveAttribute(
    'href',
    '/login'
  );

  // resend
  user.click(
    screen.getByRole('button', {
      name: /resend/i,
    })
  );
  expect(
    screen.getByRole('heading', { name: 'Forgotten Password' })
  ).toBeInTheDocument();
});
