import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ViewAgenda from '@material-ui/icons/ViewAgenda';

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing.unit,
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

const Activities = ({ classes, ...rest }: Props & BaseProps) => (
  <Tooltip title="Activitées">
  <IconButton className={classes.button} {...rest} aria-label="Edit">
    <ViewAgenda color="primary"/>
    </IconButton>
    </Tooltip>
);

export default withStyles(styles)(Activities);
