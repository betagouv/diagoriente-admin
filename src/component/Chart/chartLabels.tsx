import React from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

const styles = () =>
  createStyles({
    avatar: {
      color: 'black',
      marginRight: 0,

    },
    chartLAbelChip: {
      display: 'flex',
      flexDirection: 'row-reverse',
      marginLeft: 4,
      marginRight: 4,
      marginTop: 4,
      marginBottom: 4,
    },
  });

interface StyleProps {
  classes: {
    avatar: string;
    chartLAbelChip: string;
  };
}
interface BaseProps {
  label?: any;
  number?: any;
  backgroundColor: string;
}
type Props = StyleProps & BaseProps;

class Chartlabels extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Chip
        avatar={<Avatar 
          className={this.props.classes.avatar}
          style={{ backgroundColor: `${this.props.backgroundColor}` }}>{this.props.number}</Avatar>}
        label={this.props.label}
        className={this.props.classes.chartLAbelChip}
        variant="outlined"
      />
    );
  }
}
export default withStyles(styles)(Chartlabels);
