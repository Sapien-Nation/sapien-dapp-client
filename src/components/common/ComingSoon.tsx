// mui
import { Box, Tooltip, Typography } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';

interface Props {
  children: any;
  open: boolean;
}

const ComingSoon = ({ children, open }: Props) => (
  <Tooltip
    arrow
    disableFocusListener
    disableHoverListener
    disableTouchListener
    PopperProps={{
      disablePortal: true,
    }}
    color="primary"
    open={open}
    placement="right"
    title={
      <Box alignItems="center" display="flex" flexDirection="row">
        <InfoIcon
          color="primary"
          fontSize="small"
          style={{ marginLeft: '0.5rem' }}
        />
        <Typography style={{ marginLeft: 5 }} variant="subtitle1">
          *Coming soon
        </Typography>
      </Box>
    }
  >
    {children}
  </Tooltip>
);

export default ComingSoon;
