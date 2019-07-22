import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import {
  IContext,
  CreateContextParams,
  GetContextParams,
  ListContextsParams,
  PatchContextparams,
  ListContextResponse,
  Response,
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

// actions
import listContextActions from '../../reducers/context/listContext';
import getContextActions from '../../reducers/context/getContext';
import editContextActions from '../../reducers/context/patchContext';
import createContextActions from '../../reducers/context/createContext';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import FullModal from '../../component/fullScreenModal/fullModal';

// utils
import { encodeUri, decodeUri } from '../../utils/url';
import classNames from '../../utils/classNames';
import ContecxtForm from '../../component/Forms/ContextForm';
import { listContext } from '../../requests';

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
      width: '100%',
      height: '70%',
    },
    modalItem: {
      flex: '1 1 50%',
      alignItems: 'stretch',
    },
    modalLeft: {
      paddingRight: 15,
    },
    modalRight: {
      paddingLeft: 15,
    },
    modalContainer: {
      height: '90%',
      margin: 'auto',
      maxHeight: '100%',
    },
  });

interface StyleProps extends WithStyles<typeof styles> {
  classes: {
    fill: string;
    center: string;
    absolute: string;
    RowContainer: string;
    modalItem: string;
    modalLeft: string;
    modalRight: string;
    modalContainer: string;
  };
}

interface MapToProps {
  fetching: boolean;
  contexts: IContext[];
  getContextFetching: boolean;
  Context: IContext;
  getContextError: string;
  editContextFetching: boolean;
  editContextError: string;
  createContextFetching: boolean;
  createContextError: string;
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

interface DispatchToProps {
  getListContext: (payload: ListContextsParams) => void;
  getContext: (payload: GetContextParams) => void;
  editContext: (payload: PatchContextparams) => void;
  createContext: (payload: CreateContextParams) => void;
}

export const PER_PAGE = 5;

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

interface State {
  open: boolean;
  openConfirm: boolean;
  currentSelectedId: string;
}

class ContextContainer extends Component<Props, State> {
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
    { id: 'description', title: 'Description' },
  ];

  search: string = '';
  type: string = '';

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  }
  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getListContext();
    const edit = this.isEdit(this.props.location);
    if (edit) {
      this.props.getContext({ id: (edit.params as any).id });
    }
  }

  componentDidUpdate(props: Props) {
    const edit = this.isEdit(this.props.location);
    if (!this.isEdit(props.location) && edit) {
      this.props.getContext({ id: (edit.params as any).id });
    }

    if (
      !this.props.editContextFetching &&
      props.editContextFetching &&
      !this.props.editContextError
    ) {
      this.getListContext();
      this.props.history.push({
        pathname: '/context',
        search: this.props.location.search,
      });
    }

    if (
      !this.props.createContextFetching &&
      props.createContextFetching &&
      !this.props.createContextError
    ) {
      this.search = '';
      this.getListContext({ page: 1 });
      this.setState({ open: false });
    }
  }

  isEdit = (location: Location<any>) =>
    matchPath(location.pathname, {
      path: '/context/:id',
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
      pathname: `/context/${id}`,
      search: this.props.location.search,
    });
  }

  closeEditModal = () => {
    this.props.history.push({
      pathname: '/context',
      search: this.props.location.search,
    });
  }

  edit = (params: CreateContextParams) => {
    const id = this.props.Context._id;
    this.props.editContext({ id, ...params });
  }

  create = (params: CreateContextParams) => {
    this.props.createContext(params);
  }

  onChangeType = (type: string) => {
    this.type = type;
    this.getListContext();
  }

  handleSearch = (value: string) => {
    this.search = value;
    this.getListContext();
  }

  reset = () => {
    this.type = '';
    this.search = '';
    this.getListContext({ page: 1 });
  }

  handlePageChange = (page: number) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page }),
    });
    this.getListContext({
      page,
    });
  }

  getListContext = (params: ListContextsParams = {}) => {
    this.props.getListContext({
      perPage: PER_PAGE,
      page: this.props.currentPage,
      search: this.search,
      ...params,
    });
  }

  renderModalContent = () => {
    if (this.props.getContextFetching) {
      return (
        <div
          className={classNames(
            this.props.classes.fill,
            this.props.classes.center,
          )}
        >
          <CircularProgress />
        </div>
      );
    }

    const isEdit = this.isEdit(this.props.location);
    const props = isEdit ? this.props.Context : {};
    return (
      <Grid
        container
        spacing={16}
        className={`${this.props.classes.RowContainer}`}
        justify="space-between"
      >
        <div
          className={classNames(
            this.props.classes.modalItem,
            this.props.classes.modalLeft,
          )}
        >
          <ContecxtForm
            header={isEdit ? 'Modifier Contexte' : 'Créer Contexte'}
            submitText={isEdit ? 'Modifier Contexte' : 'Créer Contexte'}
            onSubmitHandler={!isEdit ? this.create : this.edit}
            requestClose={isEdit ? this.closeEditModal : this.closeCreateModal}
            title={isEdit ? this.props.Context.title : ''}
            description={isEdit ? this.props.Context.description : ''}
            {...props}
          />
        </div>
      </Grid>
    );
  }
  /*  clickme = async () => {
    const response: Response<ListContextResponse> = await listContext();
    console.log(response)
  } */

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
          rows={this.props.contexts}
          edit={this.openEditModal}
          add={this.openCreateModal}
          /* onChangeType={this.onChangeType} */
          search={this.handleSearch}
          reset={this.reset}
          typeFilter={false}
          rowsPerPage={this.props.perPage}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          count={this.props.count}
          handlePageChange={this.handlePageChange}
          hasDelete={false}
        />

        {/* <div>
          <button onClick={this.clickme}>click me</button>
        </div> */}
        <FullModal
          open={!!this.isEdit(this.props.location)}
          handleClose={this.closeEditModal}
          title="Modifier Contexte"
          maxWidth={'md'}
          modalStyle={this.props.classes.modalContainer}
        >
          <div
            className={this.props.classes.fill && this.props.classes.absolute}
          >
            {this.renderModalContent()}
          </div>
        </FullModal>

        <FullModal
          open={this.state.open}
          handleClose={this.handleClose}
          title="Créer Contexte"
          maxWidth={'md'}
          modalStyle={this.props.classes.modalContainer}
        >
          <Grid
            container
            spacing={16}
            className={this.props.classes.RowContainer}
            justify="space-between"
          >
            {this.renderModalContent()}
          </Grid>
        </FullModal>
      </>
    );
  }
}

function mapStateToProps(state: ReduxState): MapToProps {
  const getContext = state.Context.get('getContext');
  const editContext = state.Context.get('patchContext');
  const createContext = state.Context.get('createContext');
  const listContext = state.Context.get('listContext');

  return {
    fetching: listContext.get('fetching'),
    contexts: listContext.get('contexts').data,
    getContextFetching: getContext.get('fetching'),
    Context: getContext.get('context'),
    getContextError: getContext.get('error'),
    editContextFetching: editContext.get('fetching'),
    editContextError: editContext.get('error'),
    createContextFetching: createContext.get('fetching'),
    createContextError: createContext.get('error'),
    count: listContext.get('contexts').count,
    currentPage: listContext.get('contexts').currentPage,
    perPage: listContext.get('contexts').perPage,
    totalPages: listContext.get('contexts').totalPages,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    getListContext: payload =>
      dispatch(listContextActions.listContextRequest(payload)),
    getContext: payload =>
      dispatch(getContextActions.getContextRequest(payload)),
    editContext: payload =>
      dispatch(editContextActions.patchContextRequest(payload)),
    createContext: payload =>
      dispatch(createContextActions.createContextRequest(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ContextContainer));
