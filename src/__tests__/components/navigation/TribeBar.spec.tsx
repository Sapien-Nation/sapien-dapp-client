import { cache } from 'swr';

// api
import { createTribe } from 'api/tribeBar';

// utils
import { render, screen, user } from 'utils/testUtils';

// mocks
import { mockTribe } from 'tools/mocks/tribeBar';
import { mockRouter } from 'mocks/routes';

// components
import TribeBar from 'components/navigation/TribeBar';

jest.mock('api/tribeBar');

const push = jest.fn();
const tribe = mockTribe();
const error = 'Error';
const tribes = [mockTribe(), mockTribe()];

(createTribe as jest.Mock).mockResolvedValue(tribe);
window.URL.createObjectURL = jest.fn();

afterEach(() => {
  (window as any).URL.createObjectURL.mockReset();
});

beforeEach(() => {
  cache.set('/api/profile/tribes', tribes);
});

const renderComponent = () =>
  render(<TribeBar />, { router: mockRouter({ push }) });

test('works correctly', () => {
  renderComponent();

  const links = screen.getAllByRole('link');
  const images = screen.getAllByRole('img');

  tribes.forEach(({ mainSquareId, avatar }, index) => {
    expect(links[index]).toHaveAttribute('href', `/client/${mainSquareId}`);
    expect(images[index]).toHaveAttribute('src', avatar);
  });

  expect(
    screen.getByRole('button', { name: 'Create Tribe' })
  ).toBeInTheDocument();
});

test('CreateTribe', async () => {
  renderComponent();

  user.click(screen.getByRole('button', { name: 'Create Tribe' }));

  expect(
    screen.getByRole('dialog', { name: 'New Tribe Step 1 / 2' })
  ).toBeInTheDocument();

  const inputs = screen.getAllByRole('textbox');
  const checkboxes = screen.getAllByRole('checkbox');

  user.type(inputs[0], 'sports');
  user.type(inputs[1], 'sprts_sapien');
  user.type(inputs[2], 'Some Description');
  user.click(checkboxes[0]);

  user.click(screen.getByRole('button', { name: 'Next' }));

  expect(
    await screen.findByRole('dialog', { name: 'New Tribe Step 2 / 2' })
  ).toBeInTheDocument();

  const fileInputs = screen.getAllByTestId('dropzone-file-uploader');
  const files = [
    new File(['avatar'], 'avatar.png', { type: 'image/png' }),
    new File(['cover'], 'cover.png', { type: 'image/png' }),
  ];

  files.forEach((file, index) => user.upload(fileInputs[index], file));

  // on error
  (createTribe as jest.Mock).mockRejectedValueOnce(error);
  user.click(screen.getByRole('button', { name: 'Create' }));

  expect(await screen.findByText(error)).toBeInTheDocument();
  expect(createTribe).toHaveBeenCalledWith(expect.any(FormData));

  // on success
  user.click(screen.getByRole('button', { name: 'Create' }));

  expect(
    await screen.findByText('Tribe Created Successfully')
  ).toBeInTheDocument();
  expect(createTribe).toHaveBeenCalledWith(expect.any(FormData));
});
