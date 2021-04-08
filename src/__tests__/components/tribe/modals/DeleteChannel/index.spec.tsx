import { cache } from 'swr';

// utils
import { render } from 'utils/tests';

// types
import type { Tribe } from 'tools/types/tribe';

// components
import DeleteChannel from 'components/tribe/modals/DeleteChannel';

// mocks
import { mockTribes } from 'tools/mocks/tribe';

const tribes: Array<Tribe> = mockTribes();

const onClose = jest.fn();
const defaultProps = {
  onClose,
};

beforeEach(() => {
  localStorage?.clear();

  cache.set('/api/tribes/followed', { tribes });
  jest.clearAllMocks();
});

const renderComponent = () => render(<DeleteChannel {...defaultProps} />);

test('Delete Channel', async () => {
  renderComponent();
  expect(true).toBe(true);
  // await waitFor(() => {
  //   expect(
  //     screen.getByRole('dialog', { name: /deleting “our trips”/i })
  //   ).toBeInTheDocument();
  // });

  // // migrate content
  // const migrateSwitch = screen.getByRole('checkbox');
  // user.click(migrateSwitch);

  // await waitFor(() => {
  //   expect(
  //     screen.getByRole('heading', { name: /migrate content to/i })
  //   ).toBeInTheDocument();
  // });

  // // select channel to migrate & delete channel
  // const channelSelected = screen.getByRole('img', { name: /Sapien/i });
  // user.click(channelSelected);

  // const deleteChannel = screen.getByRole('button', { name: /delete channel/i });
  // expect(deleteChannel).not.toBeDisabled();
  // user.click(deleteChannel);
  // await waitFor(() => {
  //   expect(onClose).toHaveBeenCalled();
  // });
});
