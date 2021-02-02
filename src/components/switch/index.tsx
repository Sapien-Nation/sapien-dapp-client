// mui
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';

// styles
import { green, darker } from 'styles/colors';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const StyledSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 38,
      height: 20,
      padding: 0
    },
    switchBase: {
      padding: 2,
      '&$checked': {
        transform: 'translateX(18px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: green,
          opacity: 1,
          border: 'none'
        }
      }
    },
    thumb: {
      width: 15,
      height: 15
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.input.main}`,
      backgroundColor: darker,
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border'])
    },
    checked: {},
    focusVisible: {}
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  );
});

export default StyledSwitch;
