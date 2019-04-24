import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import  SettingIcon from '@material-ui/icons/Settings';

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing.unit,
      padding: 10,
    },
  });

interface Props extends WithStyles<typeof styles> {
  classes: {
    button: string;
  };
}

interface BaseProps {
  [key: string]: any;
}

const Edit = ({ classes, ...rest }: Props & BaseProps) => (
  <Tooltip title="Modifier">
    <IconButton className={classes.button} {...rest} aria-label="Edit">
      <SettingIcon color="primary" />
    </IconButton>
  </Tooltip>
);

export default withStyles(styles)(Edit);
