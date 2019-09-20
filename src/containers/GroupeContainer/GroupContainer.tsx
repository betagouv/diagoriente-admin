import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
//import CompetencesChart from '../../component/Chart';
import {
  IGroup,
  createGroupParams,
  GetGroupParams,
  ListCompetencesParams,
  PatchGroupParams,
  EditComptenceParams,
  IUser,
  ListResponse
} from "requests";
import { ReduxState } from "reducers";
import { RouteComponentProps, matchPath } from "react-router-dom";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Location } from "history";

// components
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "../../component/Table/Tables";
import GroupForm from "../../component/Forms/groupForm";
import FullModal from "../../component/fullScreenModal/fullModal";
import ConfirmModal from "../../component/ConfirmModal/ConfirmModal";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

// actions
import listGroupActions from "../../reducers/group/listGroup";
import getGroupActions from "../../reducers/group/getGroup";
import patchGroupActions from "../../reducers/group/patchGroup";
import createGroupActions from "../../reducers/group/createGroup";

// utils
import { encodeUri, decodeUri } from "../../utils/url";
import { isEmpty } from "lodash";

const styles = () =>
  createStyles({
    center: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    fill: {
      height: "100%",
      width: "100%"
    },
    absolute: {
      position: "absolute",
      bottom: 0,
      top: 0,
      left: 0,
      right: 0
    },
    RowContainer1: {
      height: "100%",
      width: "60%",
      overflow: "scroll"
    },
    RowContainer2: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "35%",
      margin: 0,
      height: "100%",
      padding: 25
    },
    leftModalContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      flex: "1 1 50%",
      paddingLeft: 15
    }
  });

interface StyleProps extends WithStyles<typeof styles> {
  classes: {
    fill: string;
    center: string;
    absolute: string;
    RowContainer1: string;
    RowContainer2: string;
    leftModalContainer: string;
  };
}

interface MapToProps {
  fetching: boolean;
  groups: ListResponse<IGroup>;
  getGroupFetching: boolean;
  group: IGroup;
  getGroupError: string;
  editGroupFetching: boolean;
  editGroupError: string;
  createGroupFetching: boolean;
  createGroupError: string;
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  firstName: string;
  lastName: string;
  id: string;
}

interface DispatchToProps {
  getListGroup: (payload: ListCompetencesParams) => void;
  getGroup: (payload: GetGroupParams) => void;
  editGroup: (payload: PatchGroupParams) => void;
  createGroup: (payload: createGroupParams) => void;
}

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

interface State {
  open: boolean;
  openConfirm: boolean;
  currentSelectedId: string;
}
export const PER_PAGE = 5;

class GroupContainer extends Component<Props, State> {
  state: State = {
    open: false,
    openConfirm: false,
    currentSelectedId: ""
  };

  headers = [{ id: "title", title: "Titre" }];

  search: string = "";

  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getListGroup();
  }

  componentDidUpdate(props: Props) {
    const edit = this.isEdit(this.props.location);
    if (edit && !this.isEdit(props.location)) {
     // console.log("object", (edit.params as any).id);
      this.props.getGroup({ id: (edit.params as any).id });
    }

    if (
      !this.props.editGroupFetching &&
      props.editGroupFetching &&
      !this.props.editGroupError
    ) {
      this.getListGroup();
      this.props.history.push({
        pathname: "/groupes",
        search: this.props.location.search
      });
    }

    if (
      !this.props.createGroupFetching &&
      props.createGroupFetching &&
      !this.props.createGroupFetching
    ) {
      this.search = "";
      this.getListGroup({ page: 0 });
      this.setState({ open: false });
    }
  }
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  isEdit = (location: Location<any>) => 
      matchPath(location.pathname, {
      path: "/groupes/:id",
      exact: true
    });
    
  openCreateModal = () => {
    this.setState({ open: true });
    console.log('this.isEdit ',!this.isEdit);
  };

  closeCreateModal = () => {
    this.setState({ open: false });
  };

  openEditModal = (id: string) => {
    this.props.history.push({
      pathname: `/groupes/${id}`,
      search: this.props.location.search
    });
  };

  closeEditModal = () => {
    this.props.history.push({
      pathname: "/groupes",
      search: this.props.location.search
    });
  };

  /*  delete = (id: string) => {
    this.props.deleteCompetence({ id });
  }; */

  edit = (params: {
    title: string;
    advisorId: string;
    code: string;
    users: any[];
  }) => {
    const id = this.props.group._id;
    this.props.editGroup({ id, ...params });
  };

  create = (params: createGroupParams) => {
    this.props.createGroup(params);
  };

  /* openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  };

  YesDelete = (id: string) => {
    this.props.deleteCompetence({ id: this.state.currentSelectedId });
    this.setState({ openConfirm: false });
  };

  NoDelete = () => {
    this.setState({ openConfirm: false });
  }; */

  handlePageChange = (page: number) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page })
    });
    this.getListGroup({
      page
    });
  };

  handleSearch = (value: string) => {
    this.search = value;
    this.getListGroup({search: value});
  };

  resetInterests = () => {
    this.search = "";
    this.getListGroup();
  };

  getListGroup = (params: any = {}) => {
    this.props.getListGroup({
      ...params,
      advisorId: this.props.id
    });
  };

  renderModalContent = () => {
    if (this.props.getGroupFetching) {
      return <CircularProgress />;
    }

    return (
      <GroupForm
        firstName={this.props.firstName}
        lastName={this.props.lastName}
        id={this.props.id}
        onSubmitHandler={!this.isEdit(this.props.location)? this.create: this.edit}
        group={this.props.group}
      />
    );
  };

  render() {
    // console.log(this.props.id)
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
          rows={this.props.groups.data}
          edit={this.openEditModal}
          add={this.openCreateModal}
          rowsPerPage={this.props.perPage}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          count={this.props.count}
          handlePageChange={this.handlePageChange}
          reset={this.resetInterests}
          search={this.handleSearch}
          typeFilter={false}
          hasPagination={false}
          hasEdit={true}
          hasDelete={false}
          hasAdd={true}
        />

        <FullModal
          open={!!this.isEdit(this.props.location)}
          handleClose={this.closeEditModal}
          title="Modifier Compétence"
          fullScreen
        >
          <div className={this.props.classes.center}>
            {this.renderModalContent()}
          </div>
        </FullModal>
        <FullModal
          open={this.state.open}
          handleClose={this.closeCreateModal}
          title="Modifier Compétence"
          fullScreen
        >
          <div className={this.props.classes.center}>
            {this.renderModalContent()}
          </div>
        </FullModal>

        {/* <ConfirmModal
          open={this.state.openConfirm}
          YesButton={this.YesDelete}
          NoButton={this.NoDelete}
          close={this.NoDelete}
        /> */}
      </>
    );
  }
}

function mapStateToProps(state: ReduxState): MapToProps {
  const listGroup = state.groupe.get("listGroup");
  const getGroup = state.groupe.get("getGroup");
  const editGroup = state.groupe.get("patchGroup");
  const createGroup = state.groupe.get("createGroup");
  const firstName = state.login.get("firstName");
  const lastName = state.login.get("lastName");
  const id = state.login.get("_id");

  return {
    fetching: listGroup.get("fetching"),
    groups: listGroup.get("groups"),
    getGroupFetching: getGroup.get("fetching"),
    group: getGroup.get("group"),
    getGroupError: getGroup.get("error"),
    editGroupFetching: editGroup.get("fetching"),
    editGroupError: editGroup.get("error"),
    createGroupFetching: createGroup.get("fetching"),
    createGroupError: createGroup.get("error"),
    count: listGroup.get("groups").count,
    currentPage: listGroup.get("groups").currentPage,
    perPage: listGroup.get("groups").perPage,
    totalPages: listGroup.get("groups").totalPages,
    firstName,
    lastName,
    id
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    getListGroup: payload =>
      dispatch(listGroupActions.listGroupRequest(payload)),
    getGroup: payload => dispatch(getGroupActions.getGroupRequest(payload)),
    editGroup: payload =>
      dispatch(patchGroupActions.patchGroupRequest(payload)),
    createGroup: payload =>
      dispatch(createGroupActions.createGroupRequest(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GroupContainer));
