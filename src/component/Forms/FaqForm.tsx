import React, { MouseEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import createStyles from '@material-ui/core/styles/createStyles';
import Input from '../inputs/input';
import Typography from '@material-ui/core/Typography';

interface Props {
  onSubmitHandler(params: { question: string; response: string }): void;
  header?: string;
  submitText?: string;
  classes: any;
  question?: string;
  response?: string;
  buttonName?: string;
  fetching?: boolean;
}
interface State {
  submit: boolean;
  question: string;
  response: string;
}

class FaqForm extends React.Component<Props> {
  state = {
    submit: false,
    question: '',
    response: '',
  };

  componentDidUpdate(props: Props) {
    if (props.question !== this.props.question) {
      this.setState({
        question: this.props.question,
        response: this.props.response,
      });
    }
  }
  // handle question changes
  handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ question: e.target.value });
  };
  // handle question changes
  handleChangeResponse = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ response: e.target.value });
  };

  // oncreate theme handler
  onSubmit = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (this.state.question && this.state.response) {
      this.props.onSubmitHandler({
        question: this.state.question,
        response: this.state.response,
      });
    }
  };

  /* checkError = () => {
    return !!(this.state.questionError || !this.state.questionValue);
  }; */

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        {this.props.fetching && (
          <div
            className={`${this.props.classes.absolute} ${
              this.props.classes.center
            }`}>
            <CircularProgress />
          </div>
        )}
        <Typography variant="h4" gutterBottom className={classes.formTitle}>
          {this.props.header}
        </Typography>
        <Grid
          direction="column"
          container
          spacing={8}
          alignItems="center"
          justify="center"
          className={this.props.classes.formContainer}>
          <Grid className={this.props.classes.inputsContainer} item sm={8}>
            <Input
              placeholder="question"
              id="1"
              label="Question"
              value={this.state.question}
              onChangeInput={this.handleChangeQuestion}
              name={this.state.question}
            />
            <Input
              placeholder="response"
              id="1"
              label="Reponse"
              value={this.state.response}
              onChangeInput={this.handleChangeResponse}
              name={this.state.response}
            />
          </Grid>
          <Grid className={classes.buttonContainer} item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.onSubmit}
              // disabled={this.checkError()}
              className={classes.button}>
              {this.props.buttonName}
            </Button>
          </Grid>
        </Grid>
      </Card>
    );
  }
}
const styles = () =>
  createStyles({
    card: {
      width: '100%',
      position: 'relative',
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100% - 15px)',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: 15,
    },
    formTitle: {
      margin: 25,
    },
    button: {
      marginBottom: 30,
      marginRight: 'auto',
      marginLeft: 'auto',
      display: 'block',
    },
    close: {
      position: 'absolute',
      right: 15,
      top: 20,
    },
    buttonContainer: {
      flex: '1 1 auto',
      display: 'flex',
      alignItems: 'flex-end',
    },
    absolute: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
    },
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formContainer: {
      width: '100%',
      height: '100%',
    },
    inputsContainer: {
      width: '100%',
    },
  });

export default withStyles(styles)(FaqForm);
