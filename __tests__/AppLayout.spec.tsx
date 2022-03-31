// api
import { createChannel } from 'api/channel';
import { createRoom } from 'api/room';
import { createTribe } from 'api/tribe';

// utils
import {
  mockUser,
  render,
  screen,
  setAllTribes,
  setLoggedOutUser,
  setUser,
  user,
  waitFor,
} from 'utils/testUtils';

// components
import { AppLayout } from 'components';

// mocks
import {
  mockProfileTribe,
  mockProfileTribeChannel,
  mockProfileTribeRoom,
} from 'tools/mocks/tribe';

jest.mock('api/channel');
jest.mock('api/room');
jest.mock('api/tribe');

const newRoom = mockProfileTribeRoom({ id: '10000' });
const newTribe = mockProfileTribe({ id: '20000' });
const newChannel = mockProfileTribeChannel({ id: '30000' });

(createRoom as jest.Mock).mockReturnValue(newRoom);
(createTribe as jest.Mock).mockReturnValue(newTribe);
(createChannel as jest.Mock).mockReturnValue(newChannel);

const push = jest.fn();

const error = { message: 'Error' };

const channel1 = mockProfileTribeChannel();
const room1 = mockProfileTribeRoom();
const tribe1 = mockProfileTribe({ channels: [channel1], rooms: [room1] });
const tribe2 = mockProfileTribe({ id: '2000' });
const tribes = [tribe1, tribe2];

beforeEach(() => {
  setAllTribes(tribes);
});

describe('AuthRoutes', () => {
  const renderAuthRoute = (pathname: string) =>
    render(
      <AppLayout>
        <span>Children Auth</span>
      </AppLayout>,
      { route: { pathname } }
    );
  test('login page', () => {
    renderAuthRoute('/login');

    expect(screen.getByText('Children Auth')).toBeInTheDocument();
  });

  test('register page', () => {
    renderAuthRoute('/register');

    expect(screen.getByText('Children Auth')).toBeInTheDocument();
  });

  test('register page', () => {
    renderAuthRoute('/logout');

    expect(screen.getByText('Children Auth')).toBeInTheDocument();
  });

  test('register page', () => {
    renderAuthRoute('/forgot');

    expect(screen.getByText('Children Auth')).toBeInTheDocument();
  });

  test('register page', () => {
    renderAuthRoute('/change-password');

    expect(screen.getByText('Children Auth')).toBeInTheDocument();
  });
});

test('not logged in', () => {
  setLoggedOutUser();

  const push = jest.fn();
  render(
    <AppLayout>
      <span>Not Render</span>
    </AppLayout>,
    { route: { push } }
  );

  expect(push).toHaveBeenCalledWith('/login');
  expect(screen.queryByText('Not Render')).not.toBeInTheDocument();
});

describe('LoggedIn', () => {
  const rooms = [mockProfileTribeRoom(), mockProfileTribeRoom({ id: '4000' })];
  const channels = [
    mockProfileTribeChannel(),
    mockProfileTribeChannel({ id: '3000' }),
  ];
  const mainTribe = mockProfileTribe({ channels, rooms });
  const tribeID = mainTribe.id;

  let loggedInUser = null;
  beforeEach(() => {
    loggedInUser = setUser(mockUser({ avatar: 'http://someurl.com' }));
    setAllTribes([mainTribe, mockProfileTribe({ id: '2000' })]);

    jest.clearAllMocks();
  });

  const getCreateChannelButton = () =>
    screen.getByRole('button', { name: 'Create Channel' });
  const getCreateRoomButton = () =>
    screen.getByRole('button', { name: 'Create Room' });

  test('Desktop Navbar', () => {
    render(
      <AppLayout>
        <span>Some View</span>
      </AppLayout>
    );

    user.click(
      screen.getByRole('button', { name: 'Open Desktop Profile Menu' })
    );
    expect(
      (
        screen.getByRole('link', {
          name: 'Logout',
        }) as HTMLLinkElement
      ).href
    ).toBe(`http://localhost/logout`);

    expect(screen.getByText(`@${loggedInUser.username}`)).toBeInTheDocument();
    expect(screen.getByText(loggedInUser.displayName)).toBeInTheDocument();
  });

  test('render tribe bar', () => {
    render(
      <AppLayout>
        <span>Some View</span>
      </AppLayout>
    );

    // top
    expect(
      (
        screen.getByRole('link', {
          name: `T Go to Test Tribe 1000`,
        }) as HTMLLinkElement
      ).href
    ).toBe('http://localhost/tribes/1000/home');
    expect(
      (
        screen.getByRole('link', {
          name: 'T Go to Test Tribe 2000',
        }) as HTMLLinkElement
      ).href
    ).toBe('http://localhost/tribes/2000/home');
    expect(
      (
        screen.getByRole('link', {
          name: 'Go to Explore',
        }) as HTMLLinkElement
      ).href
    ).toBe('http://localhost/discovery');

    // Actions
    expect(
      screen.getByRole('button', { name: 'Click here to create a new Tribe' })
    ).toBeInTheDocument();
  });

  test('can create tribe', async () => {
    render(
      <AppLayout>
        <span>Some View</span>
      </AppLayout>,
      { route: { push } }
    );

    user.click(
      screen.getByRole('button', { name: 'Click here to create a new Tribe' })
    );

    expect(
      screen.getByRole('dialog', { name: 'Create a Tribe' })
    ).toBeInTheDocument();

    user.click(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() => {
      expect(createTribe).not.toBeCalled();
    });

    const tribeName = 'tribe new';
    const tribeIdentifier = 'tribe_new';

    await waitFor(() => {
      user.type(screen.getByRole('textbox', { name: 'name' }), tribeName);
      user.type(
        screen.getByRole('textbox', { name: 'identifier' }),
        tribeIdentifier
      );
    });

    // image upload
    // TODO

    // on error
    (createTribe as jest.Mock).mockRejectedValueOnce(error.message);
    user.click(screen.getByRole('button', { name: 'Create' }));

    expect(await screen.findByText(error.message)).toBeInTheDocument();
    expect(createTribe).toHaveBeenCalledWith({
      name: tribeName,
      description: '',
      identifier: tribeIdentifier,
    });

    // on success
    user.click(screen.getByRole('button', { name: 'Create' }));

    expect(
      await screen.findByText('Tribe created successfully')
    ).toBeInTheDocument();
    expect(createTribe).toHaveBeenCalledWith({
      name: tribeName,
      description: '',
      identifier: tribeIdentifier,
    });

    expect(push).toHaveBeenCalledWith(`/tribes/${newTribe.id}/home`);

    // tribe should be on the tribe bar and modal closed
    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: 'Create a Tribe' })
      ).not.toBeInTheDocument();
    });
    expect(
      (
        screen.getByRole('link', {
          name: `${newTribe.name[0].toUpperCase()} Go to ${newTribe.name}`,
        }) as HTMLLinkElement
      ).href
    ).toBe(`http://localhost/tribes/${newTribe.id}/home`);
  });

  test('tribe navigation', () => {
    render(
      <AppLayout>
        <h1>Hello</h1>
      </AppLayout>,
      {
        route: {
          pathname: `/tribes/${tribeID}/${rooms[0].id}`,
          query: { tribeID, viewID: rooms[0].id },
        },
      }
    );

    // Home Feed link
    expect(
      (
        screen.getByRole('link', {
          name: mainTribe.name,
        }) as HTMLLinkElement
      ).href
    ).toBe(`http://localhost/tribes/${tribeID}/home`);

    // Channels Section
    expect(getCreateChannelButton()).toBeInTheDocument();

    channels.map(({ id, name }) => {
      expect(
        (
          screen.getByRole('link', {
            name,
          }) as HTMLLinkElement
        ).href
      ).toBe(`http://localhost/tribes/${tribeID}/${id}`);
    });

    // Rooms Section
    expect(getCreateRoomButton()).toBeInTheDocument();

    rooms.map(({ id, name }) => {
      expect(
        (
          screen.getByRole('link', {
            name: `# ${name}`,
          }) as HTMLLinkElement
        ).href
      ).toBe(`http://localhost/tribes/${tribeID}/${id}`);
    });
  });

  test('can create channel', async () => {
    render(
      <AppLayout>
        <span>Some View</span>
      </AppLayout>,
      {
        route: {
          push,
          pathname: `/tribes/${tribeID}/${rooms[0].id}`,
          query: { tribeID, viewID: rooms[0].id },
        },
      }
    );

    user.click(getCreateChannelButton());

    expect(
      screen.getByRole('dialog', { name: 'Create a Channel' })
    ).toBeInTheDocument();

    user.click(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() => {
      expect(createChannel).not.toBeCalled();
    });

    const channelName = 'channel new';

    user.type(screen.getByRole('textbox', { name: 'name' }), channelName);

    // image upload
    // TODO

    // on error
    (createChannel as jest.Mock).mockRejectedValueOnce(error.message);
    user.click(screen.getByRole('button', { name: 'Create' }));

    expect(await screen.findByText(error.message)).toBeInTheDocument();
    expect(createChannel).toHaveBeenCalledWith({
      name: channelName,
      tribeId: tribeID,
    });

    // on success
    user.click(screen.getByRole('button', { name: 'Create' }));

    expect(
      await screen.findByText('Channel created successfully')
    ).toBeInTheDocument();
    expect(createChannel).toHaveBeenCalledWith({
      name: channelName,
      tribeId: tribeID,
    });

    expect(push).toHaveBeenCalledWith(`/tribes/${tribeID}/${newChannel.id}`);

    // channel should be on the tribe navigation and modal closed
    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: 'Create a Channel' })
      ).not.toBeInTheDocument();
    });

    expect(
      (
        screen.getByRole('link', {
          name: newChannel.name,
        }) as HTMLLinkElement
      ).href
    ).toBe(`http://localhost/tribes/${tribeID}/${newChannel.id}`);
  });

  test('can create rooms', async () => {
    render(
      <AppLayout>
        <h1>Hello</h1>
      </AppLayout>,
      {
        route: {
          pathname: `/tribes/${tribeID}/${rooms[0].id}`,
          query: { tribeID, viewID: rooms[0].id },
          push,
        },
      }
    );

    user.click(getCreateRoomButton());

    expect(
      screen.getByRole('dialog', { name: 'Create a Room' })
    ).toBeInTheDocument();

    const roomName = 'Typescript';
    user.click(screen.getByRole('button', { name: 'Create' }));

    expect(await screen.findByText(/is required/i)).toBeInTheDocument();

    user.type(screen.getByRole('textbox', { name: 'name' }), roomName);

    // on error
    (createRoom as jest.Mock).mockRejectedValueOnce(error.message);
    user.click(screen.getByRole('button', { name: 'Create' }));

    expect(await screen.findByText(error.message)).toBeInTheDocument();
    expect(createRoom).toHaveBeenCalledWith({
      name: roomName,
      tribeId: tribeID,
    });

    // on success
    user.click(screen.getByRole('button', { name: 'Create' }));

    expect(
      await screen.findByText('Room created successfully')
    ).toBeInTheDocument();
    expect(createRoom).toHaveBeenCalledWith({
      name: roomName,
      tribeId: tribeID,
    });

    expect(push).toHaveBeenCalledWith(`/tribes/${tribeID}/${newRoom.id}`);

    // rooms should be on the tribe navigation and modal closed
    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: 'Create a Room' })
      ).not.toBeInTheDocument();
    });
    expect(
      (
        screen.getByRole('link', {
          name: `# ${roomName}`,
        }) as HTMLLinkElement
      ).href
    ).toBe(`http://localhost/tribes/${tribeID}/${newRoom.id}`);
  });
});
