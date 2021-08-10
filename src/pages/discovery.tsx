import { matchSorter } from 'match-sorter';
import { useState } from 'react';

// components
import { Layout, Query } from 'components/common';
import { TribeCard } from 'components/discovery';

// mui
import { Box, IconButton, TextField } from '@material-ui/core';
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';
import { mockTribe } from 'tools/mocks/discover';

const tribes = [
  mockTribe({
    avatar: '/fixtures/40x40/settings.png',
    cover: '/fixtures/256x256/battery.png',
    name: 'The neverending world of Astronomy',
    description:
      'Lorem ipsum dolor sit ame, consectetur adipiscing elit. Ut mattis purus elit, quis elei fend consectetur adipiscing elit sit ame...',
    membersCount: 840,
  }),
  mockTribe({
    avatar: '/fixtures/40x40/trash.png',
    cover: '/fixtures/256x256/bob.png',
    name: 'Beauty of Nature',
    description:
      'Lorem ipsum dolor sit ame, consectetur adipiscing elit. Ut mattis purus elit, quis elei fend consectetur adipiscing elit sit ame...',
    membersCount: 345900,
  }),
  mockTribe({
    avatar: '/fixtures/40x40/messaging.png',
    cover: '/fixtures/256x256/stonks.png',
    name: 'Dogs Make Me Smile (Doggo Memes Community)',
    description:
      'Lorem ipsum dolor sit ame, consectetur adipiscing elit. Ut mattis purus elit, quis elei fend consectetur adipiscing elit sit ame...',
    membersCount: 56700000,
  }),
  mockTribe({
    avatar: '/fixtures/40x40/food.png',
    cover: '/fixtures/256x256/dinner.png',
    name: 'Come Join us at Bobs Table',
    description:
      'Lorem ipsum dolor sit ame, consectetur adipiscing elit. Ut mattis purus elit, quis elei fend consectetur adipiscing elit sit ame...',
    membersCount: 6789,
  }),
  mockTribe({
    avatar: '/fixtures/40x40/folder.png',
    cover: '/fixtures/256x256/camera.png',
    name: 'Always keep things where they are',
    description:
      'Lorem ipsum dolor sit ame, consectetur adipiscing elit. Ut mattis purus elit, quis elei fend consectetur adipiscing elit sit ame...',
    membersCount: 43000,
  }),
  mockTribe({
    avatar: '/fixtures/40x40/cars.png',
    cover: '/fixtures/256x256/general.png',
    name: 'The Car Community',
    description:
      'Lorem ipsum dolor sit ame, consectetur adipiscing elit. Ut mattis purus elit, quis elei fend consectetur adipiscing elit sit ame...',
    membersCount: 76550,
  }),
];

const Discovery = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTribes = matchSorter(tribes, searchTerm, { keys: ['name'] });
  return (
    <Box
      className="card--rounded-gray"
      marginTop={12.7}
      paddingTop={4}
      paddingX={2.8}
    >
      <Box marginBottom={3}>
        <TextField
          fullWidth
          InputProps={{
            placeholder: 'Search for tribes, channels, or people',
            type: 'search',
            startAdornment: <SearchIcon style={{ marginLeft: 10 }} />,
            endAdornment: (
              <IconButton onClick={() => setSearchTerm('')}>
                <CloseIcon />
              </IconButton>
            ),
          }}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </Box>
      <Box
        display="grid"
        style={{
          gap: '40px',
          gridRowGap: '16px',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        {filteredTribes.map((tribe: any) => (
          <TribeCard key={tribe.id} tribe={tribe} />
        ))}
      </Box>
    </Box>
  );
};

const DiscoveryPage = () => {
  return <Query api="/api/v3/profile/tribes">{() => <Discovery />}</Query>;
};

DiscoveryPage.Layout = Layout;

export default DiscoveryPage;
