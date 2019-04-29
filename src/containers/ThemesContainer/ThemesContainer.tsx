import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { isEmpty } from 'lodash';
import {
  ListThemesParams,
  Theme,
  DeleteThemeParams,
  GetThemeParams,
  PatchThemeParams,
  CreateThemeParams,
  CreateActivityParams,
  ISecteur,
  ListSecteursParams,
} from 'requests';
import { ReduxState } from 'reducers';
import { RouteComponentProps, matchPath } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Location } from 'history';
import Grid from '@material-ui/core/Grid';

// components
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '../../component/Table/Tables';
import CreateTheme, { SubmitParams } from '../../component/Forms/createTheme';
import IconVerified from '../../component/Icons/IconVerified';
import IconNotVerified from '../../component/Icons/IconNotVerified';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import FullModal from '../../component/fullScreenModal/fullModal';
import ActivityForm, {
  ActivityFormComponent,
} from '../../component/Forms/activityForm';
import ResourcesForm, {
  ResourcesFormComponent,
} from '../../component/Forms/resourcesForm';

// actions
import listThemesActions from '../../reducers/themes/listThemes';
import deleteThemeActions from '../../reducers/themes/deleteTheme';
import getThemeActions from '../../reducers/themes/getTheme';
import editThemeActions from '../../reducers/themes/patchTheme';
import createThemeActions from '../../reducers/themes/createTheme';
import createActivityActions from '../../reducers/activities/createActivity';
import listSecteursActions from '../../reducers/secteur/listSecteurs';

// utils
import { encodeUri, decodeUri } from '../../utils/url';
import classNames from '../../utils/classNames';

const styles = () =>
  createStyles({
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fill: {
      width: '100%',
    },
    absolute: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
    },
    RowContainer: {
      flexDirection: 'row',
      padding: '15px 40px',
      width: '100%',
      margin: 0,
    },
    ColumnContainer: {
      margin: 25,
    },
    leftModalContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      flex: '1 1 50%',
      paddingLeft: 15,
    },
    absoluteFill: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

interface StyleProps extends WithStyles<typeof styles> {
  classes: {
    fill: string;
    center: string;
    absolute: string;
    ColumnContainer: string;
    RowContainer: string;
    leftModalContainer: string;
    absoluteFill: string;
  };
}

interface MapToProps {
  fetching: boolean;
  themes: Theme[];
  deleteFetching: boolean;
  deleteError: string;
  getThemeFetching: boolean;
  theme: Theme;
  getThemeError: string;
  editThemeFetching: boolean;
  editThemeError: string;
  createThemeFetching: boolean;
  createThemeError: string;
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  createActivityFetching: boolean;
  createActivityError: string;
  secteurs: { _id: string; title: string }[];
}

interface DispatchToProps {
  getListThemes: (payload: ListThemesParams) => void;
  deleteTheme: (payload: DeleteThemeParams) => void;
  getTheme: (payload: GetThemeParams) => void;
  editTheme: (payload: PatchThemeParams) => void;
  createTheme: (payload: CreateThemeParams) => void;
  createActivity: (payload: CreateActivityParams) => void;
  listSecteurs: (payload: ListSecteursParams) => void;
}

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

interface State {
  open: boolean;
  openConfirm: boolean;
  currentSelectedId: string;
  openActivities: boolean;
}

export const PER_PAGE = 20;

class ThemesContainer extends Component<Props, State> {
  state: State = {
    open: false,
    openConfirm: false,
    currentSelectedId: '',
    openActivities: false,
  };

  headers = [
    {
      id: 'title',
      title: 'Titre',
    },
    { id: 'type', title: 'Type' },
    {
      id: 'verified',
      title: 'Visible',
      render: (value: boolean) => {
        if (value) {
          return <IconVerified />;
        }
        return <IconNotVerified />;
      },
    },
    {
      id: 'description',
      title: 'Description',
    },
    {
      id: 'activities',
      title: 'Nombre activités',
      render: (row: any) => row.length || 0,
    },
  ];

  resourcesForm: ResourcesFormComponent | null = null;
  activityForm: ActivityFormComponent | null = null;

  search: string = '';
  type: string =  'personal' || 'professional';

  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getListThemes({ page, type:'' });
    const edit = this.isEdit(this.props.location);
    if (edit) {
      this.props.getTheme({ id: (edit.params as any).id });
    }
    this.props.listSecteurs({
      type: 'secteur',
    });
  }

  componentDidUpdate(props: Props) {
    if (
      !this.props.deleteFetching &&
      props.deleteFetching &&
      !this.props.deleteError
    ) {
      this.getListThemes();
    }

    const edit = this.isEdit(this.props.location);
    if (edit && !this.isEdit(props.location)) {
      this.props.getTheme({ id: (edit.params as any).id });
    }

    const showActiv = this.showActivities(this.props.location);
    if (showActiv && !this.showActivities(props.location)) {
      this.props.getTheme({ id: (showActiv.params as any).id });
    }

    if (
      !this.props.editThemeFetching &&
      props.editThemeFetching &&
      !this.props.editThemeError
    ) {
      this.getListThemes();
      this.props.history.push({
        pathname: '/themes',
        search: this.props.location.search,
      });
    }

    if (
      !this.props.createThemeFetching &&
      props.createThemeFetching &&
      !this.props.createThemeError
    ) {
      this.handleReset();
      this.setState({ open: false });
    }

    if (
      !this.props.createActivityFetching &&
      props.createActivityFetching &&
      !this.props.createActivityError &&
      this.activityForm
    ) {
      this.activityForm.resetValues();
    }
  }

  isEdit = (location: Location) =>
    matchPath(location.pathname, {
      path: '/themes/:id',
      exact: true,
    })
  showActivities = (location: Location) =>
    matchPath(location.pathname, {
      path: '/themes/activity/:id',
      exact: true,
    })
  openCreateModal = () => {
    this.setState({ open: true });
  }

  closeCreateModal = () => {
    this.setState({ open: false });
  }

  openEditModal = (id: string) => {
    this.props.history.push({
      pathname: `/themes/${id}`,
      search: this.props.location.search,
    });
  }

  closeEditModal = () => {
    this.props.history.push({
      pathname: '/themes',
      search: this.props.location.search,
    });
  }
  openActivitiesModal = (id: string) => {
    this.setState({ openActivities: true });
    this.props.history.push({
      pathname: `/themes/activity/${id}`,
      search: this.props.location.search,
    });
  }
  handleCloseActivities = () => {
    this.setState({ openActivities: false });
    this.props.history.push({
      pathname: '/themes',
      search: this.props.location.search,
    });
  }

  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  }
  YesDelete = (id: string) => {
    this.props.deleteTheme({ id: this.state.currentSelectedId });
    this.setState({ openConfirm: false });
  }
  NoDelete = () => {
    this.setState({ openConfirm: false });
  }

  edit = ({
    title,
    description,
    type,
    verified,
    activities,
    parentId,
  }: SubmitParams) => {
    const id = this.props.theme._id;
    const node = this.resourcesForm;
    if (node) {
      const backgroundColor = node.state.background;
      const icon = node.state.file;
      /*  const formData = new FormData();
      formData.append('color', backgroundColor);
      formData.append('backgroundColor', backgroundColor); */
      this.props.editTheme({
        id,
        type,
        icon,
        parentId,
        verified,
        title,
        description,
        activities,
        resources: {
          backgroundColor,
          color: backgroundColor,
        },
      });
    }
  }
  create = ({
    title,
    description,
    type,
    verified,
    activities,
    parentId,
  }: SubmitParams) => {
    const node = this.resourcesForm;
    if (node) {
      const backgroundColor = node.state.background;
      const icon = node.state.file;
      this.props.createTheme({
        title,
        description,
        type,
        parentId,
        verified,
        activities,
        icon,
        resources: {
          color: backgroundColor,
          backgroundColor,
        },
      });
    }
  }

  handlePageChange = (page: number) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page }),
    });
    this.getListThemes({
      page,
    });
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  }
  searchThemes = () => {
    const searchResult = this.getListThemes();
    return searchResult;
  }
  onChangeType = (type: string) => {
    this.props.history.push({
      pathname: `/themes/filter/${type}`,
      search: this.props.location.search,
    });
    this.type = type;
    this.getListThemes();
  }

  handleSearch = (value: string) => {
    this.search = value;
    this.getListThemes();
  }

  handleReset = () => {
    this.search = '';
    this.type = '';
    this.getListThemes({ page: 1 });
  }

  createActivity = (params: CreateActivityParams) => {
    this.props.createActivity(params);
  }

  getListThemes = (params: ListThemesParams = {}) => {
    this.props.getListThemes({
      perPage: PER_PAGE,
      search: this.search,
      page: this.props.currentPage,
      type: this.type,
      ...params,
    });
  }
  captureResourceFormRef = (ref: any) => {
    this.resourcesForm = ref;
  }

  captureActivityFormRef = (ref: ActivityFormComponent) => {
    this.activityForm = ref;
  }

  renderModalContent = () => {
    if (this.props.getThemeFetching) {
      return (
        <div
          className={classNames(
            this.props.classes.absoluteFill,
            this.props.classes.center,
          )}
        >
          <CircularProgress />
        </div>
      );
    }
    const isEdit = !!this.isEdit(this.props.location);
    const initialValues = isEdit ? { ...this.props.theme } : {};
    const resourcesInitialValues = isEdit
      ? { ...this.props.theme.resources }
      : {};
    return (
      <Grid
        container
        spacing={16}
        className={`${this.props.classes.RowContainer}`}
        justify="space-between"
      >
        <CreateTheme
          header={isEdit ? 'Modifier Theme' : 'Crée Theme'}
          submitText={isEdit ? 'Modifier Theme' : 'Crée Theme'}
          onSubmitHandler={isEdit ? this.edit : this.create}
          requestClose={this.closeEditModal}
          {...initialValues}
          secteur={this.props.secteurs}
          selectedSecteur={this.props.theme.parentId}
        />
        <div className={this.props.classes.leftModalContainer}>
          <ResourcesForm
            innerRef={this.captureResourceFormRef}
            {...resourcesInitialValues}
          />
          <ActivityForm
            header={'Crée Activité'}
            submitText={'Crée Activité'}
            onSubmitHandler={this.createActivity}
            requestClose={this.closeEditModal}
            verified={true}
            innerRef={this.captureActivityFormRef}
            fetching={this.props.createActivityFetching}
            showInterest={false}
          />
        </div>
      </Grid>
    );
  }

  render() {
    return (
      <>
        {this.props.fetching && (
          <div
            className={`${this.props.classes.absolute} ${
              this.props.classes.center
            }`}
          >
            <CircularProgress />
          </div>
        )}
        <Table
          headers={this.headers}
          rows={this.props.themes}
          delete={this.openModalDelete}
          edit={this.openEditModal}
          add={this.openCreateModal}
          search={this.handleSearch}
          onChangeType={this.onChangeType}
          typeFilter
          rowsPerPage={this.props.perPage}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          count={this.props.count}
          handlePageChange={this.handlePageChange}
          reset={this.handleReset}
        />
        {/* // edit theme modal */}
        <FullModal
          open={!!this.isEdit(this.props.location)}
          handleClose={this.closeEditModal}
          title="Modifier thème"
          fullScreen
        >
          <div className={this.props.classes.fill}>
            {this.renderModalContent()}
          </div>
        </FullModal>
        {/*  cree theme modal */}
        <FullModal
          open={this.state.open}
          handleClose={this.handleClose}
          title="Créer Des thèmes"
          fullScreen
        >
          <div className={this.props.classes.fill}>
            {this.renderModalContent()}
          </div>
        </FullModal>

        <ConfirmModal
          open={this.state.openConfirm}
          YesButton={this.YesDelete}
          NoButton={this.NoDelete}
          close={this.NoDelete}
        />
      </>
    );
  }
}

function mapStateToProps(state: ReduxState): MapToProps {
  const listThemes = state.themes.get('listThemes');
  const deleteThemes = state.themes.get('deleteTheme');
  const getThemes = state.themes.get('getTheme');
  const editTheme = state.themes.get('patchTheme');
  const createTheme = state.themes.get('createTheme');
  const createActivity = state.activities.get('createActivity');
  const listSecteurs = state.secteur.get('listSecteurs');

  return {
    fetching: listThemes.get('fetching'),
    themes: listThemes.get('themes').data,
    deleteFetching: deleteThemes.get('fetching'),
    deleteError: deleteThemes.get('error'),
    getThemeFetching: getThemes.get('fetching'),
    theme: getThemes.get('theme'),
    getThemeError: getThemes.get('error'),
    editThemeFetching: editTheme.get('fetching'),
    editThemeError: editTheme.get('error'),
    createThemeFetching: createTheme.get('fetching'),
    createThemeError: createTheme.get('error'),
    count: listThemes.get('themes').count,
    currentPage: listThemes.get('themes').currentPage,
    perPage: listThemes.get('themes').perPage,
    totalPages: listThemes.get('themes').totalPages,
    createActivityFetching: createActivity.get('fetching'),
    createActivityError: createActivity.get('error'),
    secteurs: listSecteurs.get('secteurs').data,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    getListThemes: (payload: ListThemesParams) =>
      dispatch(listThemesActions.listThemesRequest(payload)),
    deleteTheme: payload =>
      dispatch(deleteThemeActions.deleteThemeRequest(payload)),
    getTheme: payload => dispatch(getThemeActions.getThemeRequest(payload)),
    editTheme: payload => dispatch(editThemeActions.patchThemeRequest(payload)),
    createTheme: payload =>
      dispatch(createThemeActions.createThemeRequest(payload)),
    createActivity: payload =>
      dispatch(createActivityActions.createActivityRequest(payload)),
    listSecteurs: payload =>
      dispatch(listSecteursActions.listSecteursRequest(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ThemesContainer));
