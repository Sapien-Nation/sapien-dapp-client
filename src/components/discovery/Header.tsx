// mui
import { Box, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

// components
import { DebounceSearch } from 'components/common';

// style
import { white } from 'styles/colors';

interface Props {
  handleSearch: (search: string) => Promise<void>;
}

const Header = ({ handleSearch }: Props) => {
  return (
    <Box bgcolor={white} borderRadius="1.6" padding={0.8}>
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
  );
};

export default Header;
