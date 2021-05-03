/* istanbul ignore file */
import Layout from './Layout';

import { useState } from 'react';

// types
import type { Tribe } from 'tools/types/tribe';

// mui
import {
  Box,
  Button,
  Grid,
  Typography,
  InputAdornment,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

// components
import { TribeTile } from 'components/discover';
import { DebounceSearch, Page, Query } from 'components/common';

const DiscoveryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (search: string) => {
    setSearchTerm(search);
  };

  return (
    <Page
      userWrapper
      actions={
        <Box borderRadius="1.6">
          <DebounceSearch
            fullWidth
            placeholder="Search for badge"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            style={{
              minHeight: '5.6rem',
              borderRadius: '1.6rem',
            }}
            onSearch={handleSearch}
          />
        </Box>
      }
      title="Discover"
    >
      <Query apiUrl={`/api/discover/search?searchTerm=${searchTerm}`}>
        {({
          suggested,
          tribes,
        }: {
          suggested: Array<Tribe>;
          tribes: Array<Tribe>;
        }) => (
          <>
            <Box display="flex" justifyContent="space-between" marginBottom={3}>
              <Box display="flex" flexDirection="column" marginLeft={3.2}>
                <Typography variant="buttonLarge">
                  Tribes Suggested for You
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  Tribes you might be interested in
                </Typography>
              </Box>
              <Button color="primary" variant="text">
                See All
              </Button>
            </Box>
            <Grid
              container
              alignItems="flex-start"
              direction="row"
              justifyContent="flex-start"
              spacing={2}
            >
              {suggested.map((tribe) => (
                <Grid key={tribe.id} item>
                  <TribeTile tribe={tribe} />
                </Grid>
              ))}
            </Grid>

            <Box display="flex" justifyContent="space-between" marginY={3}>
              <Box display="flex" flexDirection="column" marginLeft={3.2}>
                <Typography variant="buttonLarge">Friends Tribes</Typography>
                <Typography color="textSecondary" variant="caption">
                  Tribes your friends are in
                </Typography>
              </Box>
              <Button color="primary" variant="text">
                See All
              </Button>
            </Box>
            <Grid
              container
              alignItems="flex-start"
              direction="row"
              justifyContent="flex-start"
              spacing={2}
            >
              {tribes.map((tribe) => (
                <Grid key={tribe.id} item>
                  <TribeTile tribe={tribe} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Query>
    </Page>
  );
};

DiscoveryPage.Layout = Layout;

export default DiscoveryPage;
