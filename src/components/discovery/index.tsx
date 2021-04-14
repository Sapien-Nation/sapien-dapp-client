// mui
import { Box, Button, InputAdornment, Typography } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

// components
import { DebounceSearch } from 'components/general';

const Discovery = () => {
  const handleSearch = (search) => {
    console.log(search);
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
          timeout={0}
          onSearch={handleSearch}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop={3}>
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
    </Box>
  );
};

export default Discovery;
