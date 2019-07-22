import React, { MouseEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '../inputs/input';
import { EditComptenceParams } from 'requests';
import { SketchPicker } from 'react-color';

interface Props {
  onSubmitHandler(params: EditComptenceParams): void;
  header: string;
  submitText: string;
  requestClose: () => void;
  classes: any;
  n1: string;
  n2: string;
  n3: string;
  n4: string;
  n1desc?: string;
  n2desc?: string;
  n3desc?: string;
  n4desc?: string;
  fetching?: boolean;
  color?: string;
}

interface State {
  submit: boolean;
  errorForN1: boolean;
  n1Error: string;
  n1Value: string;

  errorForN2: boolean;
  n2Error: string;
  n2Value: string;

  errorForN3: boolean;
  n3Error: string;
  n3Value: string;

  errorForN4: boolean;
  n4Error: string;
  n4Value: string;

  n1desc: string;
  n2desc: string;
  n3desc: string;
  n4desc: string;

  background: string;
}

class CompetencesForm extends React.Component<Props, State> {
  static defaultProps = {
    header: 'Créer Activité',
    submitText: 'Créer Activité',
    showInterest: true,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      submit: false,
      errorForN1: false,
      n1Error: '',
      n1Value: this.props.n1 || '',
      errorForN2: false,
      n2Error: '',
      n2Value: this.props.n2 || '',
      errorForN3: false,
      n3Error: '',
      n3Value: this.props.n3 || '',
      errorForN4: false,
      n4Error: '',
      n4Value: this.props.n4 || '',
      n1desc: this.props.n1desc || '',
      n2desc: this.props.n2desc || '',
      n3desc: this.props.n3desc || '',
      n4desc: this.props.n4desc || '',
      background: this.props.color || '',
    };
  }

  resetValues = () => {
    this.setState({
      submit: false,
      errorForN1: false,
      n1Error: '',
      n1Value: this.props.n1 || '',
      errorForN2: false,
      n2Error: '',
      n2Value: this.props.n2 || '',
      errorForN3: false,
      n3Error: '',
      n3Value: this.props.n3 || '',
      errorForN4: false,
      n4Error: '',
      n4Value: this.props.n4 || '',
      n1desc: '',
      n2desc: '',
      n3desc: '',
      n4desc: '',
    });
  }

  // handle errors
  validateNiveau = (value: string) => {
    // handle title error
    if (value === '') {
      return 'vous devez inserer une description pour ce niveau';
    }
    return '';
  }

  // handle niveau changes
  handleChangeN1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n1Error = this.validateNiveau(e.currentTarget.value);
    this.setState({
      n1Error,
      n1Value: e.currentTarget.value,
      errorForN1: !!n1Error,
    });
  }
  handleChangeN2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n2Error = this.validateNiveau(e.currentTarget.value);
    this.setState({
      n2Error,
      n2Value: e.currentTarget.value,
      errorForN2: !!n2Error,
    });
  }
  handleChangeN3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n3Error = this.validateNiveau(e.currentTarget.value);
    this.setState({
      n3Error,
      n3Value: e.currentTarget.value,
      errorForN3: !!n3Error,
    });
  }
  handleChangeN4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n4Error = this.validateNiveau(e.currentTarget.value);
    this.setState({
      n4Error,
      n4Value: e.currentTarget.value,
      errorForN4: !!n4Error,
    });
  }
  handlechangeN1desc = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ n1desc: e.target.value });
  }
  handlechangeN2desc = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ n2desc: e.target.value });
  }
  handlechangeN3desc = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ n3desc: e.target.value });
  }
  handlechangeN4desc = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ n4desc: e.target.value });
  }
  handleChangeComplete = (color: any) => {
    this.setState({ background: color.hex });
  }

  // oncreate theme handler
  onSubmitHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      !this.state.errorForN1 &&
      !this.state.errorForN2 &&
      !this.state.errorForN3 &&
      !this.state.errorForN4
    ) {
      this.props.onSubmitHandler({
        niveau: [
          { title: this.state.n1Value, sub_title: this.state.n1desc },
          { title: this.state.n2Value, sub_title: this.state.n2desc },
          { title: this.state.n3Value, sub_title: this.state.n3desc },
          { title: this.state.n4Value, sub_title: this.state.n4desc },
        ],
        color: this.state.background,
      });
    }
  }

  public render(): JSX.Element {
    const { classes } = this.props;
    console.log(this.state.background);
    return (
      <div className={classes.container}>
        {this.props.fetching && (
          <div
            className={`${this.props.classes.absolute} ${
              this.props.classes.center
            }`}
          >
            <CircularProgress />
          </div>
        )}
        <Card className={classes.card}>
          <Grid container spacing={8} justify="center">
            <Grid container spacing={8} justify="center">
              <Grid item sm={8}>
                <Paper className={classes.paper}>
                  <Input
                    placeholder="Niveau 1"
                    id="1"
                    label="Niveau 1"
                    InputIndication={this.state.n1Error}
                    error={this.state.errorForN1}
                    value={this.state.n1Value}
                    onChangeInput={this.handleChangeN1}
                  />
                  <Input
                    placeholder="Niveau 1 description"
                    id="1"
                    label="Niveau 1 description"
                    value={this.state.n1desc}
                    onChangeInput={this.handlechangeN1desc}
                  />
                </Paper>
                <Paper className={classes.paper}>
                  <Input
                    placeholder="Niveau 2"
                    id="1"
                    label="Niveau 2"
                    InputIndication={this.state.n2Error}
                    error={this.state.errorForN2}
                    value={this.state.n2Value}
                    onChangeInput={this.handleChangeN2}
                  />
                  <Input
                    placeholder="Niveau 2 description"
                    id="1"
                    label="Niveau 2 description"
                    value={this.state.n2desc}
                    onChangeInput={this.handlechangeN2desc}
                  />
                </Paper>
                <Paper className={classes.paper}>
                  <Input
                    placeholder="Niveau 3"
                    id="1"
                    label="Niveau 3"
                    InputIndication={this.state.n3Error}
                    error={this.state.errorForN3}
                    value={this.state.n3Value}
                    onChangeInput={this.handleChangeN3}
                  />
                  <Input
                    placeholder="Niveau 3 description"
                    id="1"
                    label="Niveau 3 description"
                    value={this.state.n3desc}
                    onChangeInput={this.handlechangeN3desc}
                  />
                </Paper>
                <Paper className={classes.paper}>
                  <Input
                    placeholder="Niveau 4"
                    id="1"
                    label="Niveau 4"
                    InputIndication={this.state.n4Error}
                    error={this.state.errorForN4}
                    value={this.state.n4Value}
                    onChangeInput={this.handleChangeN4}
                  />
                  <Input
                    placeholder="Niveau 4 description"
                    id="1"
                    label="Niveau 4 description"
                    value={this.state.n4desc}
                    onChangeInput={this.handlechangeN4desc}
                  />
                </Paper>
              </Grid>
              <Grid item sm={8}>
                <Paper className={classes.sketchContainer}>
                  <SketchPicker
                    color={this.state.background}
                    onChangeComplete={this.handleChangeComplete}
                  />
                  <div
                    className={classes.colorContainer}
                    style={{ background: this.state.background }}
                  />
                </Paper>
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
      position: 'relative',
    },
    card: {
      width: '100%',
      position: 'relative',
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column',
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
    paper: {
      padding: 25,
      margin: 10,
    },
    colorContainer: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    sketchContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  });

export default withStyles(styles)(CompetencesForm);
