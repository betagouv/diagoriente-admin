import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Fab from '@material-ui/core/Fab';
import PieChart from '@material-ui/icons/PieChart';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';

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

const VisualisationIcon = ({ classes, ...rest }: Props & BaseProps) => (
  <Tooltip title="Visualisation">
    <IconButton className={classes.button} {...rest} aria-label="Delete">
      <PieChart color="primary" />
    </IconButton>
  </Tooltip>
);

export default withStyles(styles)(VisualisationIcon);
