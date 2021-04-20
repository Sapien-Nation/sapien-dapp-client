import { useState } from 'react';

// types
import type { Tribe } from 'tools/types/tribe';

// mui
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

// components
import { DebounceSearch } from 'components/general';
import TribeTile from './TribeTile';
import Query from 'components/query';

const Discovery = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (search: string) => {
    setSearchTerm(search);
  };

  return (
    <Box>
      <Typography style={{ margin: 0 }} variant="h1">
        Discovery
      </Typography>
      <Box marginTop={3}>
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
      <Query apiUrl={`/api/discovery/tribe?search=${searchTerm}`}>
        {({
          suggested,
          tribes,
        }: {
          suggested: Array<Tribe>;
          tribes: Array<Tribe>;
        }) => (
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
        )}
      </Query>
    </Box>
  );
};

export default Discovery;
