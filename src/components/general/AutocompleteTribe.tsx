/* istanbul ignore file */
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// components
import Autocomplete from 'components/form/Autocomplete';

// mui
import { Button, Popover, makeStyles, InputAdornment } from '@material-ui/core';
import { SearchOutlined as Search } from '@material-ui/icons';

// types
import type { Tribe } from 'types/tribe';

const useStyles = makeStyles(() => ({
  paper: () => ({
    height: '292px',
    padding: '1.6rem',
    boxShadow: '-20px 0px 40px rgb(51 51 51 / 10%)',
    borderRadius: '1.6rem',
  }),
}));

const AutocompleteTribe = ({
  defaultValue = {
    id: '1',
    name: 'Sapien',
    channels: [],
    image: '/fixtures/256x256/general.png',
    notificationNumber: 47,
  },
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useStyles();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'select' : undefined;
  const { errors } = useForm();
  const [label, setLabel] = useState<Tribe | null>(defaultValue);

  return (
    <div>
      <Button
        aria-describedby={id}
        color="primary"
        variant="contained"
        onClick={handleClick}
      >
        {label.name}
      </Button>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{ paper: classes.paper }}
        id={id}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleClose}
      >
        <Autocomplete
          defaultValue={defaultValue}
          endAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          errors={errors}
          getCurrentValue={setLabel}
          name="search-tribes"
          placeholder="Search"
        />
      </Popover>
    </div>
  );
};

export default AutocompleteTribe;
