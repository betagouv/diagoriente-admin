import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReduxState, Language } from 'reducers';
import { connect } from 'react-redux';

// components
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';

import LogoutButton from './LogoutButton';

// data
import menu, { menuAdvisor } from './menu';

// styling
import classNames from '../../utils/classNames';
import './Navbar.scss';

interface State {
  id: number | null;
  open: boolean;
}
interface MapToProps {
  role: any;
}

class Navbar extends React.Component<MapToProps, State> {
  state: State = {
    id: null,
    open: false,
  };

  close = () => {
    if (this.state.open) {
      this.setState({ open: false });
    }
  }

  toggleLogoutButton = () => {
    this.setState(state => ({ open: !state.open }));
  }
  menuSwap = this.props.role === 'admin' ? menu : menuAdvisor;
  public renderDrawer() {
    return (
      <Paper className={'nav-side-bar'}>
        {this.menuSwap.map(({ icon: Icon, nom, id, url }) => {
          const onMouseEnter = () => {
            this.setState({ id });
          };
          const onMouseLeave = () => {
            this.setState({ id: null });
          };
          return (
            <NavLink
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              to={url}
              className={classNames(
                'nav-side-bar-list',
                this.state.id === id && 'nav-side-bar-list-hover',
              )}
              key={id}
              activeStyle={{
                fontWeight: 'bold',
                color: '#3f51b5',
              }}
              style={{ textDecoration: 'none' }}
            >
              <Icon color={'inherit'} />
              <span className="title">{nom}</span>
            </NavLink>
          );
        })}
      </Paper>
    );
  }

  public render(): JSX.Element {
    return (
      <>
        <AppBar className={'nav-bar-container'}>
          <div className="title-nav">Trouvetavoie</div>

          <LogoutButton
            handleClickOutside={this.close}
            open={this.state.open}
            toggleButton={this.toggleLogoutButton}
          />
        </AppBar>
        {this.renderDrawer()}
      </>
    );
  }
}
const mapStateToProps = (state: ReduxState): MapToProps => ({
  role: state.login.get('role'),
});

export default connect(mapStateToProps)(Navbar);
