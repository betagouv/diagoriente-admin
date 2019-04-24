import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';

const styles = (theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing.unit,
    },
  });

interface Props extends WithStyles<typeof styles> {
  classes: {
    fab: string;
  };
}
interface BaseProps {
  className?: string;
  [key: string]: any;
}

const Edit = ({ classes, className, ...rest }: Props & BaseProps) => (
  <Fab
    aria-label="Edit"
    size="small"
    className={`${classes.fab}${className ? ` ${className}` : ''}`}
    {...rest}
  >
    <ClearIcon />
  </Fab>
);

export default withStyles(styles)(Edit);
