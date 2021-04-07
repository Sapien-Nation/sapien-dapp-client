import { useState, Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';

// types
import type { Tribe } from 'tools/types/tribe';

// mui
import { Box, Typography, InputAdornment, makeStyles } from '@material-ui/core';

// styles
import { background, darkGrey, offWhite } from 'styles/colors';
import { SearchOutlined as Search } from '@material-ui/icons';

// components
import { AutocompleteSelect, DebounceSearch } from 'components/general';
import { Checkbox } from 'components/form';
import Query from 'components/query';

// assets
import { Globe } from 'components/assets/svg';

const useStyles = makeStyles(() => ({
  image: () => ({
    height: '4rem',
    width: '4rem',
    borderRadius: '5px',
  }),
  optionsWrapper: () => ({
    cursor: 'pointer',
    marginTop: '2rem',
    '&& :hover': {
      background: offWhite,
      borderRadius: '1rem',
    },
  }),
  optionImage: () => ({
    height: '4rem',
    width: '4rem',
    borderRadius: '1rem',
  }),
}));

const TribeOption = ({ option }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="row">
      <img alt={option.name} className={classes.image} src={option.image} />
      <Box display="flex" flexDirection="column" marginLeft="1rem">
        <Typography style={{ fontWeight: 600 }} variant="body1">
          {option.name}
        </Typography>
        <Typography variant="body2">@{option.name}</Typography>
      </Box>
    </Box>
  );
};

const ChannelOption = ({
  channel,
  selectedChannel,
  setSelectedChannel,
  toggleIsDisabled,
}) => {
  const classes = useStyles();
  const { errors } = useFormContext();
  return (
    <Box
      bgcolor={selectedChannel === channel.id ? '#f1edf9' : undefined}
      borderRadius="1rem"
      display="flex"
      flexDirection="row"
      style={{
        cursor: 'pointer',
      }}
      onClick={() => {
        console.log(selectedChannel, channel.id);
        if (selectedChannel === channel.id) {
          console.log('entro?');
          setSelectedChannel(null);
          toggleIsDisabled(true);
          return;
        }
        setSelectedChannel(channel.id);
        toggleIsDisabled(false);
      }}
    >
      <Box
        alignContent="center"
        display="flex"
        justifyContent="space-between"
        padding=".8rem 1.6rem"
        width="100%"
      >
        <Box display="flex">
          <img
            alt={channel.name}
            className={classes.optionImage}
            src={channel.image}
          />
          <Box display="flex" flexDirection="column" marginLeft="1rem">
            <Typography style={{ fontWeight: 600 }} variant="body1">
              {channel.name}
            </Typography>
            <Typography variant="body2">@{channel.name}</Typography>
          </Box>
        </Box>
        <Box display="flex">
          {selectedChannel === channel.id ? (
            <Checkbox checked errors={errors} label="" name="channel" />
          ) : (
            <Box alignItems="center" display="flex">
              <Globe />
              <Typography style={{ marginLeft: '1rem' }}>Public</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

interface Props {
  toggleIsDisabled: Dispatch<SetStateAction<boolean>>;
}

const MigrateChannelContent = ({ toggleIsDisabled }: Props) => {
  const { errors } = useFormContext();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const classes = useStyles();
  return (
    <Box bgcolor={background} borderRadius="1.6rem" padding="3.2rem">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">MIGRATE CONTENT TO</Typography>
        <Box display="flex" marginBottom="3rem">
          <Typography
            style={{ marginRight: '6px', color: darkGrey, fontWeight: 500 }}
          >
            Tribe:
          </Typography>
          <Query apiUrl="/api/tribes/followed" loader={null}>
            {({ tribes }: { tribes: Array<Tribe> }) => (
              <AutocompleteSelect
                OptionComponent={TribeOption}
                defaultValue={tribes[0]}
                endAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
                errors={errors}
                label="Tribe"
                name="select-tribe"
                open={autocompleteOpen}
                options={tribes}
                setOpen={setAutocompleteOpen}
              />
            )}
          </Query>
        </Box>
      </Box>
      <DebounceSearch onSearch={() => console.log('Hola')} />
      <Box className={classes.optionsWrapper}>
        <Query apiUrl="/api/tribes/followed" loader={null}>
          {({ tribes }: { tribes: Array<Tribe> }) =>
            tribes.map((tribe) => (
              <ChannelOption
                key={tribe.id}
                channel={tribe}
                selectedChannel={selectedChannel}
                setSelectedChannel={setSelectedChannel}
                toggleIsDisabled={toggleIsDisabled}
              />
            ))
          }
        </Query>
      </Box>
    </Box>
  );
};

export default MigrateChannelContent;
