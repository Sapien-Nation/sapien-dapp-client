// utils
import { render, screen, setLoggedOutUser } from 'utils/testUtils';

// components
import RegisterPage from 'pages/register';

beforeEach(() => {
  setLoggedOutUser();
});

test('can register', () => {
  render(<RegisterPage />);

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
});
