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
  onSubmitHandler(params: { title: string; rank: string }): void;
  header?: string;
  submitText?: string;
  classes: any;
  title?: string;
  rank?: string;
  buttonName?: string;
  fetching?: boolean;
}

class CreateCompetence extends React.Component<Props> {
  state = {
    submit: false,
    errorForRank: false,
    errorForName: false,
    nameValue: this.props.title || '',
    rankValue: this.props.rank || '',
    nameError: '',
    rankError: '',
  };

  resetValues = () => {
    this.setState({
      submit: false,
      errorForRank: false,
      errorForName: false,
      nameValue: '',
      rankValue: '',
      nameError: '',
      rankError: '',
    });
  }

  // handle errors
  validateName = (value: string) => {
    // handle title error
    if (value === '') {
      return 'vous devez insérer un nom';
    }
    return '';
  }
  validateRank = (value: string) => {
    const rank: number = (value as any) - 0;
    if (!rank || rank > 1000) {
      return 'vous devez insérer une rang inférieur a 1000';
    }
    return '';
  }

  // handle name changes
  handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameError = this.validateName(e.currentTarget.value);
    this.setState({
      nameError,
      nameValue: e.currentTarget.value,
      errorForName: !!nameError,
    });
  }
  // handle change for rank
  handleChangeRank = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rankError = this.validateRank(e.currentTarget.value);
    this.setState({
      rankError,
      rankValue: e.target.value,
      errorForRank: !!rankError,
    });
  }
  // oncreate theme handler
  onSubmitHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (this.state.errorForName || !this.state.errorForRank) {
      this.props.onSubmitHandler({
        title: this.state.nameValue,
        rank: this.state.rankValue,
      });
    }
  }

  checkError = () => {
    return !!(
      this.state.nameError ||
      !this.state.nameValue ||
      !this.state.rankValue ||
      this.state.rankError
    );
  }

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        {this.props.fetching && (
          <div
            className={`${this.props.classes.absolute} ${
              this.props.classes.center
            }`}
          >
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
          className={this.props.classes.formContainer}
        >
          <Grid className={this.props.classes.inputsContainer} item sm={8}>
            <Input
              placeholder="Titre"
              id="1"
              label="Titre"
              InputIndication={this.state.nameError}
              error={this.state.errorForName}
              value={this.state.nameValue}
              onChangeInput={this.handleChangeName}
            />
            <Input
              placeholder="Rang"
              id="2"
              label="Rang"
              InputIndication={this.state.rankError}
              error={this.state.errorForRank}
              value={this.state.rankValue}
              onChangeInput={this.handleChangeRank}
              type={'number'}
            />
          </Grid>
          <Grid className={classes.buttonContainer} item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.onSubmitHandler}
              disabled={this.checkError()}
              className={classes.button}
            >
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

export interface CompetenceFormComponent extends CreateCompetence {}

export default withStyles(styles)(CreateCompetence);
