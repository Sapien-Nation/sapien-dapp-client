// utils
import {
  render,
  screen,
  setAllTribes,
  setUser,
  waitFor,
} from 'utils/testUtils';

// components
import MainPage from 'pages/tribes/[tribeID]/[viewID]';

// mocks
import { mockProfileTribe, mockProfileTribeChannel } from 'tools/mocks/tribe';

const channel1 = mockProfileTribeChannel();
const tribe1 = mockProfileTribe({ channels: [channel1] });
const tribe2 = mockProfileTribe();
const tribes = [tribe1, tribe2];

beforeEach(() => {
  setUser();
  setAllTribes(tribes);
});

test('MainChannel', async () => {
  render(<MainPage />, {
    route: {
      query: {
        tribeID: tribe1.id,
        viewID: 'home',
      },
    },
  });

  await waitFor(() => {
    expect(true).toBe(true);
  });
});

test('Channel', async () => {
  render(<MainPage />, {
    route: {
      query: {
        tribeID: tribe1.id,
        viewID: tribe1.channels[0].id,
      },
    },
  });

  await waitFor(() => {
    expect(true).toBe(true);
  });
});

test('Room', () => {
  render(<MainPage />, {
    route: {
      query: {
        tribeID: tribe1.id,
        viewID: '123456789',
      },
    },
  });
});

test('NotFound', () => {
  render(<MainPage />, {
    route: {
      query: {
        tribeID: tribe1.id,
        viewID: 'not_found',
      },
    },
  });

  expect(
    screen.getByRole('img', { name: 'People working on laptops' })
  ).toHaveAttribute(
    'src',
    'https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg'
  );

  expect(
    screen.getByText('You dont have access to see this content')
  ).toBeInTheDocument();
});
