import React from 'react';
import Input from '@material-ui/core/Input/Input';
import { ICompetence, Theme, Activity } from 'requests';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Dialog from '@material-ui/core/Dialog/';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

interface Props {
  competences: ICompetence[];
  submitText: string;
  onSubmitHandler: (params: SubmitParamsTootltip) => void;
  theme: Theme;
  classes: any;
}

export interface SubmitParamsTootltip {
  title?: string;
  description?: string;
  type?: string;
  verified?: boolean;
  activities?: Activity[];
  parentId?: string;
  required?: { _id: string; title: string }[];
  tooltips: { _id?: string; competenceId?: string; tooltip: string }[];
}

interface State {
  comp1: { _id?: string; competenceId?: string; tooltip: string };
  comp2: { _id?: string; competenceId?: string; tooltip: string };
  comp3: { _id?: string; competenceId?: string; tooltip: string };
  comp4: { _id?: string; competenceId?: string; tooltip: string };
  comp5: { _id?: string; competenceId?: string; tooltip: string };
  comp6: { _id?: string; competenceId?: string; tooltip: string };
  comp7: { _id?: string; competenceId?: string; tooltip: string };
  comp8: { _id?: string; competenceId?: string; tooltip: string };
  comp9: { _id?: string; competenceId?: string; tooltip: string };
  comp10: { _id?: string; competenceId?: string; tooltip: string };
  open: boolean;
}

class TooltipForm extends React.Component<Props, State> {
  state = {
    comp1: (this.props.theme.tooltips && this.props.theme.tooltips[0]) || {
      competenceId:
        this.props.theme.tooltips && this.props.theme.tooltips[0].competenceId,
      tooltip: '',
      _id: this.props.theme.tooltips && this.props.theme.tooltips[0]._id,
    },
    comp2: (this.props.theme.tooltips && this.props.theme.tooltips[1]) || {
      competenceId:
        this.props.theme.tooltips && this.props.theme.tooltips[1].competenceId,
      tooltip: '',
      _id: this.props.theme.tooltips && this.props.theme.tooltips[1]._id,
    },
    comp3: (this.props.theme.tooltips && this.props.theme.tooltips[2]) || {
      competenceId:
        this.props.theme.tooltips && this.props.theme.tooltips[2].competenceId,
      tooltip: '',
      _id: this.props.theme.tooltips && this.props.theme.tooltips[2]._id,
    },
    comp4: (this.props.theme.tooltips && this.props.theme.tooltips[3]) || {
      competenceId:
        this.props.theme.tooltips && this.props.theme.tooltips[3].competenceId,
      tooltip: '',
      _id: this.props.theme.tooltips && this.props.theme.tooltips[3]._id,
    },
    comp5: (this.props.theme.tooltips && this.props.theme.tooltips[4]) || {
      competenceId:
        this.props.theme.tooltips && this.props.theme.tooltips[4].competenceId,
      tooltip: '',
      _id: this.props.theme.tooltips && this.props.theme.tooltips[4]._id,
    },
    comp6: (this.props.theme.tooltips && this.props.theme.tooltips[5]) || {
      competenceId:
        this.props.theme.tooltips && this.props.theme.tooltips[5].competenceId,
      tooltip: '',
      _id: this.props.theme.tooltips && this.props.theme.tooltips[5]._id,
    },
    comp7: (this.props.theme.tooltips && this.props.theme.tooltips[6]) || {
      competenceId:
        this.props.theme.tooltips && this.props.theme.tooltips[6].competenceId,
      tooltip: '',
      _id: this.props.theme.tooltips && this.props.theme.tooltips[6]._id,
    },
    comp8: (this.props.theme.tooltips && this.props.theme.tooltips[7]) || {
      competenceId:
        this.props.theme.tooltips && this.props.theme.tooltips[7].competenceId,
      tooltip: '',
      _id: this.props.theme.tooltips && this.props.theme.tooltips[7]._id,
    },
    comp9: (this.props.theme.tooltips && this.props.theme.tooltips[8]) || {
      competenceId:
        this.props.theme.tooltips && this.props.theme.tooltips[8].competenceId,
      tooltip: '',
      _id: this.props.theme.tooltips && this.props.theme.tooltips[8]._id,
    },
    comp10: (this.props.theme.tooltips && this.props.theme.tooltips[9]) || {
      competenceId:
        this.props.theme.tooltips && this.props.theme.tooltips[9].competenceId,
      tooltip: '',
      _id: this.props.theme.tooltips && this.props.theme.tooltips[9]._id,
    },
    open: false,
  };
  handleChange1 = (e: any) => {
    this.setState({ comp1: { ...this.state.comp1, tooltip: e.target.value } });
  }
  handleChange2 = (e: any) => {
    this.setState({ comp2: { ...this.state.comp2, tooltip: e.target.value } });
  }
  handleChange3 = (e: any) => {
    this.setState({ comp3: { ...this.state.comp3, tooltip: e.target.value } });
  }
  handleChange4 = (e: any) => {
    this.setState({ comp4: { ...this.state.comp4, tooltip: e.target.value } });
  }
  handleChange5 = (e: any) => {
    this.setState({ comp5: { ...this.state.comp5, tooltip: e.target.value } });
  }
  handleChange6 = (e: any) => {
    this.setState({ comp6: { ...this.state.comp6, tooltip: e.target.value } });
  }
  handleChange7 = (e: any) => {
    this.setState({ comp7: { ...this.state.comp7, tooltip: e.target.value } });
  }
  handleChange8 = (e: any) => {
    this.setState({ comp8: { ...this.state.comp8, tooltip: e.target.value } });
  }
  handleChange9 = (e: any) => {
    this.setState({ comp9: { ...this.state.comp9, tooltip: e.target.value } });
  }
  handleChange10 = (e: any) => {
    this.setState({
      comp10: { ...this.state.comp10, tooltip: e.target.value },
    });
  }
  onSubmitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      this.state.comp1.tooltip !== '' &&
      this.state.comp2.tooltip !== '' &&
      this.state.comp3.tooltip !== '' &&
      this.state.comp4.tooltip !== '' &&
      this.state.comp5.tooltip !== '' &&
      this.state.comp6.tooltip !== '' &&
      this.state.comp7.tooltip !== '' &&
      this.state.comp8.tooltip !== '' &&
      this.state.comp9.tooltip !== '' &&
      this.state.comp10.tooltip !== ''
    ) {
      this.props.onSubmitHandler({
        tooltips: [
          this.state.comp1,
          this.state.comp2,
          this.state.comp3,
          this.state.comp4,
          this.state.comp5,
          this.state.comp6,
          this.state.comp7,
          this.state.comp8,
          this.state.comp9,
          this.state.comp10,
        ],
      });
    } else {
      this.setState({ open: true });
    }
  }
  handleClose = () => {
    this.setState({ open: false });
  }

  findCompetence = (index: number) => {

    const title = this.props.competences.filter(
      (el: any) => el._id === this.props.theme.tooltips[index].competenceId,
    );
    return (title[0].title);
  }

  render() {
    const { competences } = this.props;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="alert-dialog-title">{'Avertissement'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              vous devez remplir tous les champs des tooltips
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              D'accord
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="">
            {this.findCompetence(0)}
          </label>
          <Input
            className={classes.input}
            value={this.state.comp1.tooltip}
            onChange={this.handleChange1}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="">
            {this.findCompetence(1)}
          </label>
          <Input
            className={classes.input}
            value={this.state.comp2.tooltip}
            onChange={this.handleChange2}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="">
            {this.findCompetence(2)}
          </label>
          <Input
            className={classes.input}
            value={this.state.comp3.tooltip}
            onChange={this.handleChange3}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="">
            {this.findCompetence(3)}
          </label>
          <Input
            className={classes.input}
            value={this.state.comp4.tooltip}
            onChange={this.handleChange4}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="">
            {this.findCompetence(4)}
          </label>
          <Input
            className={classes.input}
            value={this.state.comp5.tooltip}
            onChange={this.handleChange5}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="">
            {this.findCompetence(5)}
          </label>
          <Input
            className={classes.input}
            value={this.state.comp6.tooltip}
            onChange={this.handleChange6}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="">
            {this.findCompetence(6)}
          </label>
          <Input
            className={classes.input}
            value={this.state.comp7.tooltip}
            onChange={this.handleChange7}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="">
            {this.findCompetence(7)}
          </label>
          <Input
            className={classes.input}
            value={this.state.comp8.tooltip}
            onChange={this.handleChange8}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="">
            {this.findCompetence(8)}
          </label>
          <Input
            className={classes.input}
            value={this.state.comp9.tooltip}
            onChange={this.handleChange9}
          />
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.label} htmlFor="">
            {this.findCompetence(9)}
          </label>
          <Input
            className={classes.input}
            value={this.state.comp10.tooltip}
            onChange={this.handleChange10}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={this.onSubmitHandler}
        >
          {this.props.submitText}
        </Button>
      </div>
    );
  }
}
const styles = () =>
  createStyles({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    inputWrapper: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '80%',
    },
    input: {
      width: '80%',
    },
    label: {
      width: 350,
    },
  });

export default withStyles(styles)(TooltipForm);
