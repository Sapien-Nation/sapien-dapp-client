/* istanbul ignore file */
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// api
import axios from 'api';

// next
import dynamic from 'next/dynamic';

// constants
import { NavigationTypes } from 'context/tribes';

// context
import { useAuth } from 'context/user';
import { useNavigation } from 'context/tribes';

// icons
import EditIcon from '@material-ui/icons/Edit';

// components
const EditChannel = dynamic<any>(() =>
  import('components/tribe/modals').then((mod) => mod.EditChannel)
);
import Layout from './Layout';

export enum Dialog {
  EditChannel,
}
import AutocompleteSelect from 'components/general/AutocompleteSelect';

// mui
import {
  Box,
  IconButton,
  InputAdornment,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { SearchOutlined as Search } from '@material-ui/icons';

// mocks
import { mockTribe } from 'tools/mocks/tribe';

const useStyles = makeStyles(() => ({
  image: () => ({
    height: '4rem',
    width: '4rem',
    borderRadius: '5px',
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

const IndexPage = () => {
  const { me } = useAuth();
  const [navigation] = useNavigation();
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const { errors } = useForm();
  const handleError = async () => {
    try {
      await axios.post('/api/tribes/error');
    } catch (err) {
      console.log(err);
      //
    }
  };

  const renderView = () => {
    switch (navigation.type) {
      case NavigationTypes.BadgeStore:
        return 'BADGE STORE TODO';
      case NavigationTypes.Channel:
        return (
          <Box>
            CHANNELS FEED TODO{' '}
            <IconButton
              aria-label="Edit Channel"
              onClick={() => setDialog(Dialog.EditChannel)}
            >
              <EditIcon />
            </IconButton>
            {dialog === Dialog.EditChannel && (
              <EditChannel onClose={() => setDialog(null)} />
            )}
          </Box>
        );
      case NavigationTypes.Discovery:
        return 'DISCOVERY TODO';
      case NavigationTypes.Tribe:
        return 'TRIBES FEED';
    }
  };

  return (
    <Layout>
      <div
        style={{
          borderRadius: '24px',
          backgroundColor: '#F9F9FA',
          padding: 40,
        }}
      >
        <h1>{renderView()}</h1>
        {me && <button onClick={handleError}>Try Error</button>}
        <AutocompleteSelect
          OptionComponent={TribeOption}
          apiString="tribes/followed"
          defaultValue={mockTribe()}
          endAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          errors={errors}
          label="Tribe"
          name="select-tribe"
        />
      </div>
    </Layout>
  );
};

export default IndexPage;
