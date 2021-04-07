import MockAdapter from 'axios-mock-adapter';

// types
import type { User } from 'tools/types/user';

// api
import axios from 'api';

// utils
import { render, screen, user, waitFor, within } from 'utils/tests';

// mocks
import { mockUsers } from 'tools/mocks/user';

// components
import Invite from 'components/tribe/modals/Invite';

// mocks
const users: Array<User> = mockUsers();

const onClose = jest.fn();
const link = 'http://';
const defaultProps = {
  link,
  onClose,
};

const fetcher = () => Promise.resolve({ users });
const renderComponent = (props = {}, opts = {}) =>
  render(<Invite {...defaultProps} {...props} />, opts);

window.prompt = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
});

test('works correctly', async () => {
  const mock = new MockAdapter(axios);

  await waitFor(() => {
    renderComponent({}, { fetcher });
  });

  // render
  expect(
    screen.getByRole('dialog', {
      name: /invite friends to tribe http:\/\//i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Send Invites (0)' })
  ).toBeInTheDocument();

  // copy link
  user.click(screen.getByRole('button', { name: /copy url/i }));
  expect(await screen.getByText('Copied to clipboard')).toBeInTheDocument();

  // users to invite list
  const usersToInviteList = screen.getByRole('list', {
    name: /users to invite/i,
  });

  expect(
    within(usersToInviteList).getByText('@Slowpoke Rodriguez')
  ).toBeInTheDocument();
  user.click(screen.getAllByRole('button', { name: /add user/i })[0]);

  expect(
    within(usersToInviteList).queryByRole('@Slowpoke Rodriguez')
  ).not.toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: 'Send Invites (1)' })
  ).toBeInTheDocument();
  expect(screen.getByText(/1 sapiens selected/i)).toBeInTheDocument();

  // invited users list
  const usersSelectedToInviteList = screen.getByRole('list', {
    name: /users selected to invite/i,
  });
  expect(
    within(usersSelectedToInviteList).getByText('@Slowpoke Rodriguez')
  ).toBeInTheDocument();
  user.click(screen.getAllByRole('button', { name: /remove user/i })[0]);
  expect(
    within(usersSelectedToInviteList).queryByText('@Slowpoke Rodriguez')
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Send Invites (0)' })
  ).toBeInTheDocument();

  // handle submit
  user.click(screen.getAllByRole('button', { name: /add user/i })[0]);

  // onError
  const error = { message: 'Create Tribe Error' };
  mock.onPost('/api/tribes/invite').reply(400, error);
  user.click(screen.getByRole('button', { name: 'Send Invites (1)' }));

  await waitFor(() => {
    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  // onSuccess
  mock.onPost('/api/tribes/invite').reply(200);
  user.click(screen.getByRole('button', { name: 'Send Invites (1)' }));

  await waitFor(() => {
    expect(screen.getByText('Invites Sent')).toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });
});
