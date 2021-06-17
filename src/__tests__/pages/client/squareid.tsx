import { cache } from 'swr';

// components
import SquarePage from 'pages/client/[squareid]';

// utils
import { render, screen } from 'utils/testUtils';

// mocks
import { mockRouter } from 'mocks/routes';
import { mockTribe } from 'tools/mocks/tribeBar';
import { mockTribeMedia } from 'tools/mocks/tribe/view';

// mock data
const tribe = mockTribe();
const tribeMedia = mockTribeMedia({ description: 'Tribe Description' });
const query = { squareid: tribe.mainSquareId };

beforeEach(() => {
  jest.clearAllMocks();
});

const renderComponent = () =>
  render(<SquarePage />, { router: mockRouter({ query }) });

beforeEach(() => {
  jest.clearAllMocks();

  cache.set('/api/profile/tribes', [tribe]);
  cache.set(`/api/tribe/${tribe.id}`, tribeMedia);
});

test('renders correctly', async () => {
  renderComponent();

  // heading
  const images = screen.getAllByRole('img');
  expect(images[0]).toHaveAttribute('src', tribeMedia.cover);
  expect(images[1]).toHaveAttribute('src', tribeMedia.avatar);

  expect(
    screen.getByRole('heading', { name: tribeMedia.name })
  ).toBeInTheDocument();
  expect(screen.getByText(tribeMedia.identifier)).toBeInTheDocument();

  expect(screen.getByText('0 Followers')).toBeInTheDocument();
  expect(screen.getByText('0 Members')).toBeInTheDocument();

  expect(screen.getByText(tribeMedia.description)).toBeInTheDocument();
});
