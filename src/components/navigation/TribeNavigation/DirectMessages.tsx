import Link from 'next/link';
import { useRouter } from 'next/router';

// mui
import {
  Avatar,
  Box,
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';

// styles
import { primary } from 'styles/colors';

// utils
import { formatTimestampToRelative } from 'utils/date';

const useStyles = makeStyles(() => {
  return createStyles({
    listItemSelected: {
      backgroundColor: `${primary[800]} !important`,
      '& .MuiTypography-root, & .MuiSvgIcon-root': {
        color: `#fff !important`,
      },
    },
    dmAvatar: {
      width: '4.8rem',
      height: '4.8rem',
    },
  });
});

interface Props {
  messages: Array<any>;
}

const DirectMessages = ({ messages }: Props) => {
  const classes = useStyles();
  const { asPath, query } = useRouter();
  const { squareID } = query;

  return (
    <>
      <List aria-label="Message list" role="list" style={{ padding: 0 }}>
        {messages.map(({ avatar, displayName, id, seenAt, body }) => {
          return (
            <ListItem
              key={id}
              disableGutters
              alignItems="flex-start"
              classes={{
                selected: classes.listItemSelected,
              }}
              selected={asPath === `/client/${squareID}/messages/${id}`}
              style={{
                borderRadius: 10,
                margin: '0.5rem 0',
                padding: '0',
              }}
            >
              <Link key={id} href={`/client/${squareID}/messages/${id}`}>
                <a
                  style={{
                    display: 'flex',
                    width: '100%',
                    padding: '1rem 1.5rem',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    alt={displayName}
                    className={classes.dmAvatar}
                    src={avatar}
                  />
                  <Box
                    display="flex"
                    flex={1}
                    justifyContent="space-between"
                    minWidth={0}
                    paddingLeft={1.5}
                  >
                    <ListItemText
                      primary={
                        <Typography noWrap display="block" variant="button">
                          {displayName}
                        </Typography>
                      }
                      secondary={
                        <Box display="flex" justifyContent="space-between">
                          <Typography
                            noWrap
                            color="textSecondary"
                            display="block"
                            variant="overline"
                          >
                            {body}
                          </Typography>
                          <Typography
                            align="right"
                            color="textSecondary"
                            display="block"
                            style={{ minWidth: '4rem' }}
                            variant="overline"
                          >
                            {formatTimestampToRelative(seenAt)}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                </a>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default DirectMessages;
