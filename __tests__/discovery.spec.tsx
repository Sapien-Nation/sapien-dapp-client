// utils
import { render, screen } from 'utils/testUtils';

// components
import DiscoveryPage from 'pages/discovery';

test('discovery page', () => {
  render(<DiscoveryPage />);

  expect(true).toBe(true);
});
