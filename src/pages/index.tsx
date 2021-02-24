/* istanbul ignore file */
import { FormProvider, useForm } from 'react-hook-form';

// api
import axios from 'api';

// constants
import { NavigationTypes } from 'context/tribes';

// styles
import { background, lightGrey } from 'styles/colors';

// mui
import {
  Button,
  Box,
  FormControl,
  useTheme,
  makeStyles,
  IconButton,
} from '@material-ui/core';

// assets
import { AddIcon } from 'components/assets/svg';

// context
import { useAuth } from 'context/user';
import { useNavigation } from 'context/tribes';

// components
import Layout from './Layout';
import {
  Checkbox,
  TextInput,
  Dropzone,
  Switch,
  PasswordStrengthInput,
} from 'components/form';

const useStyles = makeStyles(() => ({
  dropzone: {
    background: background,
    border: `1px dashed ${lightGrey}`,
    borderRadius: `1.6rem`,
    cursor: 'pointer',
    margin: '1.6rem 0',
  },
  avatar: {
    width: '6.4rem',
    height: '6.4rem',
  },
  cover: {
    width: '100%',
    height: '10rem',
  },
}));

const IndexPage = () => {
  const { me } = useAuth();
  const theme = useTheme();
  const methods1 = useForm();
  const methods2 = useForm({
    defaultValues: { password: '', repeatPassword: '' },
  });
  const classes = useStyles();
  const [navigation] = useNavigation();

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
        return 'CHANNELS FEED TODO';
      case NavigationTypes.Discovery:
        return 'DISCOVERY TODO';
      case NavigationTypes.Tribe:
        return 'TRIBES FEED';
    }
  };

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    errors: errors1,
  } = methods1;
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    getValues,
    errors: errors2,
  } = methods2;

  const onSubmit = (data) => {
    console.log(data);
  };
  const onSubmit2 = (data) => {
    console.log('second form');
    console.log(data);
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
      </div>
      <FormProvider {...methods2}>
        <form onSubmit={handleSubmit2(onSubmit2)}>
          <FormControl fullWidth>
            <PasswordStrengthInput
              fullWidth
              autoComplete="new-password"
              errors={errors2}
              inputProps={{
                autoComplete: 'new-password',
              }}
              label="Password"
              name="password"
              tooltipText="This is a tooltip text example"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextInput
              fullWidth
              errors={errors2}
              inputProps={{
                autoComplete: 'new-password',
              }}
              inputRef={register2({
                required: 'Password is required',
                validate: (value) =>
                  value === getValues('password') || 'Password not match',
              })}
              label="Repeat Password"
              name="repeatPassword"
              type="password"
            />
          </FormControl>
          <Box marginTop={5}>
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </FormProvider>
      <FormProvider {...methods1}>
        <form onSubmit={handleSubmit1(onSubmit)}>
          <FormControl fullWidth>
            <TextInput
              fullWidth
              chartCount="36"
              errors={errors1}
              inputProps={{
                autoComplete: 'text',
              }}
              inputRef={register1({
                required: 'Text is required',
              })}
              label="Some Label"
              name="text"
            />
          </FormControl>
          <FormControl fullWidth>
            <Dropzone
              accept="image/*"
              className={`${classes.dropzone} ${classes.cover}`}
              errors={errors1}
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
              rules={{ required: 'Upload at least one image' }}
            />
          </FormControl>
          <FormControl>
            <Switch
              errors={errors1}
              inputRef={register1({
                validate: (value) => value || 'Should be switched LOL',
              })}
              label="Public Tribe"
              name="public"
            />
          </FormControl>
          <FormControl>
            <Checkbox
              errors={errors1}
              inputRef={register1({
                validate: (value) => value || 'Please check',
              })}
              label="Remember me"
              name="remember"
            />
          </FormControl>
          <Box marginTop={5}>
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default IndexPage;
