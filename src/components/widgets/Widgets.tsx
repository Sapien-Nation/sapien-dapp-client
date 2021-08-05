import { useState } from 'react';

// mui
import {
  Box,
  Collapse,
  Drawer,
  makeStyles,
  Typography,
} from '@material-ui/core';

// components
import CalendarEvents from './CalendarEvents';

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
        <Typography
          color="textSecondary"
          style={{ cursor: 'pointer' }}
          variant="caption"
          onClick={() => setCalendarWidgets(!openCalendarWidgets)}
        >
          ANNOUNCEMENTS
        </Typography>
        <Collapse unmountOnExit in={openCalendarWidgets} timeout="auto">
          <CalendarEvents />
        </Collapse>
      </Box>
    </Drawer>
  );
};

export default Wdigets;
