import { cache } from 'swr';

// utils
import { render, screen } from 'utils/testUtils';

// mocks
import { mockSquare } from 'tools/mocks/square';
import { mockTribe } from 'tools/mocks/tribeBar';
import { mockRouter } from 'mocks/routes';

// components
import TribeNavigation from 'components/navigation/TribeNavigation';

const squares = [mockSquare()];
const tribes = [mockTribe({ squares })];
const query = {
  tribeid: tribes[0].id,
};
const selectedTribe = tribes[0];

const renderComponent = () =>
  render(<TribeNavigation />, { router: mockRouter({ query }) });

beforeEach(() => {
  cache.set('/api/profile/tribes', tribes);
});

test('works correctly', () => {
  renderComponent();

  expect(screen.getByRole('link', { name: selectedTribe.name }))
    .toBeInTheDocument;
  expect(
    screen.getByRole('link', { name: selectedTribe.name })
  ).toHaveAttribute('href', `/client/${selectedTribe.id}`);
  expect(screen.getByRole('link', { name: 'Badge Store' })).toBeInTheDocument;
});
