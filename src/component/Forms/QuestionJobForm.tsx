import React, { MouseEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isEqual } from 'lodash';
import Input from '../inputs/input';
import { EditComptenceParams } from 'requests';
import { SketchPicker } from 'react-color';
import questionForm from './questionForm';

interface Props {
  onSubmitHandler(params: any): void;
  requestClose: () => void;
  classes?: any;
  questionJobs: any[];
  fetching?: boolean;
}

interface State {
  submit: boolean;
  question1: { _id?: string, label: string };
  question2: { _id?: string, label: string };
  question3: { _id?: string, label: string };
  question4: { _id?: string, label: string };
  question5: { _id?: string, label: string };
  question6: { _id?: string, label: string };
  question7: { _id?: string, label: string };
  question8: { _id?: string, label: string };
  question9: { _id?: string, label: string };
  question10: { _id?: string, label: string };
}

class QuestionJobForm extends React.Component<any, any> {
  static defaultProps = {
    header: 'Modifier Questions Métier',
    submitText: 'Modifier Questions Métier',
    showInterest: true
  };

  constructor(props: any) {
    super(props);
    const stateObj: any = {};
    for (let i = 1; i <= 10; i++)
      stateObj['question' + i] = { _id: null, label: '' };
    this.props.questionJobs.forEach((questionJob: any, i: any) => {
      stateObj['question' + (i + 1)] = questionJob;
    })
    this.state = {
      submit: false,
      ...stateObj
    };
  }

  componentDidUpdate(prevProps: any) {
    if (!isEqual(prevProps.questionJobs, this.props.questionJobs)) {
      const stateObj: any = {};
      for (let i = 1; i <= 10; i++)
        stateObj['question' + i] = { _id: null, label: '' };
      this.props.questionJobs.forEach((questionJob: any, i: any) => {
        stateObj['question' + (i + 1)] = questionJob;
      })
      this.setState({ ...stateObj });
    }
  }



  // handle niveau changes
  handleChangeQuestionJob = (e: React.ChangeEvent<HTMLInputElement>, index: Number) => {
    e.preventDefault();
    const label = e.target.value;
    this.setState((prevState: any) => {
      const question: string = 'question' + index;
      const newQuestion = { ...prevState[question], label }

      return ({ [question]: newQuestion } as any);
    });
  };
  // oncreate theme handler
  onSubmitHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    const toSubmit: any = [];
    for (let i = 1; i <= 10; i++) {
      const questionState = this.state['question' + i];
      if (questionState.label) toSubmit.push(questionState);
    }
    this.props.onSubmitHandler(
      toSubmit
    );
  }

  public render(): JSX.Element {
    const { classes } = this.props;
    const Inputs = [];
    for (let i = 1; i <= 10; i++)
      Inputs.push(<Input
        placeholder={"Question " + i}
        id={`${i}`}
        label={"Question " + i}
        error={false}
        value={this.state['question' + i].label}
        onChangeInput={e => this.handleChangeQuestionJob(e, i)}
      />);
    return (
      <div className={classes.container}>
        {this.props.fetching && (
          <div
            className={`${this.props.classes.absolute} ${this.props.classes.center}`}
          >
            <CircularProgress />
          </div>
        )}
        <Card className={classes.card}>
          <Grid container spacing={8} justify="center">
            <Grid container spacing={8} justify="center" direction="row">
              <Grid item sm={6}>
                {Inputs}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.onSubmitHandler}
                /* disabled={!(this.state.titleValue && this.state.typeValue)} */
                className={classes.button}
              >
                {this.props.submitText}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}
const styles = () =>
  createStyles({
    container: {
      paddingBottom: 15,
      width: '100%',
      position: 'relative'
    },
    card: {
      width: '100%',
      position: 'relative',
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column',
      padding: 15
    },
    formTitle: {
      margin: 25
    },
    button: {
      marginBottom: 30,
      marginRight: 'auto',
      marginLeft: 'auto',
      display: 'block'
    },
    close: {
      position: 'absolute',
      right: 15,
      top: 20
    },
    absolute: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0
    },
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      padding: 25,
      margin: 10
    },
    colorContainer: {
      width: 100,
      height: 100,
      borderRadius: 10
    },
    sketchContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    }
  });

export default withStyles(styles)(QuestionJobForm);
