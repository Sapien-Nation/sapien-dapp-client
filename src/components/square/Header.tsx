// components
import { Image, PageHeaderSkeleton, Query } from 'components/common';

// mui
import { Avatar, Box, Typography } from '@material-ui/core';

// types
import type { Tribe } from 'tools/types/tribe/view';

interface Props {
  tribeID: string;
}

const Header = ({ tribeID }: Props) => (
  <Box className="card--rounded-white" padding={0.8}>
    <Query api={`/api/v3/tribe/${tribeID}`} loader={<PageHeaderSkeleton />}>
      {(tribe: Tribe) => (
        <>
          <Image
            alt={tribe.description}
            fallbackImage={tribe.cover_original}
            src={tribe.cover}
            style={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              borderRadius: '1.6rem',
            }}
          />
          <Box paddingBottom={3.5} paddingX={3.2} whiteSpace="pre-wrap">
            <Box
              alignItems="flex-end"
              display="flex"
              position="relative"
              top="-3rem"
            >
              <Avatar
                alt={tribe.name}
                src={tribe.avatar}
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 16,
                  border: '3px solid white',
                }}
                variant="rounded"
              >
                {tribe.avatar_original ? (
                  <img
                    alt={tribe.name}
                    className="MuiAvatar-img"
                    src={tribe.avatar_original}
                  />
                ) : (
                  tribe.name[0].toUpperCase()
                )}
              </Avatar>
              <Box display="grid" paddingLeft={3} style={{ gap: 8 }}>
                <Box
                  alignItems="baseline"
                  display="flex"
                  style={{ gap: '14px' }}
                >
                  <Typography variant="h2">{tribe.name}</Typography>
                  <Typography color="textSecondary" variant="button">
                    @{tribe.identifier}
                  </Typography>
                </Box>
                <Box
                  alignItems="baseline"
                  display="flex"
                  style={{ gap: '14px' }}
                >
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

export default Header;
