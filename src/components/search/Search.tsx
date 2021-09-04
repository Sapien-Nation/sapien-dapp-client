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

// styles
import { neutral, primary } from 'styles/colors';

const useStyles = makeStyles(() => ({
  inputRoot: {
    borderRadius: 90,
    zIndex: 1300,
    padding: '0 !important',
    '&.Mui-focused': {
      border: 'none',
      borderRadius: 90,
    },
    position: 'relative',
    border: 0,
  },
  list: {
    height: '100%',
    padding: '0 !important',
  },
  noOptions: {
    padding: '70px 15px 15px',
  },
  listBox: {
    padding: '70px 5px 5px',
  },
  paper: {
    borderRadius: '16px 16px 5px 5px',
    width: 734,
  },
  popper: {
    top: 10,
    zIndex: 1100,
  },
  root: {
    padding: '0 8px',
  },
}));

const Search = () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.between(960, 1281));

  return (
    <Box marginRight="auto" minWidth={isMediumScreen ? 700 : 734}>
      <Autocomplete
        disablePortal
        classes={{
          inputRoot: classes.inputRoot,
          listbox: classes.listBox,
          noOptions: classes.noOptions,
          paper: classes.paper,
          popper: classes.popper,
          root: classes.root,
        }}
        getOptionLabel={(option) => option.name}
        inputValue={inputValue}
        open={open}
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
              endAdornment: inputValue && (
                <Box alignItems="center" display="flex">
                  <Typography
                    style={{
                      color: neutral[500],
                      fontSize: 16,
                      marginRight: '2rem',
                    }}
                  >
                    13 results
                  </Typography>
                  <IconButton
                    aria-label="Clear search text"
                    onClick={() => setInputValue('')}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ),
              style: {
                border: open ? `2px solid ${primary[400]}` : 'none',
              },
            }}
            inputProps={{ ...params.inputProps, style: { border: '0px' } }}
          />
        )}
        renderOption={(option) => <OptionItem option={option} />}
        onClose={() => setOpen(false)}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          if (!newInputValue) {
            setOpen(false);
          }
        }}
        onOpen={() => {
          if (inputValue) {
            setOpen(true);
          }
        }}
      />
    </Box>
  );
};

export default Search;
