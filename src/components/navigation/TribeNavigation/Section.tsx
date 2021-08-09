import { useState } from 'react';

// types
import type { Theme } from '@material-ui/core/styles';

// mui
import {
  Box,
  createStyles,
  Collapse,
  IconButton,
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
      <div>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          paddingTop={0.5}
          px={1.6}
          style={{ cursor: 'pointer' }}
          onClick={() => setShow(!show)}
        >
          <Box alignItems="center" display="flex">
            <Typography
              color="textSecondary"
              style={{ textTransform: 'uppercase' }}
              variant="caption"
            >
              {title}
            </Typography>
            {showAction && (
              <IconButton
                aria-label={`Create ${title}`}
                classes={{
                  root: classes.addButton,
                }}
                onClick={onClick}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          <IconButton aria-label={`Toggle ${title} section`} component="span">
            {show ? <ArrowUp /> : <ArrowDown />}
          </IconButton>
        </Box>
      </div>
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
