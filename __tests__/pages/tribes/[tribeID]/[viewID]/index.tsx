// utils
import { render, screen, setAllTribes, setUser } from 'utils/testUtils';

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

test('MainChannel', () => {
  render(<MainPage />, {
    route: {
      query: {
        tribeID: tribe1.id,
        viewID: 'home',
      },
    },
  });

  expect(screen.getByText('InfiniteScroll Feed Goes here')).toBeInTheDocument();
});

test('Channel', () => {
  render(<MainPage />, {
    route: {
      query: {
        tribeID: tribe1.id,
        viewID: tribe1.channels[0].id,
      },
    },
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
    screen.getByRole('heading', {
      name: "This page don't exists",
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText('We could not find any room or channel for this route')
  ).toBeInTheDocument();
});
