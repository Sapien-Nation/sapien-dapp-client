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
  });
});

interface Props {
  messages: Array<any>;
}

const DirectMessages = ({ messages }: Props) => {
  const classes = useStyles();
  const { asPath, query } = useRouter();
  const { tribeid } = query;

  return (
    <>
      <List aria-label="Message list" role="list" style={{ padding: 0 }}>
        {messages.map(({ avatarImage, name, id, lastUpdateAt, message }) => {
          return (
            <ListItem
              key={id}
              disableGutters
              alignItems="flex-start"
              classes={{
                selected: classes.listItemSelected,
              }}
              selected={asPath === `/client/${tribeid}/channel/${id}`}
              style={{
                borderRadius: 10,
                margin: '0.5rem 0',
                padding: '0',
              }}
            >
              <Link key={id} href={`/client/${tribeid}/channel/${id}`}>
                <a
                  style={{
                    display: 'flex',
                    width: '100%',
                    padding: '1rem 1.5rem',
                    alignItems: 'center',
                  }}
                >
                  <Avatar alt={name} src={avatarImage} />
                  <Box
                    display="flex"
                    flex={1}
                    justifyContent="space-between"
                    paddingLeft={1.5}
                  >
                    <ListItemText
                      disableTypography
                      primary={<Typography variant="button">{name}</Typography>}
                      secondary={
                        <>
                          <Typography
                            color="textSecondary"
                            display="block"
                            variant="overline"
                          >
                            {message}
                          </Typography>
                        </>
                      }
                    />
                    <Typography
                      color="textSecondary"
                      display="block"
                      style={{ marginTop: '1rem' }}
                      variant="overline"
                    >
                      {formatTimestampToRelative(lastUpdateAt)}
                    </Typography>
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
