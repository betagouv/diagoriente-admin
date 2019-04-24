import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import {
  Famille,
  CreateFamilleParams,
  DeleteFamilleParams,
  GetFamilleParams,
  ListFamillesParams,
  PatchFamilleParams,
  ListFamillesResponse,
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
import FamilleForm from '../../component/Forms/FamilleForm';

// actions
import listFamillesActions from '../../reducers/famille/listFamille';
import deleteFamilleActions from '../../reducers/famille/deleteFamille';
import getFamilleActions from '../../reducers/famille/getFamille';
import patchFamilleActions from '../../reducers/famille/patchFamille';
import createFamilleActions from '../../reducers/famille/createFamille';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';

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
  familles: Famille[];
  deleteFetching: boolean;
  deleteError: string;
  getFamilleFetching: boolean;
  famille: Famille;
  getFamilleError: string;
  editFamilleFetching: boolean;
  editFamilleError: string;
  createFamilleFetching: boolean;
  createFamilleError: string;
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;

}

interface DispatchToProps {
  listFamilles: (payload: ListFamillesParams) => void;
  deleteFamille: (payload: DeleteFamilleParams) => void;
  getFamille: (payload: GetFamilleParams) => void;
  editFamille: (payload: PatchFamilleParams) => void;
  createFamille: (payload: any) => void;
}

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

interface State {
  open: boolean;
  openConfirm: boolean;
  currentSelectedId: string;
}
export const PER_PAGE = 5;

class FamilleContainer extends Component<Props, State> {
  state: State = {
    open: false,
    openConfirm: false,
    currentSelectedId: '',
  };

  headers = [
    {
      id: 'nom',
      title: 'Titre',
    },
    { id: 'type', title: 'Type' },
  ];

  search: string = '';

  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getlistFamille({ page });
  }

  componentDidUpdate(props: Props) {
    if (
      !this.props.deleteFetching &&
      props.deleteFetching &&
      !this.props.deleteError
    ) {
      this.getlistFamille();
    }
    const edit = this.isEdit(this.props.location);
    if (edit && !this.isEdit(props.location)) {
      this.props.getFamille({ id: (edit.params as any).id });

    }

    if (
      !this.props.editFamilleFetching &&
      props.editFamilleFetching &&
      !this.props.editFamilleError
    ) {
      this.getlistFamille();
      this.props.history.push({
        pathname: '/famille',
        search: this.props.location.search,
      });
    }

    if (
      !this.props.createFamilleFetching &&
      props.createFamilleFetching &&
      !this.props.createFamilleError
    ) {
      this.search = '';
      this.getlistFamille();
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
      path: '/famille/:id',
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
      pathname: `/famille/${id}`,
      search: this.props.location.search,
    });
    this.setState({ currentSelectedId: id });
  }

  closeEditModal = () => {
    this.props.history.push({
      pathname: '/famille',
      search: this.props.location.search,
    });
  }

  delete = (id: string) => {
    this.props.deleteFamille({ id });
  }

  edit = (params: CreateFamilleParams) => {
    const id = this.props.famille._id;
    this.props.editFamille({ id, ...params });
  }

  create = (params: CreateFamilleParams) => {
    this.props.createFamille(params);
  }

  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  }

  YesDelete = (id: string) => {
    this.props.deleteFamille({ id: this.state.currentSelectedId });
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
    this.getlistFamille({
      page,
      type: 'secteur',
    });
  }

  handleSearch = (value: string) => {
    this.search = value;
    this.getlistFamille({ type: 'secteur' });
  }

  resetSecteurs = () => {
    this.search = '';
    this.getlistFamille({ type: 'secteur' });
  }

  getlistFamille = (params: ListFamillesParams = {}) => {
    this.props.listFamilles({
      search: this.search,
      page: this.props.currentPage,
      perPage: PER_PAGE,
      ...params,
    });
  }

  renderModalContent = () => {
    if (this.props.getFamilleFetching) {
      return <CircularProgress />;
    }
    return (
      <Grid
        container
        spacing={16}
        className={`${this.props.classes.RowContainer}`}
        justify="space-between"
      >
        {this.props.famille && (
          <FamilleForm
            submitText={'Modifier Famille'}
            onSubmitHandler={this.edit}
            requestClose={this.closeEditModal}
            interests={this.props.famille.interests}
            nom={this.props.famille.nom}
            hasEdit={true}
            photos={this.props.famille.resources}
            withPreview={false}
            idFamilly={this.state.currentSelectedId}
          />

        )}
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
          rows={this.props.familles}
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
          title="Modifier Famille"
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
          title="Créer Famille"
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
              <FamilleForm
                submitText={'creér Famille'}
                onSubmitHandler={this.create}
                requestClose={this.closeEditModal}
                withPreview
                idFamilly={this.state.currentSelectedId}
              />

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
  const listFamilles = state.famille.get('listFamilles');
  const deleteFamille = state.famille.get('deleteFamille');
  const getFamille = state.famille.get('getFamille');
  const editFamille = state.famille.get('patchFamille');
  const createFamille = state.famille.get('createFamille');
  const getTheme = state.themes.get('getTheme');

  return {
    fetching: listFamilles.get('fetching'),
    familles: listFamilles.get('familles').data,
    deleteFetching: deleteFamille.get('fetching'),
    deleteError: deleteFamille.get('error'),
    getFamilleFetching: getFamille.get('fetching'),
    famille: getFamille.get('famille'),
    getFamilleError: getFamille.get('error'),
    editFamilleFetching: editFamille.get('fetching'),
    editFamilleError: editFamille.get('error'),
    createFamilleFetching: createFamille.get('fetching'),
    createFamilleError: createFamille.get('error'),
    count: listFamilles.get('familles').count,
    currentPage: listFamilles.get('familles').currentPage,
    perPage: listFamilles.get('familles').perPage,
    totalPages: listFamilles.get('familles').totalPages,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    listFamilles: payload =>
      dispatch(listFamillesActions.listFamillesRequest(payload)),
    deleteFamille: payload =>
      dispatch(deleteFamilleActions.deleteFamilleRequest(payload)),
    getFamille: payload =>
      dispatch(getFamilleActions.getFamilleRequest(payload)),
    editFamille: payload =>
      dispatch(patchFamilleActions.patchFamilleRequest(payload)),
    createFamille: payload =>
      dispatch(createFamilleActions.createFamilleRequest(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(FamilleContainer));
