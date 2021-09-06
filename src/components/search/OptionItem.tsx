// mui
import { Avatar, Box, Typography } from '@material-ui/core';

interface Props {
  option: {
    avatar: string;
    id: string;
    identifier?: string;
    membersCount?: number;
    name: string;
    subscribersCount?: number;
    type: string;
  };
}

const OptionItem = ({ option }: Props) => {
  const { avatar, identifier, membersCount, name, subscribersCount, type } =
    option;
  return (
    <Box alignItems="center" display="flex" paddingY={0.5} width="100%">
      <Avatar src={avatar} variant={type === 'user' ? 'circular' : 'rounded'} />
      <Box display="flex" flexDirection="column">
        <Box alignItems="center" display="flex">
          <Typography
            component="span"
            style={{ marginLeft: '1rem' }}
            variant="button"
          >
            {name}
          </Typography>
          {identifier && (
            <Typography
              color="textSecondary"
              component="span"
              style={{ marginLeft: 5 }}
              variant="button"
            >
              @{identifier}
            </Typography>
          )}
        </Box>
        <Box>
          {membersCount && (
            <Typography
              color="textSecondary"
              component="div"
              display="block"
              style={{ marginLeft: '1rem' }}
              variant="overline"
            >
              {membersCount} members
            </Typography>
          )}
          {subscribersCount && (
            <Typography
              color="textSecondary"
              component="div"
              display="block"
              style={{ marginLeft: '1rem' }}
              variant="overline"
            >
              {subscribersCount} suscribers
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OptionItem;
