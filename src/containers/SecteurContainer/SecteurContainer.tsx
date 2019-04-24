import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import {
  ISecteur,
  CreateSecteurParams,
  DeleteSecteurParams,
  GetSecteurParams,
  ListSecteursParams,
  PatchSecteurParams,
  ListSecteursResponse,
  Response,
} from 'requests';
import { ReduxState } from 'reducers';
import { RouteComponentProps, matchPath } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Location } from 'history';

// components
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '../../component/Table/Tables';
import InterestForm from '../../component/Forms/interrestForm';
import FullModal from '../../component/fullScreenModal/fullModal';
import AutoComplete from '../../component/inputs/autoComplete';
import SecteurForm from '../../component/Forms/SecteurForm';
import ResourcesForm, {
  ResourcesFormComponent,
} from '../../component/Forms/resourcesForm';

// actions
import listSecteursActions from '../../reducers/secteur/listSecteurs';
import deleteSecteurActions from '../../reducers/secteur/deleteSecteur';
import getSecteurActions from '../../reducers/secteur/getSecteur';
import patchSecteursActions from '../../reducers/secteur/patchSecteur';
import createSecteursActions from '../../reducers/secteur/createSecteur';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import InterestModal from '../../component/Modal/InterestModal';

// utils
import { encodeUri, decodeUri } from '../../utils/url';
import { listSecteurs } from '../../requests';
import Grid from '@material-ui/core/Grid';

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
    RowContainer: {
      flexDirection: 'row',
      padding: '15px 40px',
      width: '100%',
      margin: 0,
    },
    leftModalContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      flex: '1 1 50%',
      paddingLeft: 15,
    },
  });

interface StyleProps extends WithStyles<typeof styles> {
  classes: {
    fill: string;
    center: string;
    absolute: string;
    RowContainer: string;
    leftModalContainer: string;
  };
}

interface MapToProps {
  fetching: boolean;
  secteurs: ISecteur[];
  deleteFetching: boolean;
  deleteError: string;
  getSecteurFetching: boolean;
  secteur: ISecteur;
  getSecteurError: string;
  editSecteurFetching: boolean;
  editSecteurError: string;
  createSecteurFetching: boolean;
  createSecteurError: string;
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  theme: {};
}

interface DispatchToProps {
  listSecteurs: (payload: ListSecteursParams) => void;
  deleteSecteur: (payload: DeleteSecteurParams) => void;
  getSecteur: (payload: GetSecteurParams) => void;
  editSecteur: (payload: PatchSecteurParams) => void;
  createSecteur: (payload: any) => void;
}

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

interface State {
  open: boolean;
  openConfirm: boolean;
  currentSelectedId: string;
}
export const PER_PAGE = 5;

class SecteurContainer extends Component<Props, State> {
  state: State = {
    open: false,
    openConfirm: false,
    currentSelectedId: '',
  };

  headers = [
    {
      id: 'title',
      title: 'Titre',
    },
    { id: 'type', title: 'Type' },
  ];

  search: string = '';

  resourcesForm: ResourcesFormComponent | null = null;

  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getListSecteur({ page, type: 'secteur' });
  }

  componentDidUpdate(props: Props) {
    if (
      !this.props.deleteFetching &&
      props.deleteFetching &&
      !this.props.deleteError
    ) {
      this.getListSecteur({ type: 'secteur' });
    }
    const edit = this.isEdit(this.props.location);
    if (edit && !this.isEdit(props.location)) {
      this.props.getSecteur({ id: (edit.params as any).id });

    }

    if (
      !this.props.editSecteurFetching &&
      props.editSecteurFetching &&
      !this.props.editSecteurError
    ) {
      this.getListSecteur({ type: 'secteur' });
      this.props.history.push({
        pathname: '/secteur',
        search: this.props.location.search,
      });
    }

    if (
      !this.props.createSecteurFetching &&
      props.createSecteurFetching &&
      !this.props.createSecteurError
    ) {
      this.search = '';
      this.getListSecteur({ page: 0, type: 'secteur' });
      this.setState({ open: false });
    }
  }
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  }
  isEdit = (location: Location<any>) =>
    matchPath(location.pathname, {
      path: '/secteur/:id',
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
      pathname: `/secteur/${id}`,
      search: this.props.location.search,
    });
    this.setState({ currentSelectedId: id });
  }

  closeEditModal = () => {
    this.props.history.push({
      pathname: '/secteur',
      search: this.props.location.search,
    });
  }

  delete = (id: string) => {
    this.props.deleteSecteur({ id });
  }

  edit = (params: CreateSecteurParams) => {
    const id = this.state.currentSelectedId;
    const node = this.resourcesForm;
    if (node) {
      const backgroundColor = node.state.background;
      const icon = node.state.file;
      this.props.editSecteur({
        id,
        icon,
        resources: {
          backgroundColor,
          color: backgroundColor,
        },
        ...params,
      });
    }
  }

  create = ({
    title,
    secteurChilds,
  }: CreateSecteurParams) => {
    const node = this.resourcesForm;

    if (node) {
      const backgroundColor = node.state.background;
      const icon = node.state.file;

      this.props.createSecteur({
        title,
        icon,
        secteurChilds,
        resources: { backgroundColor, color: backgroundColor },
      });
    }
  }

  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  }

  YesDelete = (id: string) => {
    this.props.deleteSecteur({ id: this.state.currentSelectedId });
    this.setState({ openConfirm: false });
  }

  NoDelete = () => {
    this.setState({ openConfirm: false });
  }

  handlePageChange = (page: number) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page }),
    });
    this.getListSecteur({
      page,
      type: 'secteur',
    });
  }

  handleSearch = (value: string) => {
    this.search = value;
    this.getListSecteur({ type: 'secteur' });
  }

  resetSecteurs = () => {
    this.search = '';
    this.getListSecteur({ type: 'secteur' });
  }

  getListSecteur = (params: ListSecteursParams = {}) => {
    this.props.listSecteurs({
      search: this.search,
      page: this.props.currentPage,
      perPage: PER_PAGE,
      type: 'secteur',
      ...params,
    });
  }
  captureResourceFormRef = (ref: any) => {
    this.resourcesForm = ref;
  }

  renderModalContent = () => {
    if (this.props.getSecteurFetching) {
      return <CircularProgress />;
    }
    const resourcesInitialValues = { ...this.props.secteur.secteur.resources };
    return (
      <Grid
        container
        spacing={16}
        className={`${this.props.classes.RowContainer}`}
        justify="space-between"
      >
        <SecteurForm
          submitText={'Modifier Secteur'}
          onSubmitHandler={this.edit}
          requestClose={this.closeEditModal}
          secteurChilds={this.props.secteur.data}
          title={this.props.secteur.secteur.title}
        />
        <div className={this.props.classes.leftModalContainer}>
          <ResourcesForm
            innerRef={this.captureResourceFormRef}
             {...resourcesInitialValues}
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
          rows={this.props.secteurs}
          delete={this.openModalDelete}
          edit={this.openEditModal}
          add={this.openCreateModal}
          rowsPerPage={this.props.perPage}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          count={this.props.count}
          handlePageChange={this.handlePageChange}
          reset={this.resetSecteurs}
          search={this.handleSearch}
          typeFilter={false}
        />

        <FullModal
          open={!!this.isEdit(this.props.location)}
          handleClose={this.closeEditModal}
          title="Modifier Secteur"
          fullScreen
        >
          <div
            className={`${this.props.classes.fill} ${
              this.props.classes.center
            }`}
          >
            {this.renderModalContent()}
          </div>
        </FullModal>
        <FullModal
          open={this.state.open}
          handleClose={this.handleClose}
          title="Créer Secteur"
          fullScreen
        >
          <div
            className={`${this.props.classes.fill} ${
              this.props.classes.center
            }`}
          >
            <Grid
              container
              spacing={16}
              className={`${this.props.classes.RowContainer}`}
              justify="space-between"
            >
              <SecteurForm
                submitText={'Créer Secteur'}
                onSubmitHandler={this.create}
                requestClose={this.closeEditModal}
              />
              <div className={this.props.classes.leftModalContainer}>
                <ResourcesForm
                  innerRef={this.captureResourceFormRef}
                  // {...resourcesInitialValues}
                />
              </div>
            </Grid>
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
  const listSecteurs = state.secteur.get('listSecteurs');
  const deleteSecteur = state.secteur.get('deleteSecteur');
  const getSecteur = state.secteur.get('getSecteur');
  const editSecteur = state.secteur.get('patchSecteur');
  const createSecteur = state.secteur.get('createSecteur');
  const getTheme = state.themes.get('getTheme');

  return {
    fetching: listSecteurs.get('fetching'),
    secteurs: listSecteurs.get('secteurs').data,
    deleteFetching: deleteSecteur.get('fetching'),
    deleteError: deleteSecteur.get('error'),
    getSecteurFetching: getSecteur.get('fetching'),
    secteur: getSecteur.get('secteur'),
    getSecteurError: getSecteur.get('error'),
    editSecteurFetching: editSecteur.get('fetching'),
    editSecteurError: editSecteur.get('error'),
    createSecteurFetching: createSecteur.get('fetching'),
    createSecteurError: createSecteur.get('error'),
    count: listSecteurs.get('secteurs').count,
    currentPage: listSecteurs.get('secteurs').currentPage,
    perPage: listSecteurs.get('secteurs').perPage,
    totalPages: listSecteurs.get('secteurs').totalPages,
    theme: getTheme.get('theme'),
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    listSecteurs: payload =>
      dispatch(listSecteursActions.listSecteursRequest(payload)),
    deleteSecteur: payload =>
      dispatch(deleteSecteurActions.deleteSecteurRequest(payload)),
    getSecteur: payload =>
      dispatch(getSecteurActions.getSecteurRequest(payload)),
    editSecteur: payload =>
      dispatch(patchSecteursActions.patchSecteurRequest(payload)),
    createSecteur: payload =>
      dispatch(createSecteursActions.createSecteurRequest(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SecteurContainer));
