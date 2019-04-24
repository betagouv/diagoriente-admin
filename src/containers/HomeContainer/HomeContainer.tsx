import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ReduxState, Language } from 'reducers';
import { decodeUri, encodeUri } from '../../utils';
import Navbar from '../../component/Navbar/Navbar';
import { Route, Switch } from 'react-router-dom';

import Themes from '../ThemesContainer';
import Activities from '../ActivitiesContainer';
import interests from '../interestsContainer';
import UsersContainer from '../UsersContainer';
import Competences from '../CompetencesContainer';
import ParcoursContainer from '../ParcoursContainer';
import AdvisorContainer from '../AdvisorContainer';
import SecteurContainer from '../SecteurContainer';
import './home.css';
import FamilleContainer from '../FamilleContainer';
import JobsContainer from '../JobsContainer';

interface MapToProps {
  language: Language;
  role: any;
}

type Props = MapToProps & InjectedIntlProps & RouteComponentProps;

class HomeContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    if (props.match.isExact) {
      this.props.history.replace('/themes');
    }
  }

  public onChange = (value: Language): void => {
    const { search } = this.props.location;

    this.props.history.push({
      pathname: this.props.location.pathname,
      search: search
        ? encodeUri({ ...decodeUri(search), lang: value })
        : encodeUri({ lang: value }),
    });
  }

  public render(): JSX.Element {
    return (
      <>
        <Navbar />
        <div className="home-container-wrapper">
          <Switch>
            {this.props.role === 'admin' && (
              <>
                <Route path="/themes" component={Themes} />
                <Route path="/activities" component={Activities} />
                <Route path="/users" component={UsersContainer} />
                <Route path="/interests" component={interests} />
                <Route path="/competences" component={Competences} />
                <Route path="/advisor" component={AdvisorContainer} />
                <Route path="/secteur" component={SecteurContainer} />
                <Route path="/famille" component={FamilleContainer} />
                <Route path="/parcours" component={ParcoursContainer} />
                <Route path="/jobs" component={JobsContainer} />
              </>
            )}
            <Route path="/parcours" component={ParcoursContainer} />
            <Route path="/advisor" component={AdvisorContainer} />
          </Switch>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: ReduxState): MapToProps => ({
  language: state.config.get('language'),
  role: state.login.get('role'),
});

export default injectIntl(connect(mapStateToProps)(HomeContainer));
