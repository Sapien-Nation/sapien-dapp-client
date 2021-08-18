// mui
import { Box, Tooltip, Typography } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';

interface Props {
  children: any;
  open: boolean;
}

const ComingSoon = ({ children, open }: Props) => (
  <Tooltip
    PopperProps={{
      disablePortal: true,
    }}
    arrow
    color="primary"
    disableFocusListener
    disableHoverListener
    disableTouchListener
    placement="right"
    open={open}
    title={
      <Box display="flex" flexDirection="row" alignItems="center">
        <InfoIcon
          color="primary"
          fontSize="small"
          style={{ marginLeft: '0.5rem' }}
        />
        <Typography
          variant="subtitle1"
          style={{ marginLeft: 5 }}
        >
          *Coming soon
        </Typography>
      </Box>
    }
  >
    {children}
  </Tooltip>
);

export default ComingSoon;
