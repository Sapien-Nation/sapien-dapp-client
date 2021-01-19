// utils
import { render, screen } from 'utils/testUtils';

// components
import IndexPage from './index';

test('render', () => {
  render(<IndexPage />);

  expect(screen.getByRole('heading', { name: /index page/i })).toBeInTheDocument();
  expect(screen.getByText('This is a test for Modules')).toBeInTheDocument();
});
