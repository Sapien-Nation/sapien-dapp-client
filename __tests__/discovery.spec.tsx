// utils
import { render, screen } from 'utils/testUtils';

// components
import DiscoveryPage from 'pages/discovery';

test('discovery page', () => {
  render(<DiscoveryPage />);

  const heading = screen.getByRole('heading', {
    name: 'TODO Discovery page',
  });

  expect(heading).toBeInTheDocument();
});
