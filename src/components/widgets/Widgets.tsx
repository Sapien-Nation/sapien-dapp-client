import { useState } from 'react';

// mui
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

// components
import CalendarEvents from './CalendarEvents';
import TopCreators from './TopCreators';

// styles
import { neutral } from 'styles/colors';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: 290,
    borderLeft: 'none',
    overflow: 'auto',
    height: `calc(100% - 97px)`,
    top: 97,
  },
}));

const Wdigets = () => {
  const classes = useStyles();
  const [openCalendarWidgets, setCalendarWidgets] = useState(true);
  const [openCreatorWidgets, setCreatorWidgets] = useState(true);

  return (
    <Drawer
      anchor="right"
      classes={{
        paper: classes.drawerPaper,
      }}
      style={{ gridArea: 'widgets' }}
      variant="permanent"
    >
      <Box padding={2.5}>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          style={{ cursor: 'pointer' }}
          onClick={() => setCalendarWidgets(!openCalendarWidgets)}
        >
          <Typography color="textSecondary" variant="caption">
            ANNOUNCEMENTS
          </Typography>
          <IconButton aria-label="Toggle calendar widgets" component="span">
            {openCalendarWidgets ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        </Box>

        <Collapse unmountOnExit in={openCalendarWidgets} timeout="auto">
          <CalendarEvents />
        </Collapse>
        <Divider
          style={{
            background: 'none',
            border: `1px dashed ${neutral[100]}`,
            margin: '2rem 0',
          }}
        />
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          style={{ cursor: 'pointer' }}
          onClick={() => setCreatorWidgets(!openCreatorWidgets)}
        >
          <Typography color="textSecondary" variant="caption">
            TOP CREATORS
          </Typography>
          <IconButton aria-label="Toggle creators widgets" component="span">
            {openCreatorWidgets ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        </Box>
        <Collapse unmountOnExit in={openCreatorWidgets} timeout="auto">
          <TopCreators />
        </Collapse>
      </Box>
    </Drawer>
  );
};

export default Wdigets;
