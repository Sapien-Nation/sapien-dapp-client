import { cache } from 'swr';
import MockAdapter from 'axios-mock-adapter';

// utils
import { render, screen, user, waitFor, within } from 'utils/tests';

// api
import axios from 'api';

// types
import type { Tribe } from 'tools/types/tribe';

// components
import DeleteChannel from 'components/tribe/modals/DeleteChannel';

// mocks
import { mockTribes } from 'tools/mocks/tribe';
import { mockChannel } from 'tools/mocks/channel';

const tribes: Array<Tribe> = mockTribes();

const channel = mockChannel({ membersCount: 0 });
const onClose = jest.fn();
const defaultProps = {
  channel,
  onClose,
};

beforeEach(() => {
  cache.set('/api/tribes/followed', { tribes });
  jest.clearAllMocks();
});

const renderComponent = () => render(<DeleteChannel {...defaultProps} />);

test('Delete Channel', async () => {
  const mock = new MockAdapter(axios);
  renderComponent();

  const dialog = screen.getByRole('dialog', {
    name: `Deleting "${channel.name}"`,
  });
  expect(dialog).toBeInTheDocument();
  expect(
    screen.getByRole('heading', {
      name: /when you delete your channel all published content will be deleted and cannot be recovered\. would you like to migrate the content instead\?/i,
    })
  ).toBeInTheDocument();

  // no migrate selected
  // onSubmit
  // onError
  const error = { message: 'Delete Channel Error' };
  mock.onPost('/api/channels/delete').reply(400, error);
  user.click(screen.getByRole('button', { name: 'Delete' }));

  await waitFor(() => {
    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  // onSuccess
  mock.onPost('/api/channels/delete').reply(200);
  user.click(screen.getByRole('button', { name: 'Delete' }));

  await waitFor(() => {
    expect(onClose).toHaveBeenCalled();
  });

  // migrate
  user.click(screen.getAllByRole('checkbox')[0]);

  // default render
  const defaultTribe = tribes[0];
  expect(
    screen.getByRole('button', { name: /migrate and delete/i })
  ).toBeDisabled();
  expect(within(dialog).getByRole('presentation')).toHaveTextContent(
    defaultTribe.name
  );

  // show tribes menu
  user.click(
    screen.getByRole('button', {
      name: /show menu/i,
    })
  );

  // Selecting a tribe from the menu
  const tribeToSelect = tribes[1];
  cache.set(`/api/channels/search/${tribeToSelect.id}`, {
    channels: [channel],
  });
  user.click(
    screen.getByRole('option', {
      name: `${tribeToSelect.name} ${tribeToSelect.name} @${tribeToSelect.name}`,
    })
  );
  expect(within(dialog).getByRole('presentation')).toHaveTextContent(
    tribeToSelect.name
  );

  let channelOption = screen.getByTestId(
    `Select channel ${channel.name} to migrate`
  );

  expect(channelOption).toHaveTextContent(
    `${channel.name}@${channel.name}Public`
  );
  user.click(channelOption);
  expect(
    screen.getByRole('button', { name: /migrate and delete/i })
  ).not.toBeDisabled();

  // unselect channel
  channelOption = screen.getByTestId(
    `Unselect channel ${channel.name} to migrate`
  );
  user.click(channelOption);
  expect(
    screen.getByRole('button', { name: /migrate and delete/i })
  ).toBeDisabled();

  // select channel again
  channelOption = screen.getByTestId(
    `Select channel ${channel.name} to migrate`
  );
  user.click(channelOption);

  // onSubmit
  // onError
  onClose.mockClear();
  mock.onPost('/api/channels/delete').reply(400, error);
  user.click(screen.getByRole('button', { name: /migrate and delete/i }));

  await waitFor(() => {
    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  // onError
  mock.onPost('/api/channels/delete').reply(200);
  user.click(screen.getByRole('button', { name: /migrate and delete/i }));

  await waitFor(() => {
    expect(onClose).toHaveBeenCalled();
  });
});
