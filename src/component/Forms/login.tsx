import React, { ChangeEvent, MouseEvent } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { validateEmail, validatePassword } from '../../utils/FormValidation';

const styles = (theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing.unit * 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '90%',
    },
    padding: {
      padding: theme.spacing.unit,
      height: 300,
      width: 500,
    },
  });
interface Props extends WithStyles<typeof styles> {
  // non-style props
  submit: (email: string, password: string) => void;
  // injected style props
  classes: {
    padding: string;
    margin: string;
    // button: string;
  };
  serverError: any;
}
interface State {
  email: string;
  emailError: boolean;
  password: string;
  passwordError: boolean;
  emailMsgError: string;
  pswMsgError: String;
}

class LoginForm extends React.Component<Props, State> {
  state: State = {
    email: '',
    emailError: false,
    password: '',
    passwordError: false,
    emailMsgError: '',
    pswMsgError: '',
  };
  onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { value: email } = e.target;
    this.setState({
      email,
      emailMsgError: validateEmail(email),

      emailError: !!validateEmail(email),
    });
  }

  onChangePass = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { value: password } = e.target;
    this.setState({
      password,
      passwordError: !!validatePassword(password),
      pswMsgError: validatePassword(password),
    });
  }

  submitForm = (): void => {
    const { email, password, emailError, passwordError } = this.state;

    if (!emailError) {
      this.props.submit(email, password);
    }
  }
  onClickLogin = (e: MouseEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { email, password, emailError, passwordError } = this.state;
    this.setState(
      {
        emailMsgError: validateEmail(email),
        pswMsgError: validatePassword(password),
        emailError: !!validateEmail(email),
        passwordError: !!validatePassword(password),
      },
      () => this.submitForm(),
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.padding}>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="username"
                label="Nom d'utilisateur
                "
                type="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                error={this.state.emailError}
                fullWidth
                autoFocus
                required
              />
              <FormHelperText style={{ color: 'red' }}>
                {this.state.emailMsgError}
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="password"
                label="mot de passe"
                type="password"
                value={this.state.password}
                onChange={this.onChangePass}
                error={this.state.passwordError}
                fullWidth
                required
              />
              <FormHelperText style={{ color: 'red' }}>
                {this.state.pswMsgError}
                {this.state.password.length === 0
                  ? 'Le mot de passe doit contenir une lettre majiscule, minuscule et un chiffre'
                  : null}
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Souviens-toi de moi"
              />
            </Grid>
            <Grid item>
              <Button
                disableFocusRipple
                disableRipple
                style={{ textTransform: 'none' }}
                variant="text"
                color="primary"
              >
                  Mot de passe oublié ?
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button
              variant="outlined"
              color="primary"
              style={{ textTransform: 'none' }}
              onClick={this.onClickLogin}
            >
                 S'identifier
            </Button>
          </Grid>
          <FormHelperText style={{ color: 'red', fontSize: 16 }}>
            {this.props.serverError}
          </FormHelperText>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(LoginForm);
