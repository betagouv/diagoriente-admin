import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import loginActions from '../reducers/login';
import loginAdvisorActions from '../reducers/loginAdvisor';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import LoginForm from '../component/Forms/login';
import { ReduxState } from 'reducers';
import { RouteComponentProps } from 'react-router-dom';

interface BaseProps {
  classes: any;
}

interface DispatchToProps {
  loginRequest: (email: string, password: string) => void;
  loginAdvisor: (email: string, password: string) => void;
}

interface MapToProps {
  loginError : any;
  connected: boolean;
  role: string;
}

interface State {
  value: string;
}

type Props = DispatchToProps & BaseProps & MapToProps & RouteComponentProps;

class LoginContainer extends React.Component<Props, State> {
  state = {
    value: 'admin',
  };
  handleChange = (e: any) => {
    this.setState({ value: e.target.value });
  }
  componentDidUpdate (props: Props)  {
    if (this.props.connected && this.props.role === 'admin') {
      this.props.history.push({
        pathname: '/themes',
        search: this.props.location.search,
      });
    }
    if (this.props.connected && this.props.role === 'advisor') {
      this.props.history.push({
        pathname: '/parcours',
        search: this.props.location.search,
      });
    }
  }

  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <div className="login-container">
        {/* <FormControl>
          <FormLabel>Role</FormLabel>
          <RadioGroup
            aria-label="role"
            name="role1"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            <FormControlLabel
              value="advisor"
              control={<Radio />}
              label="Conseiller"
            />
          </RadioGroup>
        </FormControl> */}

        <LoginForm submit={this.props.loginRequest}  serverError={this.props.loginError}/>

      </div>
    );
  }
}

function mapStateToProps(state: ReduxState): MapToProps {
  return {
    loginError: state.login.get('error'),
    connected: state.login.get('connected'),
    role: state.login.get('role'),
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): DispatchToProps => ({
  loginRequest: (email, password) =>
    dispatch(loginActions.loginRequest(email, password)),
  loginAdvisor: (email, password) =>
    dispatch(loginAdvisorActions.loginAdvisorRequest(email, password)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
