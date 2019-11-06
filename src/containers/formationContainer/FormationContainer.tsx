import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import moment from 'moment';
import { Iadvisor, ListAdvisorsParams, DeleteAdvisorParams, GetAdvisorParams, CreateAdvisorParams, PatchAdvisorParams } from 'requests';
// redux and material styles
import { ReduxState } from 'reducers';
import { RouteComponentProps, matchPath } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Location } from 'history';
// actions
import listAdvisorsActions from '../../reducers/Advisor/listAdvisors';
import getAdvisorActions from '../../reducers/Advisor/getAdvisor';
import deleteAdvisorActions from '../../reducers/Advisor/deleteAdvisor';
import createAdvisorActions from '../../reducers/Advisor/createAdvisor';
import patchAdvisorActions from '../../reducers/Advisor/patchAdvisor';
// components
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '../../component/Table/Tables';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import FullModal from '../../component/fullScreenModal/fullModal';
import AdvisorForm, { AdvisorFormComponent } from '../../component/Forms/AdvisorForm';
// utils
import { encodeUri, decodeUri } from '../../utils/url';
const styles = () =>
  createStyles({
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fill: {
      height: '100%',
      width: '100%',
    },
    absolute: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
    },
    progress: {
      height: 100,
    },
  });

interface StyleProps extends WithStyles<typeof styles> {
  classes: {
    fill: string;
    center: string;
    absolute: string;
    progress: string;
  };
}
export const PER_PAGE = 5;

type Props = RouteComponentProps & StyleProps;

class FormationContainer extends Component<Props> {
  render(): JSX.Element {
    return (
      <div>
        <iframe src={'https://diagoriente.beta.gouv.fr/formation-diagoriente'} style={{ height: '86vh', width: '73vw' }} />
      </div>
    );
  }
}

export default withStyles(styles)(FormationContainer);
