// utils
import { render, screen, setAllTribes } from 'utils/testUtils';

// components
import MainPage from 'pages/tribes/[tribeID]/[viewID]';
import { mockProfileTribe, mockProfileTribeChannel } from 'tools/mocks/tribe';

const channel1 = mockProfileTribeChannel();
const tribe1 = mockProfileTribe({ channels: [channel1] });
const tribe2 = mockProfileTribe();
const tribes = [tribe1, tribe2];

beforeEach(() => {
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

  expect(screen.getByText('Editor goes here')).toBeInTheDocument();
  expect(screen.getByText('InfiniteScroll Feed Goes here')).toBeInTheDocument();
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

  expect(screen.getByText('Editor goes here')).toBeInTheDocument();
  expect(screen.getByText('InfiniteScroll Feed Goes here')).toBeInTheDocument();
});
