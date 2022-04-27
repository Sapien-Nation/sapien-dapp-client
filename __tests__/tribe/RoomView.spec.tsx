// api
import { joinRoom } from 'api/room';

// components
import { RoomView } from 'components/tribe/views';

// utils
import {
  cache,
  mockRouter,
  render,
  screen,
  setAllTribes,
  user,
  waitFor,
  within,
} from 'utils/testUtils';

// mocks
import {
  mockRoomDetail,
  mockRoomDetailMember,
  mockRoomMessage,
  mockRoomMessageSender,
} from 'tools/mocks/room';
import { mockProfileTribe, mockProfileTribeRoom } from 'tools/mocks/tribe';
import { mockUser } from 'tools/mocks/user';

jest.mock('api/room');

(joinRoom as jest.Mock).mockReturnValue(true);

const error = { message: 'Error' };

const roomID = '1000';
const tribeID = '1000';
const route = mockRouter({ query: { viewID: roomID, tribeID } });

const mockUserOne = mockUser();
const mockUserTwo = mockUser({ id: '2000' });

const roomMembers = [
  mockRoomDetailMember({ id: mockUserOne.id }),
  mockRoomDetailMember({ id: mockUserTwo.id }),
];
const details = mockRoomDetail({ members: roomMembers });

const senderOne = mockRoomMessageSender({
  id: mockUserOne.id,
  avatar: mockUserOne.avatar,
  username: mockUserOne.username,
});
const senderTwo = mockRoomMessageSender({
  id: mockUserTwo.id,
  avatar: mockUserTwo.avatar,
  username: mockUserTwo.username,
});

// TODO there might be a clever solution for this
const messages = [
  // Section 1
  mockRoomMessage({
    sender: senderOne,
    createdAt: '2022-04-14T17:14:37.557Z',
    content: 'Message',
  }),
  mockRoomMessage({
    sender: senderOne,
    createdAt: '2022-04-14T17:15:37.557Z',
    content: 'Message',
  }),
  mockRoomMessage({
    sender: senderOne,
    createdAt: '2022-04-14T17:15:38.557Z',
    content: 'Message',
  }),
  mockRoomMessage({
    sender: senderOne,
    createdAt: '2022-04-14T17:16:39.557Z',
    content: 'Message',
  }),
  mockRoomMessage({
    sender: senderTwo,
    createdAt: '2022-04-14T17:17:37.557Z',
    content: 'Message',
  }),
  mockRoomMessage({
    sender: senderOne,
    createdAt: '2022-04-14T17:20:37.557Z',
    content: 'Message',
  }),

  // Section 2
  mockRoomMessage({
    sender: senderTwo,
    createdAt: '2022-04-15T17:14:38.557Z',
    content: 'Message',
  }),
  mockRoomMessage({
    sender: senderTwo,
    createdAt: '2022-04-15T17:14:39.557Z',
    content: 'Message',
  }),
  mockRoomMessage({
    sender: senderOne,
    createdAt: '2022-04-15T17:14:39.577Z',
    content: 'Message',
  }),
  mockRoomMessage({
    sender: senderTwo,
    createdAt: '2022-04-15T17:14:40.557Z',
    content: 'Message',
  }),

  // Section 3
  mockRoomMessage({
    sender: senderOne,
    createdAt: '2022-04-16T17:14:38.557Z',
    content: 'Message',
  }),
  mockRoomMessage({
    sender: senderOne,
    createdAt: '2022-04-16T18:15:39.557Z',
    content: 'Message',
  }),
  mockRoomMessage({
    sender: senderOne,
    createdAt: '2022-04-16T19:14:31.577Z',
    content: 'Message',
  }),
  mockRoomMessage({
    sender: senderTwo,
    createdAt: '2022-04-16T19:17:40.557Z',
    content: 'Message',
  }),
];

const room = mockProfileTribeRoom({ id: roomID });
const tribe = mockProfileTribe({ rooms: [room] });
const detailsAPIKey = `/api/v3/room/${roomID}`;
const messagesAPIKey = `/api/v3/room/${roomID}/messages`;

const renderView = (options = { route }) => render(<RoomView />, options);

beforeEach(() => {
  setAllTribes([tribe]);

  cache.set(messagesAPIKey, { data: messages, nextCursor: null });
  cache.set(detailsAPIKey, details);

  jest.clearAllMocks();
});

test('when not a member it should ask you to join', async () => {
  const mockDate = new Date('2022-01-01T16:00:00.000Z');
  jest
    .spyOn(Date.prototype, 'toISOString')
    .mockReturnValue(mockDate.toISOString());

  cache.set(`/api/v3/room/${roomID}`, {
    message: 'User is not a memeber of the room',
  });

  const { rerender } = renderView();

  expect(
    screen.getByRole('heading', { name: 'You cant see this room' })
  ).toBeInTheDocument();

  const lisItems = screen.getAllByRole('listitem');
  expect(lisItems.length).toEqual(1);

  expect(screen.getByTestId('join-room-time-header')).toHaveTextContent(
    '01/01/2022'
  );
  expect(
    screen.getByRole('img', { name: 'monkey with glasses' })
  ).toHaveAttribute(
    'src',
    'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/b851e8f8-a660-4d6a-be68-6177a5d40956-110x110.png'
  );
  expect(
    screen.getByRole('heading', { name: 'Harambe at Sapien' })
  ).toBeInTheDocument();
  expect(
    screen.getByTestId('join-room-harambe-message-timestamp')
  ).toHaveTextContent('01/01/2022');
  expect(
    screen.getByText('Hey, seems like you are not a member of this channel')
  ).toBeInTheDocument();

  // on error
  (joinRoom as jest.Mock).mockRejectedValueOnce(error.message);
  user.click(screen.getByRole('button', { name: 'Join' }));

  expect(await screen.findByText(error.message)).toBeInTheDocument();
  expect(joinRoom).toHaveBeenCalledWith(roomID);

  // on success
  user.click(screen.getByRole('button', { name: 'Join' }));

  await waitFor(() => {
    expect(joinRoom).toHaveBeenCalledWith(roomID);
  });

  // should render room view
  cache.set(detailsAPIKey, details);
  rerender(<RoomView />);

  expect(
    screen.getByRole('heading', { name: 'Room View for Room 1000' })
  ).toBeInTheDocument();
});

test('it can see room messages, details and post messages', async () => {
  const mockDate = new Date('2022-01-01T16:00:00.000Z');
  jest
    .spyOn(Date.prototype, 'toISOString')
    .mockReturnValue(mockDate.toISOString());

  renderView();

  // eslint-disable-next-line testing-library/no-wait-for-empty-callback
  await waitFor(() => {
    //
  });

  // Harambe welcome message
  const welcomeMessage = screen.getAllByRole('listitem')[1];
  expect(
    within(welcomeMessage).getByRole('heading', { name: 'Harambe at Sapien' })
  ).toBeInTheDocument();
  expect(within(welcomeMessage).getAllByRole('img')[0]).toHaveAttribute(
    'src',
    'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/b851e8f8-a660-4d6a-be68-6177a5d40956-110x110.png'
  );
  expect(
    within(welcomeMessage).getByTestId('message-timestamp')
  ).toHaveTextContent('01/01/2022');
  expect(
    within(welcomeMessage).getByTestId('timestamp-divider-harambe')
  ).toHaveTextContent('01/01/2022');
  expect(
    within(welcomeMessage).getByText(
      `This is the beggining of the conversation on the room: Room 1000, say Hi! or Hola!`
    )
  ).toBeInTheDocument();

  const messageItems = screen.getAllByTestId('room-message');
  expect(messageItems.length).toEqual(messages.length);

  const messagesWithHeadersIndexes = [0, 1, 4, 5, 6, 8, 9, 10, 14];
  messageItems.forEach((item, index) => {
    const messageRTLItem = within(item);
    const message = messages[index];

    if (messagesWithHeadersIndexes.includes(index)) {
      expect(
        messageRTLItem.getByRole('heading', {
          name: message.sender.username,
        })
      ).toBeInTheDocument();
      expect(messageRTLItem.getByTestId('message-avatar')).toBeInTheDocument();
      expect(
        messageRTLItem.getByTestId('message-timestamp')
      ).toBeInTheDocument();
      expect(messageRTLItem.getByText(message.content)).toBeInTheDocument();
    } else {
      expect(
        messageRTLItem.queryByRole('heading', {
          name: message.sender.username,
        })
      ).not.toBeInTheDocument();
      expect(
        messageRTLItem.queryByTestId('message-avatar')
      ).not.toBeInTheDocument();
      expect(
        messageRTLItem.queryByTestId('message-timestamp')
      ).not.toBeInTheDocument();
      expect(messageRTLItem.getByText(message.content)).toBeInTheDocument();
    }
  });

  // TimeStamp Dividers
  const timeStampsDividers = screen.getAllByTestId('timestamp-divider');

  expect(timeStampsDividers.length).toEqual(3);
  expect(
    within(timeStampsDividers[0]).getByText('04/16/2022')
  ).toBeInTheDocument();
  expect(
    within(timeStampsDividers[1]).getByText('04/15/2022')
  ).toBeInTheDocument();
  expect(
    within(timeStampsDividers[2]).getByText('04/14/2022')
  ).toBeInTheDocument();

  // Room Details
  expect(
    screen.getByRole('heading', { name: `Members (${roomMembers.length})` })
  ).toBeInTheDocument();

  const roomMembersItems = screen.getAllByTestId('room-detail-member');
  expect(roomMembersItems.length).toEqual(roomMembers.length);

  roomMembersItems.forEach((item, index) => {
    const member = roomMembers[index];
    if (index === 0) {
      expect(within(item).getByText(/(Admin)/i)).toBeInTheDocument();
    } else {
      expect(within(item).getByText(member.username)).toBeInTheDocument();
    }
  });
});
