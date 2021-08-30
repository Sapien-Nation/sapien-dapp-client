import { useState } from 'react';

// mui
import {
  Button,
  makeStyles,
  Menu,
  Typography
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
  root: {
    backgroundColor: neutral[200],
    borderRadius: 8,
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 20px",
    width: 169
  }
}));

const Filter = ({ id, name }: Props) => {
  const [filtersAnchor, setFilterAnchor] =
  useState<null | HTMLElement>(null);
  const classes = useStyles();
  return (
    <>
      <Button
        aria-controls={`${id}`}
        aria-haspopup="true"
        aria-label={`${name}`}
        classes={{
          disabled: classes.disabled,
          root: classes.root
        }}
        endIcon={<ArrowDropDownIcon />}
        disabled={true}
        onClick={(event) => setFilterAnchor(event.currentTarget)}
      >
        <Typography variant="h5">Sort by:</Typography>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>Portal</Typography>
      </Button>
      <Menu
        anchorEl={filtersAnchor}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        getContentAnchorEl={null}
        id={`${id}`}
        open={Boolean(filtersAnchor)}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setFilterAnchor(null)}
      >
        <span>Filters</span>
      </Menu>
    </>
  );
}

export default Filter;
