import React, { MouseEvent, ChangeEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import createStyles from '@material-ui/core/styles/createStyles';
import Input from '../inputs/input';
import Typography from '@material-ui/core/Typography';
import { validateEmail, validatePassword } from '../../utils/FormValidation';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface Props {
  onSubmitHandler(params: {
    email?: string;
    OldPassword?: string;
    password?: string;
    firstName: string;
    lastName: string;
    institution: string;
    pseudo: string;
  }): void;
  header?: string;
  submitText?: string;
  classes?: any;
  buttonName?: string;
  fetching?: boolean;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  institution?: string;
  pseudo?: string;
  confirmPassword?: string;
  editPass?: boolean;
  checked?: boolean;
  create?: boolean;
}

class AdvisorForm extends React.Component<Props> {
  state = {
    firstName: this.props.firstName || '',
    lastName: this.props.lastName || '',
    pseudo: this.props.pseudo || '',
    institution: this.props.institution || '',
    email: this.props.email || '',
    password: this.props.password || '',
    errorFirstName: false,
    errorLastName: false,
    errorInstitution: false,
    errorPseudo: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    OldPasswordError: false,
    checked: false || this.props.checked,
    LastNameError: '',
    FisrtnameError: '',
    InstitutionError: '',
    PseudoError: '',
    emailMsgError: '',
    pswMsgError: '',
    confirmPassword: '',
    ConfirmPswMsgError: '',
    OldPswMsgError: '',
    OldPassword: '',
  };

  // handle errors
  validate = (value: string) => {
    // handle title error
    if (value === '') {
      return 'vous devez remplir ce champs';
    }
    return '';
  }
  validateConfirm = (value: string) => {
    if (value !== this.state.password) {
      return 'vous devez Confirmer le mot de passe correctement';
    }
    return '';
  }

  // handle name changes
  handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    const FisrtnameError = this.validate(e.currentTarget.value);
    this.setState({
      FisrtnameError,
      firstName: e.currentTarget.value,
      errorFirstName: !!FisrtnameError,
    });
  }
  // handle change for rank
  handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    const LastNameError = this.validate(e.currentTarget.value);
    this.setState({
      LastNameError,
      lastName: e.target.value,
      errorLastName: !!LastNameError,
    });
  }
  handleChangePseudo = (e: ChangeEvent<HTMLInputElement>) => {
    const PseudoError = this.validate(e.currentTarget.value);
    this.setState({
      PseudoError,
      pseudo: e.target.value,
      errorPseudo: !!PseudoError,
    });
  }
  handleChangeInstitution = (e: ChangeEvent<HTMLInputElement>) => {
    const InstitutionError = this.validate(e.currentTarget.value);
    this.setState({
      InstitutionError,
      institution: e.target.value,
      errorInstitution: !!InstitutionError,
    });
  }

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { value: email } = e.target;
    this.setState({
      email,
      emailMsgError: validateEmail(email),

      emailError: !!validateEmail(email),
    });
  }
  onChangeOldPass = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { value: OldPassword } = e.target;
    this.setState({
      OldPassword,
      OldPasswordError: !!validatePassword(OldPassword),
      OldPswMsgError: validatePassword(OldPassword),
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
  onChangeConfirmPass = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { value: confirmPassword } = e.target;
    this.setState({
      confirmPassword,
      confirmPasswordError: !!validatePassword(confirmPassword),
      ConfirmPswMsgError: this.validateConfirm(confirmPassword),
    });
  }
  handleChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ checked: e.target.checked });
  }
  // oncreate theme handler
  onSubmitHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      !this.state.errorFirstName &&
      !this.state.errorLastName &&
      !this.state.errorInstitution &&
      !this.state.errorPseudo &&
      !this.state.emailError &&
      !this.state.passwordError &&
      !this.state.confirmPasswordError &&
      !this.state.OldPasswordError &&
      this.state.checked &&
      this.props.editPass
    ) {
      this.props.onSubmitHandler({
        OldPassword: this.state.OldPassword,
        password: this.state.password,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        pseudo: this.state.pseudo,
        institution: this.state.institution,
      });
    } else if (
      !this.state.errorFirstName &&
      !this.state.errorLastName &&
      !this.state.errorInstitution &&
      !this.state.errorPseudo &&
      !this.state.emailError &&
      !this.state.checked &&
      !this.props.create
    ) {
      this.props.onSubmitHandler({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        pseudo: this.state.pseudo,
        institution: this.state.institution,
      });
    } else if (
      !this.state.errorFirstName &&
      !this.state.errorLastName &&
      !this.state.errorInstitution &&
      !this.state.errorPseudo &&
      !this.state.emailError &&
      !this.state.passwordError &&
      !this.state.confirmPasswordError &&
      !this.state.checked &&
      this.props.create
    ) {
      this.props.onSubmitHandler({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        pseudo: this.state.pseudo,
        institution: this.state.institution,
        password: this.state.password,
      });
    } else if (
      !this.state.errorFirstName &&
      !this.state.errorLastName &&
      !this.state.errorInstitution &&
      !this.state.errorPseudo &&
      !this.state.emailError &&
      !this.state.passwordError &&
      !this.state.confirmPasswordError &&
      this.state.checked &&
      !this.props.editPass

     ) {
      this.props.onSubmitHandler({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        pseudo: this.state.pseudo,
        institution: this.state.institution,
        password: this.state.password,
      });
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
            <Input
              placeholder="Nom"
              id="1"
              label="Nom"
              InputIndication={this.state.LastNameError}
              error={this.state.errorFirstName}
              value={this.state.lastName}
              onChangeInput={this.handleChangeLastName}
            />
            <Input
              placeholder="Prénom"
              id="2"
              label="Prénom"
              InputIndication={this.state.FisrtnameError}
              error={this.state.errorLastName}
              value={this.state.firstName}
              onChangeInput={this.handleChangeFirstName}
            />
            <Input
              placeholder="Institution"
              id="3"
              label="Institution"
              InputIndication={this.state.InstitutionError}
              error={this.state.errorInstitution}
              value={this.state.institution}
              onChangeInput={this.handleChangeInstitution}
            />
            <Input
              placeholder="Pseudo"
              id="4"
              label="Pseudo"
              InputIndication={this.state.PseudoError}
              error={this.state.errorPseudo}
              value={this.state.pseudo}
              onChangeInput={this.handleChangePseudo}
            />
            <Input
              placeholder="Email"
              id="5"
              label="Email"
              InputIndication={this.state.emailMsgError}
              error={this.state.emailError}
              value={this.state.email}
              onChangeInput={this.onChangeEmail}
              type="email-address"
            />

            {this.props.editPass && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checked}
                    onChange={this.handleChangeCheckBox}
                    value={this.state.checked}
                    color="primary"
                  />
                }
                label="Modifier Mot de passe"
              />
            )}
            {this.state.checked && this.props.editPass ? (
              <div>
                <Input
                  placeholder="Ancien Mot de passe"
                  id="6"
                  label="Ancien Mot de passe"
                  InputIndication={this.state.OldPswMsgError}
                  error={this.state.OldPasswordError}
                  value={this.state.OldPassword}
                  onChangeInput={this.onChangeOldPass}
                  type="password"
                />
                <Input
                  placeholder="Nouveau Mot de passe"
                  id="7"
                  label="Nouveau Mot de passe"
                  InputIndication={this.state.pswMsgError}
                  error={this.state.passwordError}
                  value={this.state.password}
                  onChangeInput={this.onChangePass}
                  type="password"
                />
                <Input
                  placeholder="Confirmer Mot de passe"
                  id="8"
                  label="Confirmer Mot de passe"
                  InputIndication={this.state.ConfirmPswMsgError}
                  error={this.state.confirmPasswordError}
                  value={this.state.confirmPassword}
                  onChangeInput={this.onChangeConfirmPass}
                  type="password"
                />
              </div>
            ) : (
              !this.props.editPass && (
                <div>
                  <Input
                    placeholder="Nouveau Mot de passe"
                    id="7"
                    label="Nouveau Mot de passe"
                    InputIndication={this.state.pswMsgError}
                    error={this.state.passwordError}
                    value={this.state.password}
                    onChangeInput={this.onChangePass}
                    type="password"
                  />
                  <Input
                    placeholder="Confirmer Mot de passe"
                    id="8"
                    label="Confirmer Mot de passe"
                    InputIndication={this.state.ConfirmPswMsgError}
                    error={this.state.confirmPasswordError}
                    value={this.state.confirmPassword}
                    onChangeInput={this.onChangeConfirmPass}
                    type="password"
                  />
                </div>
              )
            )}
          </Grid>
          <Grid className={classes.buttonContainer} item xs={12}>
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
  });

export interface AdvisorFormComponent extends AdvisorForm {}

export default withStyles(styles)(AdvisorForm);
