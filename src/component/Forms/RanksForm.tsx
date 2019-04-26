import React, { MouseEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import createStyles from '@material-ui/core/styles/createStyles';
import Input from '../inputs/input';
import Typography from '@material-ui/core/Typography';
import { Divider, Paper } from '@material-ui/core';
import { CreateRankParams } from 'requests';

interface Props {
  onSubmitHandler(params: CreateRankParams): void;
  header?: string;
  submitText?: string;
  classes: any;
  pExpInt1?: number;
  pExpInt2?: number;
  pExpInt3?: number;
  pExpInt4?: number;
  pExpInt5?: number;
  rank1?: number;
  rank2?: number;
  rank3?: number;
  rank4?: number;
  rank5?: number;
  buttonName?: string;
  fetching?: boolean;
}

class CreateRank extends React.Component<Props> {
  state = {
    submit: false,
    errorForRank1: false,
    errorForRank2: false,
    errorForRank3: false,
    errorForRank4: false,
    errorForRank5: false,
    errorForName1: false,
    errorForName2: false,
    errorForName3: false,
    errorForName4: false,
    errorForName5: false,
    nameValue1: this.props.rank1 || 1,
    nameValue2: this.props.rank2 || 2,
    nameValue3: this.props.rank3 || 3,
    nameValue4: this.props.rank4 || 4,
    nameValue5: this.props.rank5 || 5,
    rankValue1: this.props.pExpInt1 || 0.0,
    rankValue2: this.props.pExpInt2 || 0.0,
    rankValue3: this.props.pExpInt3 || 0.0,
    rankValue4: this.props.pExpInt4 || 0.0,
    rankValue5: this.props.pExpInt5 || 0.0,
    nameError1: '',
    nameError2: '',
    nameError3: '',
    nameError4: '',
    nameError5: '',
    rankError1: '',
    rankError2: '',
    rankError3: '',
    rankError4: '',
    rankError5: '',
  };

  /*  resetValues = () => {
    this.setState({
      submit: false,
      errorForRank: false,
      errorForName: false,
      nameValue: 0,
      rankValue: 0,
      nameError: '',
      rankError: '',
    });
  } */

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
    if (!rank || rank > 2) {
      return 'vous devez insérer une rang inférieur a 2';
    }
    return '';
  }

  // handle name changes
  handleChangeName1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameError1 = this.validateName(e.currentTarget.value);
    this.setState({
      nameError1,
      nameValue1: e.currentTarget.value,
      errorForName1: !!nameError1,
    });
  }
  handleChangeName2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameError2 = this.validateName(e.currentTarget.value);
    this.setState({
      nameError2,
      nameValue2: e.currentTarget.value,
      errorForName2: !!nameError2,
    });
  }
  handleChangeName3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameError3 = this.validateName(e.currentTarget.value);
    this.setState({
      nameError3,
      nameValue3: e.currentTarget.value,
      errorForName3: !!nameError3,
    });
  }
  handleChangeName4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameError4 = this.validateName(e.currentTarget.value);
    this.setState({
      nameError4,
      nameValue4: e.currentTarget.value,
      errorForName4: !!nameError4,
    });
  }
  handleChangeName5 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameError5 = this.validateName(e.currentTarget.value);
    this.setState({
      nameError5,
      nameValue5: e.currentTarget.value,
      errorForName5: !!nameError5,
    });
  }
  // handle change for rank
  handleChangeRank1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rankError1 = this.validateRank(e.currentTarget.value);
    this.setState({
      rankError1,
      rankValue1: e.target.value.replace(',', '.'),
      errorForRank1: !!rankError1,
    });
  }
  handleChangeRank2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rankError2 = this.validateRank(e.currentTarget.value);
    this.setState({
      rankError2,
      rankValue2: e.target.value.replace(',', '.'),
      errorForRank2: !!rankError2,
    });
  }
  handleChangeRank3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rankError3 = this.validateRank(e.currentTarget.value);
    this.setState({
      rankError3,
      rankValue3: e.target.value.replace(',', '.'),
      errorForRank3: !!rankError3,
    });
  }
  handleChangeRank4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rankError4 = this.validateRank(e.currentTarget.value);
    this.setState({
      rankError4,
      rankValue4: e.target.value.replace(',', '.'),
      errorForRank4: !!rankError4,
    });
  }
  handleChangeRank5 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rankError5 = this.validateRank(e.currentTarget.value);
    this.setState({
      rankError5,
      rankValue5: e.target.value.replace(',', '.'),
      errorForRank5: !!rankError5,
    });
  }
  // oncreate theme handler
  onSubmitHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      this.state.errorForName1 ||
      !this.state.errorForRank1 ||
      this.state.errorForName2 ||
      !this.state.errorForRank2 ||
      this.state.errorForName3 ||
      !this.state.errorForRank3 ||
      this.state.errorForName4 ||
      !this.state.errorForRank4 ||
      this.state.errorForName5 ||
      !this.state.errorForRank5
    ) {
      this.props.onSubmitHandler({familiesRank :[
        { rank: this.state.nameValue1, pExpInt: this.state.rankValue1 },
        { rank: this.state.nameValue2, pExpInt: this.state.rankValue2 },
        { rank: this.state.nameValue3, pExpInt: this.state.rankValue3 },
        { rank: this.state.nameValue4, pExpInt: this.state.rankValue4 },
        { rank: this.state.nameValue5, pExpInt: this.state.rankValue5 },
      ]});
    }
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
            <Paper className={this.props.classes.paper}>
              <Input
                placeholder="rang"
                id="1"
                label="Nom"
                InputIndication={this.state.nameError1}
                error={this.state.errorForName1}
                value={this.state.nameValue1}
                onChangeInput={this.handleChangeName1}
              />
              <Input
                placeholder="valeur"
                id="2"
                label="Rang"
                InputIndication={this.state.rankError1}
                error={this.state.errorForRank1}
                value={this.state.rankValue1}
                onChangeInput={this.handleChangeRank1}
                type="number"
              />
            </Paper>
            <Paper className={this.props.classes.paper}>
              <Input
                placeholder="rang"
                id="3"
                label="Nom"
                InputIndication={this.state.nameError2}
                error={this.state.errorForName2}
                value={this.state.nameValue2}
                onChangeInput={this.handleChangeName2}
              />
              <Input
                placeholder="valeur"
                id="4"
                label="Rang"
                InputIndication={this.state.rankError2}
                error={this.state.errorForRank2}
                value={this.state.rankValue2}
                onChangeInput={this.handleChangeRank2}
                type="number"
              />
            </Paper>
            <Paper className={this.props.classes.paper}>
              <Input
                placeholder="rang"
                id="5"
                label="Nom"
                InputIndication={this.state.nameError3}
                error={this.state.errorForName3}
                value={this.state.nameValue3}
                onChangeInput={this.handleChangeName3}
              />
              <Input
                placeholder="valeur"
                id="6"
                label="Rang"
                InputIndication={this.state.rankError3}
                error={this.state.errorForRank3}
                value={this.state.rankValue3}
                onChangeInput={this.handleChangeRank3}
                type="number"
                
              />
            </Paper>
            <Paper className={this.props.classes.paper}>
              <Input
                placeholder="rang"
                id="7"
                label="Nom"
                InputIndication={this.state.nameError4}
                error={this.state.errorForName4}
                value={this.state.nameValue4}
                onChangeInput={this.handleChangeName4}
              />
              <Input
                placeholder="valeur"
                id="8"
                label="Rang"
                InputIndication={this.state.rankError4}
                error={this.state.errorForRank4}
                value={this.state.rankValue4}
                onChangeInput={this.handleChangeRank4}
                type="number"
              />
            </Paper>
            <Paper className={this.props.classes.paper}>
              <Input
                placeholder="rang"
                id="9"
                label="Nom"
                InputIndication={this.state.nameError5}
                error={this.state.errorForName5}
                value={this.state.nameValue5}
                onChangeInput={this.handleChangeName5}
              />
              <Input
                placeholder="valeur"
                id="10"
                label="Rang"
                InputIndication={this.state.rankError5}
                error={this.state.errorForRank5}
                value={this.state.rankValue5}
                onChangeInput={this.handleChangeRank5}
                type="number"
              />
            </Paper>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.onSubmitHandler}
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
    paper: {
      padding: '5%',
      marginTop: 5,
      marginBottom: 5,
    },
  });

export default withStyles(styles)(CreateRank);
