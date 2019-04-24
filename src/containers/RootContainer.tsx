import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Location } from 'history';

import { AnyAction, Dispatch } from 'redux';

import messages, { availableLanguages } from '../config/intl';
import { Language, ReduxState } from 'reducers';
import { history } from '../config/store';
import configActions from '../reducers/configReducer';
import loginAction from '../reducers/login';
import startupAction from '../reducers/startUp';
import { decodeUri } from '../utils';

import ProtectedRoute from '../component/ProtectedRoute';

// containers
import HomeContainer from '../containers/HomeContainer';
import LoginPage from '../containers/login';

interface MapToProps {
  language: Language;
  location?: any;
  connected: boolean;
  done: boolean;
}
interface DispatchToProps {
  changeLanguage: (lang: Language) => void;
  loginSuccess: (token: any) => void;
  runStartUp: () => void;
}

interface Props extends MapToProps, DispatchToProps {}

interface State {
  test: any;
  mounted: boolean;
}

class RootContainer extends Component<Props, State> {
  public state = {
    test: null,
    mounted: false,
  };

  pathname: string = history.location.pathname;

  public async componentDidMount() {
    history.listen(this.screenChange);
    this.checkLocation(this.props.location);
    this.props.runStartUp();
  }

  public componentDidUpdate(props: Props) {
    this.checkLocation(this.props.location, props.location);
  }

  public checkLocation(currentLocation: any, prevLocation?: any): void {
    const current = currentLocation || {};
    const prev = prevLocation || {};

    const { search: currentSearch } = current;
    const { search: prevSearch } = prev;

    let outputLanguage: Language | null = null;

    if (currentSearch && !prevSearch) {
      const { lang } = decodeUri(currentSearch);
      if (lang !== this.props.language) {
        outputLanguage = lang;
      }
    } else if (currentSearch && prevSearch) {
      const { lang: currentLang } = decodeUri(currentSearch);
      const { lang: prevLang } = decodeUri(prevSearch);
      if (prevLang !== currentLang) {
        outputLanguage = currentLang;
      }
    }

    if (
      outputLanguage &&
      availableLanguages.find(lang => lang === outputLanguage)
    ) {
      this.props.changeLanguage(outputLanguage);
    }
  }

  public screenChange = (nextLocation: Location<any>): void => {
    if (nextLocation.pathname !== this.pathname) {
      window.scrollTo(0, 0);
    }

    this.pathname = nextLocation.pathname;
  }

  public render() {
    if (!this.props.done) return null;
    return (
      <IntlProvider
        key={this.props.language}
        messages={messages[this.props.language]}
        locale={this.props.language}
      >
        <Switch>
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute path="/" component={HomeContainer} />
        </Switch>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state: ReduxState): MapToProps => ({
  language: state.config.get('language'),
  location: state.router.location,
  connected: state.login.get('connected'),
  done: state.startUp.get('done'),
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): DispatchToProps => ({
  changeLanguage: lang => dispatch(configActions.languageChange(lang)),
  loginSuccess: token => dispatch(loginAction.loginSuccess(token)),
  runStartUp: () => dispatch(startupAction.runStartUp()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
