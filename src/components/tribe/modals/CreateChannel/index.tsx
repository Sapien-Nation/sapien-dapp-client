import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// types
import type { Theme } from '@material-ui/core/styles';

// mui
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// styles
import { background, darkGrey, lightGrey, purple, white } from 'styles/colors';

// assets
import {
  MultipleBadges,
  Search,
  SingleBadge,
  SubscriptionBadge
} from '../../assets/svg';

import { AddIcon, RssIcon } from 'components/assets/svg';

//components
import ChartCount from 'components/general/form';
import Dialog from 'components/dialog';
import DropZone from 'components/dropzone';

// mocks
import { mockTribeBadges, mockSubscriptionBadges } from 'mocks/badges';

const defaultValues = {
  name: '',
  type: false,
  cover: '',
  avatar: '',
  description: '',
  unique_identifier: ''
};

enum Step {
  ChannelSummary = 1,
  ChannelBadges,
  ChannelMedia,
  ChannelRss
}

const useStyles = makeStyles((theme: Theme) => ({
  dropzone: () => ({
    background: background,
    border: `1px dashed ${lightGrey}`,
    borderRadius: `1.6rem`,
    cursor: 'pointer',
    margin: '1.6rem 0'
  }),
  avatar: {
    width: '6.4rem',
    height: '6.4rem'
  },
  cover: {
    width: '100%',
    height: '10rem'
  },
  badgeHeader: {
    marginRight: '1rem'
  },
  search: {
    borderRadius: '9rem'
  },
  searchFocus: {
    borderRadius: '9rem !important'
  },
  badgeChip: {
    backgroundColor: '#f5f5f5',
    marginTop: '.5rem',
    marginRight: '.5rem'
  },
  badgeLabel: {
    padding: '0 .8rem'
  },
  addRssButton: {
    padding: `${theme.spacing(0.6)}`,
    marginLeft: `${theme.spacing(1)}`,
    backgroundColor: `${darkGrey}15`
  }
}));

const tribeBadges = mockTribeBadges();
const subscriptionBadges = mockSubscriptionBadges();

interface Props {
  onClose: () => void;
}

const CreateChannelModal: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(Step.ChannelSummary);
  const theme = useTheme();
  const methods = useForm({
    defaultValues,
    shouldUnregister: false
  });

  const { handleSubmit, register, control } = methods;

  const classes = useStyles();

  const handleFormSubmit = () => {
    switch (step) {
      case Step.ChannelSummary: {
        setStep(Step.ChannelBadges);
        break;
      }
      case Step.ChannelBadges: {
        setStep(Step.ChannelMedia);
        break;
      }
      case Step.ChannelMedia: {
        setStep(Step.ChannelRss);
        break;
      }
      default:
        onClose();
        break;
    }
  };

  const handleBack = () => {
    switch (step) {
      case Step.ChannelSummary: {
        onClose();
        break;
      }
      case Step.ChannelBadges: {
        setStep(Step.ChannelSummary);
        break;
      }
      case Step.ChannelMedia: {
        setStep(Step.ChannelBadges);
        break;
      }
      case Step.ChannelRss: {
        setStep(Step.ChannelMedia);
        break;
      }
    }
  };

  const form = 'create-channel';

  const renderForm = () => {
    switch (step) {
      case Step.ChannelSummary: {
        return (
          <>
            <FormControl fullWidth required>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={1}
              >
                <InputLabel htmlFor="name">Name</InputLabel>
                <ChartCount field="name" maxCount="36" />
              </Box>
              <Input
                fullWidth
                id="name"
                inputRef={register({ required: true, maxLength: 36 })}
                name="name"
                placeholder="Name"
              />
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: theme.spacing(0.5) }}>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={1.6}
              >
                <InputLabel htmlFor="description">Description</InputLabel>
                <ChartCount field="description" maxCount="60" />
              </Box>
              <Input
                fullWidth
                multiline
                id="description"
                inputRef={register({ required: true, maxLength: 60 })}
                name="description"
                placeholder="Set brief description"
                rows={3}
                rowsMax={5}
              />
            </FormControl>
          </>
        );
      }
      case Step.ChannelBadges: {
        return (
          <>
            <Box
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
                        label: classes.badgeLabel
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
                        label: classes.badgeLabel
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
                      marginTop: '2rem'
                    }}
                  >
                    + New Badge
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        );
      }
      case Step.ChannelMedia: {
        return (
          <>
            <FormControl fullWidth>
              <InputLabel htmlFor="description">Avatar</InputLabel>
              <DropZone
                accept="image/*"
                className={`${classes.dropzone} ${classes.avatar}`}
                maxFiles={1}
                maxSize={20971520}
                name="avatar"
                render={() => {
                  return (
                    <IconButton
                      aria-label="channel type"
                      style={{ color: theme.palette.infoIcon.main }}
                    >
                      <AddIcon />
                    </IconButton>
                  );
                }}
              />
              <Typography variant="caption">
                Drag and Drop or{' '}
                <Typography color="primary" variant="caption">
                  Browse{' '}
                </Typography>
                to upload image (max 20MB)
              </Typography>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="description">Cover image</InputLabel>
              <DropZone
                accept="image/*"
                className={`${classes.dropzone} ${classes.cover}`}
                maxFiles={1}
                maxSize={41943040}
                name="cover"
                render={() => {
                  return (
                    <IconButton
                      aria-label="channel type"
                      style={{ color: theme.palette.infoIcon.main }}
                    >
                      <AddIcon />
                    </IconButton>
                  );
                }}
              />
              <Typography variant="caption">
                Drag and Drop or{' '}
                <Typography color="primary" variant="caption">
                  Browse{' '}
                </Typography>
                to upload image (max 40MB)
              </Typography>
            </FormControl>
          </>
        );
      }
      case Step.ChannelRss: {
        return (
          <>
            <FormControl fullWidth>
              <InputLabel htmlFor="label">Label</InputLabel>
              <Input
                fullWidth
                id="label"
                inputRef={register({ required: false, maxLength: 36 })}
                name="label"
                placeholder="https://"
              />
              <Typography
                style={{ marginTop: theme.spacing(1.5) }}
                variant="caption"
              >
                Enter a URL or{' '}
                <Typography color="primary" variant="caption">
                  Browse{' '}
                </Typography>
                to import RSS feeds (max 150MB)
              </Typography>
              <Box width="100%">
                <Button
                  style={{
                    color: purple,
                    marginTop: theme.spacing(2)
                  }}
                >
                  + Add More
                </Button>
              </Box>
            </FormControl>
            <Typography style={{ marginBottom: '2.2rem' }} variant="h5">
              Popular Feeds
            </Typography>
            <Box
              alignItems="center"
              bgcolor={background}
              borderRadius="1rem"
              display="flex"
              justifyContent="space-between"
              padding="1.3rem 1.6rem"
              width="100%"
            >
              <Box alignItems="center" display="flex">
                <RssIcon />
                <Typography style={{ marginLeft: '1rem ', fontWeight: 600 }}>
                  Foodies Feed
                </Typography>
              </Box>
              <IconButton
                aria-label="add rss"
                classes={{
                  root: classes.addRssButton
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </>
        );
      }
    }
  };

  return (
    <Dialog
      open
      cancelLabel={step == Step.ChannelSummary ? 'Cancel' : 'Back'}
      confirmLabel={step == Step.ChannelRss ? 'Create' : 'Next'}
      form={form}
      maxWidth="sm"
      title={
        <>
          <Typography variant="h2">New Channel</Typography>
          <Typography variant="caption">
            <Typography
              color="primary"
              style={{
                fontWeight: 600
              }}
              variant="caption"
            >
              Step {step}
            </Typography>{' '}
            / 4
          </Typography>
        </>
      }
      onCancel={handleBack}
      onClose={onClose}
    >
      <FormProvider {...methods}>
        <form id={form} onSubmit={handleSubmit(handleFormSubmit)}>
          {renderForm()}
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default CreateChannelModal;
