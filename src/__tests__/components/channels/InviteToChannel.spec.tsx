import MockAdapter from 'axios-mock-adapter';
import { cache } from 'swr';

// types
import type { User } from 'tools/types/user';

// api
import axios from 'api';

// utils
import { render, screen, user, waitFor, within } from 'utils/tests';

// mocks
import { mockChannel } from 'tools/mocks/channel';
import { mockUsers } from 'tools/mocks/user';

// components
import InviteToChannel from 'components/channels/InviteToChannel';

// mocks
const users: Array<User> = mockUsers();
const channel = mockChannel();

const onClose = jest.fn();
const defaultProps = {
  channel,
  onClose,
};

const renderComponent = (props = {}) =>
  render(<InviteToChannel {...defaultProps} {...props} />);

window.prompt = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();

  cache.set(`/api/channels/invite/${channel.id}`, { users });
});

test('works correctly', async () => {
  const mock = new MockAdapter(axios);
  renderComponent();

  // render
  expect(
    screen.getByRole('heading', {
      name: /invite members to channel/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Send Invites (0)' })
  ).toBeInTheDocument();

  // users to invite list
  const usersToInviteList = screen.getByRole('list', {
    name: /users to invite/i,
  });

  expect(within(usersToInviteList).getByText('@slowpoke')).toBeInTheDocument();
  user.click(screen.getAllByRole('button', { name: /add user/i })[0]);

  expect(
    within(usersToInviteList).queryByRole('@slowpoke')
  ).not.toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: 'Send Invites (1)' })
  ).toBeInTheDocument();
  expect(screen.getByText(/1 tribe members selected/i)).toBeInTheDocument();

  // invited users list
  const usersSelectedToInviteList = screen.getByRole('list', {
    name: /users selected to invite/i,
  });
  expect(
    within(usersSelectedToInviteList).getByText('@slowpoke')
  ).toBeInTheDocument();
  user.click(screen.getAllByRole('button', { name: /remove user/i })[0]);
  expect(
    within(usersSelectedToInviteList).queryByText('@slowpoke')
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Send Invites (0)' })
  ).toBeInTheDocument();

  // handle submit
  user.click(screen.getAllByRole('button', { name: /add user/i })[0]);

  // onError
  const error = { message: 'Invite to Channel Error' };
  mock.onPost('/api/channels/invite').reply(400, error);
  user.click(screen.getByRole('button', { name: 'Send Invites (1)' }));

  await waitFor(() => {
    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  // onSuccess
  mock.onPost('/api/channels/invite').reply(200);
  user.click(screen.getByRole('button', { name: 'Send Invites (1)' }));

  await waitFor(() => {
    expect(screen.getByText('Invites Sent')).toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });
});
