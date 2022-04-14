// api
import { createChannel, uploadImage as uploadImageChannel } from 'api/channel';
import { createRoom } from 'api/room';
import { createTribe, uploadImage as uploadImageTribe } from 'api/tribe';

// utils
import {
  createFile,
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

// (uploadImageTribe as jest.Mock).mockResolvedValue({ url: 'url', key: 'key' });
// (uploadImageChannel as jest.Mock).mockResolvedValue({ url: 'url', key: 'key' });
(createRoom as jest.Mock).mockReturnValue(newRoom);
(createTribe as jest.Mock).mockReturnValue(newTribe);
(createChannel as jest.Mock).mockReturnValue(newChannel);

const push = jest.fn();

const error = { message: 'Error' };
const avatarError = { message: 'Avatar Upload Error' };
const coverError = { message: 'Cover Upload Error' };
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

  test('Desktop Navbar', async () => {
    render(
      <AppLayout>
        <span>Some View</span>
      </AppLayout>
    );

    await user.click(
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

    await user.click(
      screen.getByRole('button', { name: 'Click here to create a new Tribe' })
    );

    expect(
      screen.getByRole('dialog', { name: 'Create a Tribe' })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() => {
      expect(createTribe).not.toBeCalled();
    });

    const tribeName = 'tribe new';
    const tribeIdentifier = 'tribenew';

    await user.type(screen.getByRole('textbox', { name: 'name' }), tribeName);
    await user.type(
      screen.getByRole('textbox', { name: 'identifier' }),
      tribeIdentifier
    );

    // avatar image upload on error
    (uploadImageTribe as jest.Mock).mockRejectedValueOnce(avatarError.message);
    await user.upload(
      document.getElementById('avatar-upload') as HTMLElement,
      createFile()
    );

    expect(await screen.findByText(avatarError.message)).toBeInTheDocument();

    // avatar image upload on success
    const avatarImage = 'avatar.png';
    (uploadImageTribe as jest.Mock).mockResolvedValueOnce({
      url: avatarImage,
      key: 'key',
    });
    await user.upload(
      document.getElementById('avatar-upload') as HTMLElement,
      createFile(avatarImage)
    );
    expect(screen.getByRole('img', { name: 'avatar' })).toHaveAttribute(
      'src',
      avatarImage
    );

    // cover image upload on error
    const coverImage = 'cover.png';
    (uploadImageTribe as jest.Mock).mockRejectedValueOnce(coverError.message);
    await user.upload(
      document.getElementById('cover-upload') as HTMLElement,
      createFile(coverImage)
    );

    expect(await screen.findByText(coverError.message)).toBeInTheDocument();

    // cover image upload on success
    (uploadImageTribe as jest.Mock).mockResolvedValueOnce({
      url: coverImage,
      key: 'key',
    });
    await user.upload(
      document.getElementById('cover-upload') as HTMLElement,
      createFile(coverImage)
    );

    expect(screen.getByRole('img', { name: 'cover' })).toHaveAttribute(
      'src',
      coverImage
    );

    // can delete uploaded images
    await user.click(
      screen.getByRole('button', { name: 'Remove Selected Avatar' })
    );
    await waitFor(() => {
      expect(
        screen.queryByRole('img', { name: 'avatar' })
      ).not.toBeInTheDocument();
    });

    await user.click(
      screen.getByRole('button', { name: 'Remove Selected Cover' })
    );
    await waitFor(() => {
      expect(
        screen.queryByRole('img', { name: 'cover' })
      ).not.toBeInTheDocument();
    });

    // re-upload images
    (uploadImageTribe as jest.Mock).mockResolvedValueOnce({
      url: avatarImage,
      key: 'key',
    });
    await user.upload(
      document.getElementById('avatar-upload') as HTMLElement,
      createFile(avatarImage)
    );

    (uploadImageTribe as jest.Mock).mockResolvedValueOnce({
      url: coverImage,
      key: 'key',
    });
    await user.upload(
      document.getElementById('cover-upload') as HTMLElement,
      createFile(coverImage)
    );

    // on error
    (createTribe as jest.Mock).mockRejectedValueOnce(error.message);
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(await screen.findByText(error.message)).toBeInTheDocument();
    expect(createTribe).toHaveBeenCalledWith({
      avatar: 'key',
      cover: 'key',
      name: tribeName,
      description: '',
      identifier: tribeIdentifier,
    });

    // on success
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(
      await screen.findByText('Tribe created successfully')
    ).toBeInTheDocument();
    expect(createTribe).toHaveBeenCalledWith({
      avatar: 'key',
      cover: 'key',
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
            name: new RegExp(name, 'i'),
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

    await user.click(getCreateChannelButton());

    expect(
      screen.getByRole('dialog', { name: 'Create a Channel' })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() => {
      expect(createChannel).not.toBeCalled();
    });

    const channelName = 'channel new';
    await user.type(screen.getByRole('textbox', { name: 'name' }), channelName);

    // avatar image upload on error
    (uploadImageChannel as jest.Mock).mockRejectedValueOnce(
      avatarError.message
    );
    await user.upload(
      document.getElementById('avatar-upload') as HTMLElement,
      createFile()
    );

    expect(await screen.findByText(avatarError.message)).toBeInTheDocument();

    // avatar image upload on success
    const avatarImage = 'avatar.png';
    (uploadImageChannel as jest.Mock).mockResolvedValueOnce({
      url: avatarImage,
      key: 'key',
    });

    await user.upload(
      document.getElementById('avatar-upload') as HTMLElement,
      createFile(avatarImage)
    );
    expect(screen.getByRole('img', { name: 'avatar' })).toHaveAttribute(
      'src',
      avatarImage
    );

    // remove
    await user.click(
      screen.getByRole('button', { name: 'Remove Selected Avatar' })
    );
    await waitFor(() => {
      expect(
        screen.queryByRole('img', { name: 'avatar' })
      ).not.toBeInTheDocument();
    });

    // cover image upload on error
    const coverImage = 'cover.png';
    (uploadImageChannel as jest.Mock).mockRejectedValueOnce(coverError.message);
    await user.upload(
      document.getElementById('cover-upload') as HTMLElement,
      createFile(coverImage)
    );

    expect(await screen.findByText(coverError.message)).toBeInTheDocument();

    // cover image upload on success
    (uploadImageChannel as jest.Mock).mockResolvedValueOnce({
      url: coverImage,
      key: 'key',
    });
    await user.upload(
      document.getElementById('cover-upload') as HTMLElement,
      createFile(coverImage)
    );

    expect(screen.getByRole('img', { name: 'cover' })).toHaveAttribute(
      'src',
      coverImage
    );

    // can remove
    await user.click(
      screen.getByRole('button', { name: 'Remove Selected Cover' })
    );
    await waitFor(() => {
      expect(
        screen.queryByRole('img', { name: 'cover' })
      ).not.toBeInTheDocument();
    });

    // re-upload images
    (uploadImageChannel as jest.Mock).mockResolvedValueOnce({
      url: avatarImage,
      key: 'key',
    });
    await user.upload(
      document.getElementById('avatar-upload') as HTMLElement,
      createFile(avatarImage)
    );

    (uploadImageChannel as jest.Mock).mockResolvedValueOnce({
      url: coverImage,
      key: 'key',
    });
    await user.upload(
      document.getElementById('cover-upload') as HTMLElement,
      createFile(coverImage)
    );

    // on error
    (createChannel as jest.Mock).mockRejectedValueOnce(error.message);
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(await screen.findByText(error.message)).toBeInTheDocument();
    expect(createChannel).toHaveBeenCalledWith({
      avatar: 'key',
      cover: 'key',
      name: channelName,
      tribeId: tribeID,
    });

    // on success
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(
      await screen.findByText('Channel created successfully')
    ).toBeInTheDocument();
    expect(createChannel).toHaveBeenCalledWith({
      avatar: 'key',
      cover: 'key',
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
          name: new RegExp(newChannel.name, 'i'),
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

    await user.click(getCreateRoomButton());

    expect(
      screen.getByRole('dialog', { name: 'Create a Room' })
    ).toBeInTheDocument();

    const roomName = 'Typescript';
    await user.click(screen.getByRole('button', { name: 'Create' }));
    expect(createRoom).not.toHaveBeenCalled();

    await user.type(screen.getByRole('textbox', { name: 'name' }), roomName);

    // on error
    (createRoom as jest.Mock).mockRejectedValueOnce(error.message);
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(await screen.findByText(error.message)).toBeInTheDocument();
    expect(createRoom).toHaveBeenCalledWith({
      name: roomName,
      aboutObject: 'PARTY',
      aboutObjectId: '1000',
    });

    // on success
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(
      await screen.findByText('Room created successfully')
    ).toBeInTheDocument();
    expect(createRoom).toHaveBeenCalledWith({
      name: roomName,
      aboutObject: 'PARTY',
      aboutObjectId: '1000',
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
