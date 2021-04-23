import { useState } from 'react';
import { matchSorter } from 'match-sorter';

// assets
import {
  MultipleBadges,
  Search,
  SingleBadge,
  SubscriptionBadge,
} from 'components/common';

// mui
import {
  Avatar,
  Box,
  Button,
  Chip,
  InputAdornment,
  makeStyles,
  Typography,
} from '@material-ui/core';

// components
import { DebounceSearch, Query } from 'components/common';

// styles
import { white } from 'styles/colors';

// TODO move this to tools
interface Badge {
  id: string;
  color: string;
  name: string;
}

const useStyles = makeStyles(() => ({
  badgeChip: {
    backgroundColor: '#f5f5f5',
    marginTop: '.5rem',
    marginRight: '.5rem',
  },
  badgeLabel: {
    padding: '0 .8rem',
  },
}));

const BadgesStep = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const classes = useStyles();

  const handleSearch = (search) => {
    setSearchTerm(search);
  };
  const handleAddNewBadge = () => {};
  const handleChangeViewers = () => {};
  const handleChangeContributors = () => {};

  return (
    <Query apiUrl="/api/tribes/badges">
      {({
        tribeBadges,
        subscriptionBadges,
      }: {
        tribeBadges: Array<Badge>;
        subscriptionBadges: Array<Badge>;
      }) => (
        <Box display="grid" style={{ gap: '16px' }}>
          <Box
            alignItems="center"
            className="card--rounded"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            padding={3}
          >
            <Box alignItems="center" display="flex">
              <Typography style={{ marginRight: '1rem' }} variant="h5">
                Viewers
              </Typography>
              <MultipleBadges />
            </Box>
            <Button onClick={handleChangeViewers}>
              <Typography color="primary" style={{ fontWeight: 600 }}>
                Change badge
              </Typography>
            </Button>
          </Box>
          <Box
            alignItems="center"
            className="card--rounded"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            padding={3}
          >
            <Box alignItems="center" display="flex">
              <Typography style={{ marginRight: '1rem' }} variant="h5">
                Contributors
              </Typography>
              <SingleBadge color="#6200EA" />
            </Box>
            <Button onClick={handleChangeContributors}>
              <Typography color="primary" style={{ fontWeight: 600 }}>
                Change badge
              </Typography>
            </Button>
          </Box>
          <Box
            alignItems="center"
            className="card--rounded"
            display="grid"
            padding={3}
            style={{ gap: '17px' }}
          >
            <Box alignItems="center" display="flex">
              <Typography style={{ marginRight: '1rem' }} variant="h5">
                Subscription
              </Typography>
              <SubscriptionBadge />
            </Box>
            <Typography variant="caption">
              Select at least 1 badge to be granted to the channel’s subscribers
            </Typography>
            <Box
              bgcolor={white}
              borderRadius="1.6rem"
              display="grid"
              padding={3}
              style={{ gap: '20px' }}
            >
              <DebounceSearch
                fullWidth
                placeholder="Search for badge"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
                timeout={0}
                onSearch={handleSearch}
              />
              <Typography variant="h5">Tribe Badges</Typography>
              <div>
                {matchSorter(tribeBadges, searchTerm, {
                  keys: ['name'],
                }).map((badge) => (
                  <Chip
                    key={badge.id}
                    avatar={
                      <Avatar style={{ backgroundColor: 'transparent' }}>
                        <SingleBadge color={badge.color} />
                      </Avatar>
                    }
                    classes={{
                      root: classes.badgeChip,
                      label: classes.badgeLabel,
                    }}
                    data-testid="tribe-badges"
                    label={badge.name}
                  />
                ))}
              </div>
              <Typography variant="h5">Subscription Badges</Typography>
              <div>
                {matchSorter(subscriptionBadges, searchTerm, {
                  keys: ['name'],
                }).map((badge, index) => (
                  <Chip
                    key={index}
                    avatar={
                      <Avatar style={{ backgroundColor: 'transparent' }}>
                        <SubscriptionBadge color={badge.color} />
                      </Avatar>
                    }
                    classes={{
                      root: classes.badgeChip,
                      label: classes.badgeLabel,
                    }}
                    data-testid="tribe-subscription-badges"
                    label={badge.name}
                  />
                ))}
              </div>
              <Button
                color="primary"
                style={{ justifyContent: 'flex-start' }}
                onClick={handleAddNewBadge}
              >
                + New Badge
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Query>
  );
};

export default BadgesStep;
