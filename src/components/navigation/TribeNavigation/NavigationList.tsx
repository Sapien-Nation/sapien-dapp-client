import { useState } from 'react';

// types
import type { Theme } from '@material-ui/core/styles';

// mui
import {
  Box,
  createStyles,
  Collapse,
  IconButton,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';

// styles
import { background } from 'styles/colors';

// assets
import { AddIcon, ArrowIcon } from '../assets/svg';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    addButton: {
      padding: `${theme.spacing(0.6)}`,
      marginLeft: `${theme.spacing(1)}`,
      backgroundColor: background,
    },
    collapseButton: {
      padding: 0,
    },
  });
});

interface Props {
  children: React.ReactElement;
  showAddButton: boolean;
  title: string;
  onAdd: () => void;
}

const NavigationList = ({ children, showAddButton, title, onAdd }: Props) => {
  const [show, setShow] = useState(true);

  const classes = useStyles();

  return (
    <>
      <ListItem disableGutters component="div">
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          px={2}
          py={1}
          width="100%"
        >
          <Box alignItems="center" display="flex">
            <Typography variant="h5">{title}</Typography>
            {showAddButton && (
              <IconButton
                aria-label={`Create ${title}`}
                classes={{
                  root: classes.addButton,
                }}
                onClick={onAdd}
              >
                <AddIcon />
              </IconButton>
            )}
          </Box>
          <IconButton
            disableRipple
            aria-label="show channels"
            classes={{
              root: classes.collapseButton,
            }}
            style={{
              transform: show ? '' : 'rotate(180deg)',
            }}
            onClick={() => setShow(!show)}
          >
            <ArrowIcon />
          </IconButton>
        </Box>
      </ListItem>
      <Collapse
        unmountOnExit
        in={show}
        style={{ width: '100%' }}
        timeout="auto"
      >
        {children}
      </Collapse>
    </>
  );
};

export default NavigationList;
