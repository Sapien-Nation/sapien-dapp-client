import { useState } from 'react';
import { matchSorter } from 'match-sorter';

// types
import type { Channel } from 'tools/types/channel';
import type { Tribe } from 'tools/types/tribe';

// mui
import { Box, Typography, InputAdornment, makeStyles } from '@material-ui/core';
import { SearchOutlined as Search } from '@material-ui/icons';

// styles
import { offWhite } from 'styles/colors';

// assets
import { Globe } from 'components/assets/svg';

// components
import { AutocompleteSelect, DebounceSearch } from 'components/general';
import { Checkbox } from 'components/form';
import Query from 'components/query';

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

const ChannelOption = ({
  channel,
  selectedChannel,
  setSelectedChannel,
}: {
  channel: Channel;
  selectedChannel: Channel;
  setSelectedChannel: (channel: Channel | null) => void;
}) => {
  const classes = useStyles();
  return (
    <Box
      bgcolor={selectedChannel?.id === channel.id ? '#f1edf9' : undefined}
      borderRadius="1rem"
      display="flex"
      flexDirection="row"
      style={{
        cursor: 'pointer',
      }}
      onClick={() =>
        setSelectedChannel(selectedChannel?.id === channel.id ? null : channel)
      }
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
          <Box display="flex" flexDirection="column" marginLeft={1}>
            <Typography variant="body1">{channel.name}</Typography>
            <Typography variant="body2">@{channel.name}</Typography>
          </Box>
        </Box>
        <Box display="flex">
          {selectedChannel?.id === channel.id ? (
            <Checkbox checked label="" name="channel" />
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

const TribeOption = ({ option }: { option: Tribe }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="row">
      <img alt={option.name} className={classes.image} src={option.image} />
      <Box display="flex" flexDirection="column" marginLeft={1}>
        <Typography style={{ fontWeight: 600 }} variant="body1">
          {option.name}
        </Typography>
        <Typography variant="body2">@{option.name}</Typography>
      </Box>
    </Box>
  );
};
interface Props {
  selectedChannel: Channel;
  setSelectedChannel: (channel: Channel | null) => void;
  tribes: Array<Tribe>;
}

const MigrateContent = ({
  tribes,
  selectedChannel,
  setSelectedChannel,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTribe, setSelectedTribe] = useState(tribes[0]);
  const [isTribeAutocompleteOpen, setIsTribeAutocompleteOpen] = useState(false);

  return (
    <Box className="card--rounded" padding={3.2}>
      <Box display="flex" justifyContent="space-between" marginBottom={3}>
        <Typography variant="h5">Migrate Content To</Typography>
        <div>
          <Typography variant="h5">Tribe:</Typography>
          <AutocompleteSelect
            OptionComponent={TribeOption}
            defaultValue={selectedTribe}
            endAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
            label="Tribe"
            name="select-tribe"
            open={isTribeAutocompleteOpen}
            options={tribes}
            setOpen={setIsTribeAutocompleteOpen}
            // @ts-ignore
            onChange={(tribe: Tribe) => {
              // TODO API for AutocompleteSelect should be improved
              setSelectedTribe(tribe);
              setIsTribeAutocompleteOpen(false);
            }}
          />
        </div>
      </Box>
      <Query apiUrl={`/api/channels/search/${selectedTribe.id}`} loader={null}>
        {({ channels }: { channels: Array<Channel> }) => (
          <>
            <DebounceSearch timeout={0} onSearch={setSearchTerm} />
            {matchSorter(channels, searchTerm, {
              keys: ['name'],
            }).map((channel) => (
              <ChannelOption
                key={channel.id}
                channel={channel}
                selectedChannel={selectedChannel}
                setSelectedChannel={setSelectedChannel}
              />
            ))}
          </>
        )}
      </Query>
    </Box>
  );
};

export default MigrateContent;
