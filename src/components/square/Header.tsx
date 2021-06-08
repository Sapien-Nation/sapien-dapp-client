// next
import { useRouter } from 'next/router';

// types
import { Square } from 'tools/types/square/view';

// mui
import { Avatar, Box, Typography } from '@material-ui/core';

// components
import { Query } from 'components/common';

interface Props {
  avatar: string;
  cover: string;
}

const Header = ({ avatar, cover }: Props) => {
  const { query } = useRouter();

  return (
    <Box className="card--rounded" padding={0.8}>
      <Query apiUrl={query.squareid ? `/api/square/${query.squareid}` : ''}>
        {(square: Square) => (
          <>
            <img
              alt={square.description}
              src={cover}
              style={{ width: '100%', height: 200 }}
            />
            <Box paddingBottom={3.5} paddingX={3.2}>
              <Box display="flex" marginBottom={3.2}>
                <Avatar
                  alt={square.name}
                  src={avatar}
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 16,
                    border: '3px solid white',
                    top: '-2.5rem',
                  }}
                  variant="rounded"
                />
                <Box
                  display="grid"
                  marginLeft={3}
                  marginTop={2.8}
                  style={{ gap: 8 }}
                >
                  <Box alignItems="baseline" display="flex" gap={1.4}>
                    <Typography variant="h2">{square.name}</Typography>
                    <Typography color="textSecondary" variant="button">
                      {square.userName}
                    </Typography>
                  </Box>
                  <Box alignItems="baseline" display="flex" gap={1.4}>
                    <Typography color="textSecondary" variant="button">
                      {square.followersCount} Followers
                    </Typography>
                    <Typography color="textSecondary" variant="button">
                      {square.membersCount} Members
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography color="textSecondary" variant="body2">
                {square.description}
              </Typography>
            </Box>
          </>
        )}
      </Query>
    </Box>
  );
};

export default Header;
