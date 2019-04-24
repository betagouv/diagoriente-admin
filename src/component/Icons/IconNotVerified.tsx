import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Fab from '@material-ui/core/Fab';
import Clear from '@material-ui/icons/Clear';
const styles = (theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing.unit,
      color: '#ff0000',
      
    },
  });
interface Props extends WithStyles<typeof styles> {
  classes: {
    fab: string;
  };
}
interface BaseProps {
  [key: string]: any;
  color: any;
}
const IconNotverified = ({ classes, ...rest }: Props & BaseProps) => (
    <Clear className={classes.fab} {...rest} />
);
export default withStyles(styles)(IconNotverified);
