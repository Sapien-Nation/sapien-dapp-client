import { cache } from 'swr';

// utils
import { render, screen } from 'utils/testUtils';

// mocks
import { mockTribe } from 'tools/mocks/tribeBar';
import { mockRouter } from 'mocks/routes';

// components
import TribeNavigation from 'components/navigation/TribeNavigation';

const tribes = [mockTribe()];
const query = {
  squareid: tribes[0].mainSquareId,
};
const selectedTribe = tribes[0];

beforeEach(() => {
  cache.set('/api/profile/tribes', tribes);
});

const renderComponent = () =>
  render(<TribeNavigation />, { router: mockRouter({ query }) });

test('works correctly', () => {
  renderComponent();

  const links = screen.getAllByRole('link');
  expect(links[0]).toHaveAttribute(
    'href',
    `/client/${selectedTribe.mainSquareId}`
  );
  expect(screen.getByRole('link', { name: 'Badge Store' })).toBeInTheDocument();
});
