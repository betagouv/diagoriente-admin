import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, Language } from 'reducers';
import onClickOutside from 'react-click-outside';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/icons/ArrowDropDown';

// components
import Paper from '@material-ui/core/Paper';

// redux
import loginAction from '../../reducers/login';
// styling
import classNames from '../../utils/classNames';
import './Navbar.scss';

interface BaseProps {
  logout: () => void;
  open: boolean;
  handleClickOutside: () => void;
  toggleButton: () => void;
}
interface MapToProps {
  role: any;
}
type Props = MapToProps & BaseProps;

class LogoutButton extends React.PureComponent<Props> {
  handleClickOutside() {
    this.props.handleClickOutside();
  }
  render() {
    return (
      <>
        <Button
          onClick={this.props.toggleButton}
          className={'nav-bar-button'}
          color="inherit"
        >
          {this.props.role}
          <Icon color="inherit" className={'nav-bar-button-arrow'} />
        </Button>
        <button
          onClick={this.props.logout}
          className={classNames(
            'logout-button',
            this.props.open && 'logout-button-open',
          )}
        >
          <Paper className="logout-text">Déconnexion</Paper>
        </button>
      </>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    logout: () => dispatch(loginAction.logout()),
  };
}
const mapStateToProps = (state: ReduxState): MapToProps => ({
  role: state.login.get('role'),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(onClickOutside(LogoutButton));
