// utils
import { render, screen } from 'utils/testUtils';

// components
import FourOFourPage from 'pages/404';

test('render correctly', () => {
  render(<FourOFourPage />);

  expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  expect(screen.getByText(/this page could not be found/i)).toBeInTheDocument();
});
