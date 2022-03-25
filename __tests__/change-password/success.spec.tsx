// utils
import { render, screen, setLoggedOutUser } from 'utils/testUtils';

// components
import ChangePasswordSuccess from 'pages/change-password/success';

beforeEach(() => {
  setLoggedOutUser();
});

test('success page', () => {
  render(<ChangePasswordSuccess />);

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
      name: 'Password Changed!',
    })
  ).toBeInTheDocument();

  expect(
    (
      screen.getByRole('link', {
        name: 'Login',
      }) as HTMLLinkElement
    ).href
  ).toBe('http://localhost/login');
});
