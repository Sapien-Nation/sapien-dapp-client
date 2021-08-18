import React, { useState } from 'react';

// components
import OptionItem from './OptionItem';

// data
import { options } from './mockData';

// mui
import {
  Box,
  IconButton,
  makeStyles,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  list: {
    height: '100%',
    padding: '0 !important',
  },
  inputRoot: {
    borderRadius: 90,
    padding: '0 !important',
    '&.Mui-focused': {
      border: 'none',
      borderRadius: 90,
    },
  },
}));

const Search = () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.between(960, 1281));
  return (
    <Box marginRight="auto" minWidth={isMediumScreen ? 700 : 734}>
      <Autocomplete
        classes={{
          inputRoot: classes.inputRoot,
        }}
        getOptionLabel={(option) => option.name}
        inputValue={inputValue}
        open={inputValue !== '' && inputValue.length > 0}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            InputProps={{
              ...params.InputProps,
              type: 'search',
              startAdornment: (
                <SearchIcon style={{ color: '#C4C5CC', marginLeft: 10 }} />
              ),
              endAdornment: inputValue.length > 0 && (
                <Box alignItems="center" display="flex">
                  <Typography>13 results</Typography>
                  <IconButton
                    aria-label="Clear search text"
                    onClick={() => setInputValue('')}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ),
            }}
          />
        )}
        renderOption={(option) => <OptionItem option={option} />}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />
    </Box>
  );
};

export default Search;
