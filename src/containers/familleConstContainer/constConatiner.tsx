import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Rank, CreateRankParams, ListRanksParams } from 'requests';
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

// actions
import listRanksActions from '../../reducers/familleRank/listRanks';
import createRanksActions from '../../reducers/familleRank/createRank';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import InterestModal from '../../component/Modal/InterestModal';
import { listRanks, createRank } from '../../requests/ranks';
import RankForm from '../../component/Forms/RanksForm';

// utils
import { encodeUri, decodeUri } from '../../utils/url';
import { string, number } from 'prop-types';

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
  });

interface StyleProps extends WithStyles<typeof styles> {
  classes: {
    fill: string;
    center: string;
    absolute: string;
  };
}

interface MapToProps {
  fetching: boolean;
  ranks: Rank[];
  // rank: Rank;
  createRankFetching: boolean;
  createRankError: string;
}

interface DispatchToProps {
  getListRank: (payload?: {}) => void;
  createRank: (payload: CreateRankParams) => void;
}

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

interface State {
  open: boolean;
  openConfirm: boolean;
  currentSelectedId: string;
  Ranks: { rank: number; pExpInt: number }[];
  createSuccess: boolean;
}
export const PER_PAGE = 5;

class ConstConatiner extends Component<Props, State> {
  state: State = {
    open: false,
    openConfirm: false,
    currentSelectedId: '',
    Ranks: [],
    createSuccess: false,
  };

  headers = [
    {
      id: 'rank',
      title: 'Famille',
    },
    { id: 'pExpInt', title: 'Valeur' },
  ];

  search: string = '';

  componentDidMount() {
    // const { page } = decodeUri(this.props.location.search);
    this.getListRank();
  }

  componentDidUpdate(props: Props, state: State) {
    if (this.state.createSuccess !== state.createSuccess) {
      this.getListRank();
      
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
      path: '/interests/:id',
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
      pathname: `/interests/${id}`,
      search: this.props.location.search,
    });
  }

  closeEditModal = () => {
    this.props.history.push({
      pathname: '/interests',
      search: this.props.location.search,
    });
  }

  create = (params: CreateRankParams) => {
    this.props.createRank(params);
  }

  handlePageChange = (page: number) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page }),
    });
    this.getListRank();
  }

  handleSearch = (value: string) => {
    this.search = value;
    this.getListRank();
  }

  resetInterests = () => {
    this.search = '';
    this.getListRank();
  }

  getListRank = async () => {
    const response: any = await listRanks()
      .then(response => {
        const data = response.data;
        data.sort((obj1: any, obj2: any) => obj1.rank - obj2.rank);
        this.setState({ Ranks: data });
      })
      .catch(e => console.log(e));
  }
  createRank = (params: CreateRankParams) => {
    const response: any = createRank(params)
      .then(response => {
        if (response.code === 200) {
          this.setState({ createSuccess: true , open: false });
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    // console.log(this.state.Ranks[0] && this.state.Ranks[0].pExpInt);
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
          rows={this.state.Ranks}
          add={this.openCreateModal}
          rowsPerPage={5}
          totalPages={1}
          currentPage={1}
          count={5}
          handlePageChange={this.handlePageChange}
          reset={this.resetInterests}
          search={this.handleSearch}
          typeFilter={false}
          hasDelete={false}
          hasEdit={false}
        />

        <FullModal
          open={this.state.open}
          handleClose={this.handleClose}
          title="Modifier Rang"
        >
          {this.state.Ranks && (
            <RankForm
              onSubmitHandler={this.createRank}
              buttonName="Modifier Rang"
              pExpInt1={this.state.Ranks[0] && this.state.Ranks[0].pExpInt}
              pExpInt2={this.state.Ranks[1] && this.state.Ranks[1].pExpInt}
              pExpInt3={this.state.Ranks[2] && this.state.Ranks[2].pExpInt}
              pExpInt4={this.state.Ranks[3] && this.state.Ranks[3].pExpInt}
              pExpInt5={this.state.Ranks[4] && this.state.Ranks[4].pExpInt}
              rank1={this.state.Ranks[0] && this.state.Ranks[0].rank}
              rank2={this.state.Ranks[1] && this.state.Ranks[1].rank}
              rank3={this.state.Ranks[2] && this.state.Ranks[2].rank}
              rank4={this.state.Ranks[3] && this.state.Ranks[3].rank}
              rank5={this.state.Ranks[4] && this.state.Ranks[4].rank}
            />
          )}
        </FullModal>
      </>
    );
  }
}

function mapStateToProps(state: ReduxState): MapToProps {
  const listRanks = state.ranks.get('listRanks');
  const createRanks = state.ranks.get('createRank');

  return {
    fetching: listRanks.get('fetching'),
    ranks: listRanks.get('ranks').data,
    createRankFetching: createRanks.get('fetching'),
    createRankError: createRanks.get('error'),
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    getListRank: payload =>
      dispatch(listRanksActions.listRanksRequest(payload)),

    createRank: payload =>
      dispatch(createRanksActions.createInterestRequest(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ConstConatiner));
