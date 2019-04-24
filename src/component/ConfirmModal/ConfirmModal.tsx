import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { CSSProperties, WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const Transition = (props: any) => {
  return <Slide direction="down" {...props} />;
};
interface BaseProps {
  YesButton: (e: any) => void;
  NoButton: () => void;
  open: boolean;
  close: () => void;
}
interface StyleProps {
  classes?: {
    button: string;
    input: string;
    dialogBody: string;
  };
}
const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});
type Props = BaseProps & StyleProps;

class ConfirmModal extends React.Component<Props> {
  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render(): JSX.Element {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.close}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <Typography
            variant="h4"
            style={{ marginTop: 85, marginBottom: 85, textAlign: 'center' }}
          >
            Confirmation
          </Typography>
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <DialogContentText
                  id="alert-dialog-slide-description"
                  style={{
                    textAlign: 'center',
                    fontSize: 25,
                    marginBottom: 65,
                    marginLeft: 60,
                    marginRight: 60,
                  }}
                >
                  Confirmez-vous la suppression definitive de cet element
                </DialogContentText>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={this.props.YesButton}
                  color="primary"
                  fullWidth
                >
                  Confirmer
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  onClick={this.props.NoButton}
                  color="primary"
                  fullWidth
                >
                  Annuler
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmModal;
