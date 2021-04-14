import { useRef } from 'react';

// helpers
import { debounce } from 'lodash';

// types
import type { InputProps } from '@material-ui/core';

// mui
import {
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
} from '@material-ui/core';
import {
  CloseOutlined as Close,
  SearchOutlined as Search,
} from '@material-ui/icons';

interface Props extends InputProps {
  onSearch: (search: string) => void;
  timeout?: number;
}

const useStyles = makeStyles(() => ({
  root: () => ({
    borderRadius: '9rem !important',
    width: '100%',
  }),
}));

const DebounceSearch = ({ onSearch, timeout = 250, ...rest }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = debounce(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    timeout
  );

  const classes = useStyles();

  return (
    <Input
      className={classes.root}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="clear search"
            onClick={() => {
              ref.current.value = '';
            }}
          >
            <Close />
          </IconButton>
        </InputAdornment>
      }
      placeholder="Search..."
      startAdornment={
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      }
      {...rest}
      inputRef={ref}
      type="search"
      onChange={handleChange}
    />
  );
};

export default DebounceSearch;
