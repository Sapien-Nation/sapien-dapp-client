import { useState } from 'react';

// mui
import {
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// styles
import { neutral } from 'styles/colors';

interface Props {
  id: string;
  name?: string;
}

const useStyles = makeStyles(() => ({
  disabled: {
    backgroundColor: neutral[400],
  },
  paper: {
    width: 169,
  },
  root: {
    backgroundColor: neutral[200],
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 18px',
    width: 169,
  },
}));

const Filter = ({ id, name }: Props) => {
  const [option, setOption] = useState('Popular');
  const [filtersAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const classes = useStyles();

  const handleClose = () => setFilterAnchor(null);
  const setMenuOption = (menuOption: string) => {
    if (menuOption !== option) {
      setOption(menuOption);
    }
    handleClose();
  };

  return (
    <>
      <Button
        aria-controls={`${id}`}
        aria-haspopup="true"
        aria-label={`${name}`}
        classes={{
          disabled: classes.disabled,
          root: classes.root,
        }}
        disabled={true}
        endIcon={<ArrowDropDownIcon />}
        onClick={(event) => setFilterAnchor(event.currentTarget)}
      >
        <Typography variant="h5">Sort by:</Typography>
        <Typography style={{ fontWeight: 'bold' }} variant="h5">
          {option}
        </Typography>
      </Button>
      <Menu
        anchorEl={filtersAnchor}
        classes={{ paper: classes.paper }}
        getContentAnchorEl={null}
        id={`${id}`}
        open={Boolean(filtersAnchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => setMenuOption('Popular')}>Popular</MenuItem>
        <MenuItem onClick={() => setMenuOption('Hottest')}>Hottest</MenuItem>
        <MenuItem onClick={() => setMenuOption('Lastest')}>Lastest</MenuItem>
      </Menu>
    </>
  );
};

export default Filter;
