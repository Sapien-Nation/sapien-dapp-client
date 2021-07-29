// components
import SearchInput from '../shared/SearchInput';

// mui
import { Avatar, Box, Typography } from '@material-ui/core';

export const ReceiverItem = ({ name, spn }) => (
  <Box
    alignItems="center"
    borderRadius={10}
    display="flex"
    marginTop={1}
    padding={1.8}
    style={{
      cursor: 'pointer',
    }}
  >
    <Avatar
      alt=""
      imgProps={{
        style: {
          borderRadius: 40,
        },
      }}
      src="/fixtures/normal/slowpoke.jpg"
      style={{
        width: 40,
        height: 40,
      }}
    />
    <Box display="flex" marginLeft={1}>
      <Typography variant="button">{name}</Typography>
    </Box>
    <Box alignItems="center" display="flex">
      <Typography style={{ marginLeft: 6 }} variant="button">
        {spn}
      </Typography>
    </Box>
  </Box>
);

const Receivers = () => {
  return (
    <div
      style={{
        padding: '0 2.4rem',
      }}
    >
      <SearchInput ItemComponent={ReceiverItem} />
    </div>
  );
};

export default Receivers;
