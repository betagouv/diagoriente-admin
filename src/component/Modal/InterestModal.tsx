import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './scss/interset.scss';
const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,

  },
}))(MuiDialogContent);

interface OwnProps {
  open: boolean;
  ajouter: string;
  handleAjouter: () => void;
  handleClose: () => void;
  handleClickOpen: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing.unit,
      top: theme.spacing.unit,
      color: theme.palette.grey[500],
    },
  });

interface BaseProps extends WithStyles<typeof styles> {
  classes: {
    closeButton: string;
  };
}

type Props = OwnProps;

class InterestModal extends React.PureComponent<Props> {
  static defaultProps = {
    open: false,
    handleClose: Function,
    ajouter: 'Ajouter',
    handleAjouter: Function,
    handleClickOpen: Function,
  };

  public render(): JSX.Element {
    return (
      <div>
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
          maxWidth="lg"
        >
          <DialogContent>
            <div className="Interest-modal-component-header">
              <div className="Interest-modal-title">{this.props.ajouter}</div>
              <div className="Interest-modal-div ">
                <IconButton aria-label="Close" onClick={this.props.handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
          </DialogContent>
          <DialogContent >
            {this.props.children}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
InterestModal.defaultProps = {
  open: false,
  ajouter: 'Ajouter',
  handleClose: Function,
  handleAjouter: Function,
  handleClickOpen: Function,
};

export default InterestModal;
