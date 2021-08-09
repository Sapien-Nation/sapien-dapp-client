import { useState } from 'react';

// components
import { Layout, Query } from 'components/common';
import { TribeCard } from 'components/discovery';

// mui
import { Box, IconButton, TextField } from '@material-ui/core';
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';
import { mockTribe } from 'tools/mocks/discover';

const tribes = [
  mockTribe({ cover: '/fixtures/256x256/general.png' }),
  mockTribe({ cover: '/fixtures/256x256/general.png' }),
  mockTribe({ cover: '/fixtures/256x256/general.png' }),
];

const Discovery = () => {
  const [, setInputValue] = useState('');

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
              <IconButton onClick={() => setInputValue('')}>
                <CloseIcon />
              </IconButton>
            ),
          }}
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
        {tribes.map((tribe: any) => (
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
