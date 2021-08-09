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
import {
  Add as AddIcon,
  ArrowDropUp as ArrowUp,
  ArrowDropDown as ArrowDown,
} from '@material-ui/icons';

// styles
import { gray2 } from 'styles/colors';

// assets

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    addButton: {
      padding: `${theme.spacing(0.6)}`,
      marginLeft: `${theme.spacing(1)}`,
      backgroundColor: gray2,
    },
    collapseButton: {
      padding: 0,
    },
  });
});

interface Props {
  children: React.ReactElement;
  showAction: boolean;
  title: string;
  onClick: () => void;
}

const Section = ({ children, showAction, title, onClick }: Props) => {
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
            <Typography>{title}</Typography>
            {showAction && (
              <IconButton
                aria-label={`Create ${title}`}
                classes={{
                  root: classes.addButton,
                }}
                onClick={onClick}
              >
                <AddIcon />
              </IconButton>
            )}
          </Box>
          <IconButton
            disableRipple
            aria-label="show options"
            classes={{
              root: classes.collapseButton,
            }}
            onClick={() => setShow(!show)}
          >
            {show ? <ArrowDown /> : <ArrowUp />}
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

export default Section;
