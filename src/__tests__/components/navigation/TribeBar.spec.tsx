import { cache } from 'swr';

// utils
import { render, screen } from 'utils/testUtils';

// mocks
import { mockTribe } from 'tools/mocks/tribeBar';

// components
import TribeBar from 'components/navigation/TribeBar';

const renderComponent = () => render(<TribeBar />);
const tribes = [mockTribe(), mockTribe()];

beforeEach(() => {
  cache.set('/api/profile/tribes', tribes);
});

test('works correctly', () => {
  renderComponent();

  const links = screen.getAllByRole('link');
  const images = screen.getAllByRole('img');

  tribes.forEach(({ id, avatar }, index) => {
    expect(links[index]).toHaveAttribute('href', `/client/${id}`);
    expect(images[index]).toHaveAttribute('src', avatar);
  });

  expect(
    screen.getByRole('button', { name: 'Create Tribe' })
  ).toBeInTheDocument();
});
