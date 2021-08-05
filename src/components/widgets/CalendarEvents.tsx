//mui
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';

// styles
import { neutral } from 'styles/colors';

// types
import type { CalendarWidget } from 'tools/types/widgets/calendarWidget';

const events = [
  {
    id: '124',
    date: '2021-08-21',
    start: '10AM',
    end: '12PM',
    title: 'Kickoff Design Review Meeting',
  },
  {
    id: '125',
    date: '2021-09-12',
    start: '10AM',
    end: '12PM',
    title: 'Second Design Review Meeting',
  },
];

const CalendarEvents = () => {
  return (
    <List>
      {events.map(({ id, date, start, end, title }: CalendarWidget) => {
        return (
          <div key={id}>
            <ListItem disableGutters alignItems="flex-start">
              <Box
                alignItems="center"
                borderRadius={10}
                boxShadow="3px 10px 15px rgba(47, 22, 81, 0.1)"
                display="flex"
                flexDirection="column"
                height={72}
                justifyContent="center"
                width={58}
              >
                <Typography color="error" component="span" variant="h4">
                  {Intl.DateTimeFormat('default', {
                    month: 'short',
                  })
                    .format(new Date(date))
                    .toUpperCase()}
                </Typography>
                <Typography component="span" variant="h2">
                  {Intl.DateTimeFormat('default', {
                    day: '2-digit',
                  }).format(new Date(date))}
                </Typography>
              </Box>
              <ListItemText
                disableTypography
                primary={<Typography variant="button">{title}</Typography>}
                secondary={
                  <>
                    <Typography
                      color="textSecondary"
                      display="block"
                      variant="overline"
                    >
                      {start} - {end}
                    </Typography>
                  </>
                }
                style={{ paddingLeft: '1.6rem' }}
              />
            </ListItem>
            <Divider
              component="li"
              style={{
                background: 'none',
                border: `1px dashed ${neutral[100]}`,
              }}
            />
          </div>
        );
      })}
    </List>
  );
};

export default CalendarEvents;
