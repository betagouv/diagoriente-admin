import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Fab from '@material-ui/core/Fab';
import Done from '@material-ui/icons/Done';
const styles = (theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing.unit,
      color: '#008000',
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
const Iconverified = ({ classes, ...rest }: Props & BaseProps) => (
  <Done className={classes.fab} {...rest} />
);
export default withStyles(styles)(Iconverified);
