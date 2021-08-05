import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// components
import Layout from 'pages/Layout';
import { Query } from 'components/common';

// mui
import {
  Box,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';

function a11yProps(index: any) {
  return {
    id: `discovery-tab-${index}`,
    'aria-controls': `discovery-tabpanel-${index}`,
  };
}

enum Views {
  Tribes,
  Channels,
  People,
}

const ViewMap = {
  [Views.Tribes]: 'tribes',
  [Views.Channels]: 'channels',
  [Views.People]: 'people',
};

const TestCards = () => (
  <>
    {[1, 2, 3, 4, 5, 6].map((value) => (
      <Box key={value} bgcolor="yellow" minHeight={382} minWidth={341}>
        TODO
      </Box>
    ))}
  </>
);

const Discovery = () => {
  const [value, setValue] = useState(Views.Tribes);
  const [, setInputValue] = useState('');

  const { push } = useRouter();

  useEffect(() => {
    push('/discovery', `/discovery?view=${ViewMap[value]}`, { shallow: true });
  }, [value]);

  const handleChange = (_: unknown, newValue: number) => {
    setValue(newValue);
  };

  const getView = () => {
    switch (value) {
      case Views.Tribes:
        return <TestCards />;
        break;

      case Views.Channels:
        return <TestCards />;
        break;

      case Views.People:
        return <TestCards />;
        break;
    }
  };

  return (
    <Box className="card--rounded-gray" paddingTop={4} paddingX={2.8}>
      <Box marginBottom={4} paddingX={1.2}>
        <Tabs aria-label="Discovery Tabs" value={value} onChange={handleChange}>
          <Tab
            label={<Typography variant="h2">Tribes</Typography>}
            value={Views.Tribes}
            {...a11yProps(0)}
          />
          <Tab
            label={<Typography variant="h2">Channels</Typography>}
            value={Views.Channels}
            {...a11yProps(1)}
          />
          <Tab
            label={<Typography variant="h2">People</Typography>}
            value={Views.People}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
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
        {getView()}
      </Box>
    </Box>
  );
};

const DiscoveryPage = () => {
  return <Query api="/api/v3/profile/tribes">{() => <Discovery />}</Query>;
};

DiscoveryPage.Layout = Layout;

export default DiscoveryPage;
