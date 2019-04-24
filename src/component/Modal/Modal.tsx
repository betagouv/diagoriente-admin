import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

interface BaseProps extends WithStyles<typeof styles> {
  classes: {
    childContainer: string;
  };
}
const styles = (theme: Theme) =>
  createStyles({
    childContainer: {
      height: '100vh',
      width: '100vw',
      position: 'relative',
    },
  });

interface OwnProps {
  open: boolean;
  handleClose: () => void;
}
type Props = BaseProps & OwnProps;

class SimpleModal extends React.PureComponent<Props> {
  static defaultProps = {
    open: false,
    handleClose: Function,
  };

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <div className={classes.childContainer}>{this.props.children}</div>
      </Modal>
    );
  }
}
SimpleModal.defaultProps = {
  open: false,
  handleClose: Function,
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
