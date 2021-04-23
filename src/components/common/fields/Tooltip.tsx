// mui
import { Tooltip as MUITooltip, withStyles } from '@material-ui/core';

// styles
import { darkGrey, white } from 'styles/colors';

const Tooltip = withStyles(() => ({
  tooltip: {
    padding: '1rem',
    color: darkGrey,
    backgroundColor: white,
    maxWidth: 320,
    boxShadow: '-20px 0px 40px rgba(51, 51, 51, 0.1)',
  },
}))(MUITooltip);

export default Tooltip;
