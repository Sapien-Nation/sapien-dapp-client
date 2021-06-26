// api
import { forgot } from 'api/authentication';

// components
import ForgotPage from 'pages/change-password';

// utils
import { render, screen, user, waitFor } from 'utils/testUtils';

// mocks
import { mockRouter } from 'mocks/routes';

// mock data
jest.mock('api/authentication');

(forgot as jest.Mock).mockResolvedValue(true);

const email = 'jhon@doe.com';
const error = 'Error';

beforeEach(() => {
  jest.clearAllMocks();
});

const getSendButton = () =>
  screen.getByRole('button', { name: 'Send request' });

const renderComponent = () => render(<ForgotPage />, { router: mockRouter() });

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
  (forgot as jest.Mock).mockRejectedValueOnce(error);
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
  expect(screen.getByRole('button', { name: 'Got it!' })).toBeInTheDocument();

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
