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
import { primary, neutral } from 'styles/colors';

// utils
import { formatTimestampToRelative } from 'utils/date';

const useStyles = makeStyles(() => {
  return createStyles({
    avatar: {
      borderRadius: 10,
      boxSizing: 'border-box',
      padding: '2px',
      width: '4.8rem',
      height: '4.8rem',
      '& > img': {
        borderRadius: 10,
      },
    },
    listItemSelected: {
      backgroundColor: `${primary[800]} !important`,
      '& .MuiTypography-root, & .MuiSvgIcon-root': {
        color: `#fff !important`,
      },
    },
  });
});

interface Props {
  channels: Array<any>;
}

const Channels = ({ channels }: Props) => {
  const classes = useStyles();
  const { asPath, query } = useRouter();
  const { squareID } = query;

  return (
    <List aria-label="Channels list" role="list" style={{ padding: 0 }}>
      {channels.map(({ avatar, name, id, lastUpdateAt, membersCount }) => {
        return (
          <ListItem
            key={id}
            disableGutters
            alignItems="flex-start"
            classes={{
              selected: classes.listItemSelected,
            }}
            selected={asPath === `/client/${squareID}/channel/${id}`}
            style={{
              borderRadius: 10,
              margin: '0.5rem 0',
              padding: '0',
            }}
          >
            <Link key={id} href={`/client/${squareID}/channel/${id}`}>
              <a
                style={{
                  display: 'flex',
                  width: '100%',
                  padding: '1rem 1.5rem',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  alt={name}
                  className={classes.avatar}
                  src={avatar}
                  style={{
                    border: `2px solid ${
                      asPath === `/client/${squareID}/channel/${id}`
                        ? 'white'
                        : neutral[200]
                    }`,
                  }}
                  variant="square"
                />
                <Box
                  display="flex"
                  flex={1}
                  justifyContent="space-between"
                  minWidth={0}
                  paddingLeft={1.5}
                >
                  <ListItemText
                    disableTypography
                    primary={
                      <Box
                        alignItems="center"
                        display="flex"
                        justifyContent="space-between"
                      >
                        <Typography noWrap display="block" variant="button">
                          {name}
                        </Typography>
                        <Typography
                          align="right"
                          color="textSecondary"
                          display="block"
                          style={{ minWidth: '4rem' }}
                          variant="overline"
                        >
                          {formatTimestampToRelative(lastUpdateAt)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          color="textSecondary"
                          display="block"
                          variant="overline"
                        >
                          {membersCount} members
                        </Typography>
                      </>
                    }
                  />
                </Box>
              </a>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Channels;
