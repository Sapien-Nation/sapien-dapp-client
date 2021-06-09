// components
import { Image, Query } from 'components/common';

// hooks
import { getTribe } from 'hooks';

// mui
import { Avatar, Box, Typography } from '@material-ui/core';

// types
import type { Tribe } from 'tools/types/tribe/view';

interface Props {
  squareID: string;
}

const Header = ({ squareID }: Props) => {
  const tribe = getTribe(squareID);
  return (
    <Box className="card--rounded" padding={0.8}>
      <Query api={`/api/tribe/${tribe.id}`}>
        {(tribe: Tribe) => (
          <>
            <Image
              alt={tribe.description}
              src={tribe.cover}
              style={{ width: '100%', height: 200 }}
            />
            <Box paddingBottom={3.5} paddingX={3.2}>
              <Box display="flex" marginBottom={3.2}>
                <Avatar
                  alt={tribe.name}
                  src={tribe.avatar}
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
                    <Typography variant="h2">{tribe.name}</Typography>
                    <Typography color="textSecondary" variant="button">
                      {tribe.identifier}
                    </Typography>
                  </Box>
                  <Box alignItems="baseline" display="flex" gap={1.4}>
                    <Typography color="textSecondary" variant="button">
                      {tribe.followersCount} Followers
                    </Typography>
                    <Typography color="textSecondary" variant="button">
                      {tribe.membersCount} Members
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography color="textSecondary" variant="body2">
                {tribe.description}
              </Typography>
            </Box>
          </>
        )}
      </Query>
    </Box>
  );
};

export default Header;
