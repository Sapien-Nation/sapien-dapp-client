// mui
import { TextField, InputAdornment } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const Store = () => {
  return (
    <div>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: {
            borderRadius: 90,
          },
        }}
        id="search"
        label=""
        placeholder="Search for badges"
      />
    </div>
  );
};

export default Store;
