/* istanbul ignore file */
import Layout from './Layout';

import { useState } from 'react';

// types
import type { Tribe } from 'tools/types/tribe';

// mui
import { Box, Button, Grid, Typography } from '@material-ui/core';

// components
import { TribeTile, Header } from 'components/discovery';
import { Query, Page } from 'components/common';

const DiscoveryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (search: string) => {
    setSearchTerm(search);
  };

  return (
    <Query apiUrl={`/api/discovery/tribe?search=${searchTerm}`}>
      {({
        suggested,
        tribes,
      }: {
        suggested: Array<Tribe>;
        tribes: Array<Tribe>;
      }) => (
        <Page
          filters={<></>}
          header={<Header handleSearch={handleSearch} />}
          title="Discovery"
        >
          <>
            <Box display="flex" justifyContent="space-between" marginY={3}>
              <div>
                <Typography style={{ margin: 0 }} variant="h2">
                  Tribes Suggested for You
                </Typography>
                <Typography variant="caption">
                  Tribes you might be interested in
                </Typography>
              </div>
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
              <div>
                <Typography style={{ margin: 0 }} variant="h2">
                  Friends Tribes
                </Typography>
                <Typography variant="caption">
                  Tribes your friends are in
                </Typography>
              </div>
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
        </Page>
      )}
    </Query>
  );
};

DiscoveryPage.Layout = Layout;

export default DiscoveryPage;
