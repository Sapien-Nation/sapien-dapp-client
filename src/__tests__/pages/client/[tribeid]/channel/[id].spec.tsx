import { cache } from 'swr';

// utils
import { render, waitFor } from 'utils/tests';

// mocks
import { mockRouter } from 'mocks/routes';
import { mockChannel } from 'tools/mocks/channel';
import { mockPost } from 'tools/mocks/post';
import { mockTribe } from 'tools/mocks/tribe';
import { mockUser } from 'tools/mocks/user';

// components
import ChannelPage from 'pages/client/[tribeid]/channel/[id]';

// // mock data
const channelID = '99';
const owner = mockUser();
const tribe = mockTribe();
const channel = mockChannel({ id: channelID });
const posts = [
  mockPost({ channel, tribe, owner }),
  mockPost({ channel, tribe, owner }),
  mockPost({ channel, tribe, owner }),
  mockPost({ channel, tribe, owner }),
];
const fetcher = () => Promise.resolve({ cursor: '123', posts });
const renderComponent = () =>
  render(<ChannelPage />, {
    fetcher,
    router: mockRouter({ query: { id: channel.id } }),
  });

beforeEach(() => cache.set(`/api/channel/${channelID}`, { channel }));

test('render correctly', async () => {
  await waitFor(() => {
    renderComponent();
  });
  // // Header
  // expect(screen.getByRole('img', { name: channel.name })).toBeInTheDocument();
  // expect(
  //   screen.getByRole('img', {
  //     name: `${channel.name} cover photo`,
  //   })
  // ).toBeInTheDocument();
  // expect(
  //   screen.getByRole('heading', {
  //     name: channel.name,
  //   })
  // ).toBeInTheDocument();
  // expect(
  //   screen.getByText(`${channel.membersCount} Members`)
  // ).toBeInTheDocument();
  // expect(screen.getByText(channel.description)).toBeInTheDocument();
  // const postItems = screen.getAllByTestId('post-card');
  // posts.forEach((post, index) => {
  //   // Post Info
  //   expect(postItems[index]).toHaveTextContent(post.owner.displayName);
  //   expect(postItems[index]).toHaveTextContent(`@${post.owner.username}`);
  //   expect(postItems[index]).toHaveTextContent(post.channel.name);
  //   expect(postItems[index]).toHaveTextContent('Hello');
  //   expect(postItems[index]).toHaveTextContent('3 months');
  //   expect(postItems[index]).toHaveTextContent('#sapien');
  // });
});
