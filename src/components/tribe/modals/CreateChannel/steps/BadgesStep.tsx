// assets
// import {
//   MultipleBadges,
//   Search,
//   SingleBadge,
//   SubscriptionBadge,
// } from 'components/tribe/assets/svg';

// mocks
// import { mockTribeBadges, mockSubscriptionBadges } from 'mocks/badges';

// mui
// import {
//   Avatar,
//   Box,
//   Button,
//   Chip,
//   FormControl,
//   Input,
//   InputAdornment,
//   makeStyles,
//   Typography,
//   useTheme,
// } from '@material-ui/core';

// styles
// import { background, purple, white } from 'styles/colors';

// const tribeBadges = mockTribeBadges();
// const subscriptionBadges = mockSubscriptionBadges();

// const useStyles = makeStyles(() => ({
//   badgeHeader: {
//     marginRight: '1rem',
//   },
//   search: {
//     borderRadius: '9rem',
//   },
//   searchFocus: {
//     borderRadius: '9rem !important',
//   },
//   badgeChip: {
//     backgroundColor: '#f5f5f5',
//     marginTop: '.5rem',
//     marginRight: '.5rem',
//   },
//   badgeLabel: {
//     padding: '0 .8rem',
//   },
// }));

const BadgesStep = () => {
  // const theme = useTheme();
  // const classes = useStyles();

  return (
    <>
      <h1>TODO</h1>
      {/* <Box
        bgcolor={background}
        borderRadius="1.6rem"
        display="flex"
        justifyContent="space-between"
        marginBottom="1.5rem"
        padding="3.1rem"
      >
        <Box alignItems="center" display="flex">
          <Typography classes={{ root: classes.badgeHeader }} variant="h5">
            Viewers
          </Typography>
          <MultipleBadges />
        </Box>
        <Typography color="primary" style={{ fontWeight: 600 }}>
          Change badge
        </Typography>
      </Box>
      <Box
        bgcolor={background}
        borderRadius="1.6rem"
        display="flex"
        justifyContent="space-between"
        marginBottom="1.5rem"
        padding="3rem"
      >
        <Box alignItems="center" display="flex">
          <Typography classes={{ root: classes.badgeHeader }} variant="h5">
            Contributors
          </Typography>
          <SingleBadge color="#6200EA" />
        </Box>
        <Typography color="primary" style={{ fontWeight: 600 }}>
          Change badge
        </Typography>
      </Box>
      <Box
        bgcolor={background}
        borderRadius="1.6rem"
        display="flex"
        flexDirection="column"
        padding="3rem"
      >
        <Box alignItems="center" display="flex" marginBottom="1.5rem">
          <Typography classes={{ root: classes.badgeHeader }} variant="h5">
            Subscription
          </Typography>
          <SubscriptionBadge />
        </Box>
        <Typography style={{ marginRight: '2rem' }} variant="caption">
          Select at least 1 badge to be granted to the channel’s subscribers
        </Typography>
        <Box
          bgcolor={white}
          borderRadius="1.6rem"
          display="flex"
          flexWrap="wrap"
          marginTop="3rem"
          padding="3rem"
        >
          <FormControl fullWidth style={{ marginBottom: theme.spacing(3) }}>
            <Input
              fullWidth
              classes={{ root: classes.search, focused: classes.searchFocus }}
              id="search"
              name="search"
              placeholder="Search for badge"
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <Typography classes={{ root: classes.badgeHeader }} variant="h5">
            Tribe Badges
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            marginBottom="3.5rem"
            marginTop="2rem"
          >
            {tribeBadges.map((badge) => (
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
                label={badge.name}
              />
            ))}
          </Box>
          <Typography classes={{ root: classes.badgeHeader }} variant="h5">
            Subscription Badges
          </Typography>
          <Box display="flex" flexWrap="wrap" marginTop="2rem">
            {subscriptionBadges.map((badge, index) => (
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
                label={badge.name}
              />
            ))}
          </Box>
          <Box width="100%">
            <Button
              style={{
                marginRight: theme.spacing(2),
                color: purple,
                marginTop: '2rem',
              }}
            >
              + New Badge
            </Button>
          </Box>
        </Box>
      </Box> */}
    </>
  );
};

export default BadgesStep;
