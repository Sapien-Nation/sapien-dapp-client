// next
import { useRouter } from 'next/router';

// types
import { Square } from 'tools/types/square/view';

// next
import Image from 'next/image';

// mui
import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';

// components
import { Query } from 'components/common';

const useStyles = makeStyles(() => ({
  cover: {
    borderRadius: '1.2rem',
  },
}));

interface Props {
  avatar: string;
  cover: string;
}

const Header = ({ avatar, cover }: Props) => {
  const { query } = useRouter();
  const classes = useStyles();

  return (
    <Query apiUrl={query.squareid ? `/api/square/${query.squareid}` : ''}>
      {(square: Square) => {
        const { description, followersCount, name, membersCount, userName } =
          square;
        return (
          <Box borderRadius="1.6rem" padding={0.8}>
            <Box>
              <Box height="20rem" position="relative">
                <Image
                  alt={`${name}`}
                  className={classes.cover}
                  layout="fill"
                  objectFit="cover"
                  src={cover}
                />
              </Box>
              <Box
                paddingX={3}
                position="relative"
                style={{
                  top: '-2.5rem',
                }}
              >
                <Box
                  alignItems="flex-end"
                  display="flex"
                  flexDirection="row"
                  marginBottom={3}
                >
                  <Avatar
                    alt={name}
                    style={{
                      width: '11.1rem',
                      height: '11.1rem',
                      borderRadius: '1.6rem',
                      border: `3px solid white`,
                    }}
                    variant="rounded"
                  >
                    <Image alt={name} height={110} src={avatar} width={110} />
                  </Avatar>
                  <Box marginLeft={3}>
                    <Typography gutterBottom variant="h2">
                      {name}{' '}
                      <Typography
                        gutterBottom
                        marginLeft={1.5}
                        variant="buttonMedium"
                      >
                        {userName}
                      </Typography>
                    </Typography>
                    <Typography
                      component="span"
                      marginRight={1.5}
                      variant="body4"
                    >
                      {followersCount} Followers
                    </Typography>
                    <Typography component="span" variant="body4">
                      {membersCount} Members
                    </Typography>
                  </Box>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  {description}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      }}
    </Query>
  );
};

export default Header;
