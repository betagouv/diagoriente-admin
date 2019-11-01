import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '../inputs/input';

import { CreateEnvironmentParams } from 'requests';
export interface createAccessibilityParams {
  name: string;
}
interface Props {
  classes?: any;
  fetching?: boolean;
  onSubmitHandler: (params: createAccessibilityParams) => void;
  header: string;
  submitText: string;
  title?: string;
  requestClose: () => void;
}
interface State {
  title: string;
  titleError: string;
  ErrorforTitle: boolean;
}

class ContecxtForm extends React.Component<Props, State> {
  state: State = {
    title: this.props.title || '',
    titleError: '',
    ErrorforTitle: false,
  };

  validate = (value: string) => {
    // handle title error
    if (value === '') {
      return 'vous devez inserer remplir ce champs';
    }
    return '';
  };

  changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleError = this.validate(e.currentTarget.value);
    this.setState({
      titleError,
      title: e.currentTarget.value,
      ErrorforTitle: !!titleError,
    });
  };

  onSubmitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (this.state.ErrorforTitle) {
      this.setState({
        titleError: this.validate(this.state.title),
        ErrorforTitle: true,
      });
    } else {
      this.props.onSubmitHandler({
        name: this.state.title,
      });
    }
  };

  render(): JSX.Element {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {this.props.fetching && (
          <div className={`${this.props.classes.absolute} ${this.props.classes.center}`}>
            <CircularProgress />
          </div>
        )}
        <Card className={classes.card}>
          <Grid container spacing={8} justify="center">
            <Input
              placeholder=" Titre"
              id="1"
              label="Titre"
              InputIndication={this.state.titleError}
              error={this.state.ErrorforTitle}
              value={this.state.title}
              onChangeInput={this.changeTitle}
            />
          </Grid>
          <Grid item xs={12} className={this.props.classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.onSubmitHandler}
              disabled={!this.state.title}
              className={classes.button}
            >
              {this.props.submitText}
            </Button>
          </Grid>
        </Card>
      </div>
    );
  }
}

const styles = () =>
  createStyles({
    container: {
      width: '100%',
      position: 'relative',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 50px',
    },
    card: {
      width: '100%',
      position: 'relative',
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column',
      padding: 15,
      height: '65%',
    },
    formTitle: {
      margin: 25,
    },
    button: {
      marginRight: 'auto',
      marginLeft: 'auto',
      display: 'block',
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    close: {
      position: 'absolute',
      right: 15,
      top: 20,
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
  });

export default withStyles(styles)(ContecxtForm);
