import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import {
    Question,
    CreateQuestionParams,
    DeleteQuestionParams,
    GetQuestionParams,
    ListQuestionsParams,
    EditQuestionParams,
} from 'requests';
import { ReduxState } from 'reducers';
import { RouteComponentProps, matchPath } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Location } from 'history';

// components
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '../../component/Table/Tables';
import FullModal from '../../component/fullScreenModal/fullModal';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import QuestionForm from '../../component/Forms/questionForm';

// actions
import deleteQuestionActions from '../../reducers/Questions/deleteQuestion';
import getQuestionsActions from '../../reducers/Questions/getQuestions';
import createQuestionsActions from '../../reducers/Questions/createQuestion';
import editQuestionsActions from '../../reducers/Questions/editQuestion';
import listQuestionsActions from '../../reducers/Questions/listQuestion';

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
    questions: Question[];
    deleteFetching: boolean;
    deleteError: string;
    getQuestionsFetching: boolean;
    question: Question;
    getQuestionsError: string;
    editQuestionFetching: boolean;
    editQuestionError: string;
    createQuestionFetching: boolean;
    createQuestionError: string;
    count: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
}

interface DispatchToProps {
    getListQuestion: (payload: ListQuestionsParams) => void;
    deleteQuestion: (payload: DeleteQuestionParams) => void;
    getQuestion: (payload: GetQuestionParams) => void;
    editQuestion: (payload: EditQuestionParams) => void;
    createQuestion: (payload: CreateQuestionParams) => void;
}
type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

interface State {
    open: boolean;
    openConfirm: boolean;
    currentSelectedId: string;
}

export const PER_PAGE = 5;

class QuestionContainer extends Component<Props, State> {
    state: State = {
        open: false,
        openConfirm: false,
        currentSelectedId: '',
    };

    headers = [

        { id: 'title', title: 'Titre' },
    ];

    search: string = '';

    componentDidMount() {
        const { page } = decodeUri(this.props.location.search);
        this.getListQuestion({ page });
    }
    componentDidUpdate(props: Props) {
        if (
            !this.props.deleteFetching &&
            props.deleteFetching &&
            !this.props.deleteError
        ) {
            this.getListQuestion();
        }
        const edit = this.isEdit(this.props.location);
        if (edit && !this.isEdit(props.location)) {
            this.props.getQuestion({ id: (edit.params as any).id });
        }

        if (
            !this.props.editQuestionFetching &&
            props.editQuestionFetching &&
            !this.props.editQuestionError
        ) {
            this.getListQuestion();
            this.props.history.push({
                pathname: '/questions',
                search: this.props.location.search,
            });
        }

        if (
            !this.props.createQuestionFetching &&
            props.createQuestionFetching &&
            !this.props.createQuestionError
        ) {
            this.search = '';
            this.getListQuestion({ page: 0 });
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
            path: '/questions/:id',
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
            pathname: `/questions/${id}`,
            search: this.props.location.search,
        });
    }

    closeEditModal = () => {
        this.props.history.push({
            pathname: '/questions',
            search: this.props.location.search,
        });
    }



    delete = (id: string) => {
        this.props.deleteQuestion({ id });
    }

    edit = (params: CreateQuestionParams) => {
        const id = this.props.question._id;
        this.props.editQuestion({ id, ...params });
    }

    create = (params: CreateQuestionParams) => {
        this.props.createQuestion(params);
    }

    openModalDelete = (id: string) => {
        this.setState({ openConfirm: true, currentSelectedId: id });
    }

    YesDelete = (id: string) => {
        this.props.deleteQuestion({ id: this.state.currentSelectedId });
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
        this.getListQuestion({
            page,
        });
    }
    handleSearch = (value: string) => {
        this.search = value;
       
    }

    resetInterests = () => {
        this.search = '';
        this.getListQuestion();
    }
    getListQuestion = (params: ListQuestionsParams = {}) => {
        this.props.getListQuestion({
            search: this.search,
            page: 1,
            perPage: 5,
            ...params,
        });
    }
    renderModalContent = () => {
        if (this.props.getQuestionsFetching) {
            return <CircularProgress />;
        }
        return (
            <QuestionForm
                submitText={'Modifier question'}
                onSubmitHandler={this.edit}
                title={this.props.question.title}
                buttonName="Modifier question"
            />
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
                    rows={this.props.questions}
                    delete={this.openModalDelete}
                    edit={this.openEditModal}
                    add={this.openCreateModal}
                    rowsPerPage={10}
                    hasDelete={false}
                    hasEdit={true}
                    totalPages={1}
                    currentPage={1}
                    count={this.props.questions.length}
                    handlePageChange={this.handlePageChange}
                    reset={this.resetInterests}
                    search={this.handleSearch}
                    typeFilter={false}
                />

                <FullModal
                    open={!!this.isEdit(this.props.location)}
                    handleClose={this.closeEditModal}
                    title="Modifier question"
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
                    title="Créer Question"
                >
                    <QuestionForm
                        onSubmitHandler={this.create}
                        buttonName="Créer question"
                    />
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
    const listQuestions = state.questions.get('listQuestion');
    const deleteQuestions = state.questions.get('deleteQuestion');
    const getQuestion = state.questions.get('getQuestion');
    const editQuestions = state.questions.get('editQuestion');
    const createQuestions = state.questions.get('createQuestion');
    return {
        fetching: listQuestions.get('fetching'),
        questions: listQuestions.get('questions'),
        deleteFetching: deleteQuestions.get('fetching'),
        deleteError: deleteQuestions.get('error'),
        getQuestionsFetching: getQuestion.get('fetching'),
        question: getQuestion.get('question'),
        getQuestionsError: getQuestion.get('error'),
        editQuestionError: editQuestions.get('error'),
        editQuestionFetching: editQuestions.get('fetching'),
        createQuestionFetching: createQuestions.get('fetching'),
        createQuestionError: createQuestions.get('error'),
        count: listQuestions.get('questions').count,
        currentPage: listQuestions.get('questions').currentPage,
        perPage: listQuestions.get('questions').perPage,
        totalPages: listQuestions.get('questions').totalPages,
    };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
    return {
        getListQuestion: payload =>
            dispatch(listQuestionsActions.listQuestionsRequest(payload)),
        deleteQuestion: payload =>
            dispatch(deleteQuestionActions.deleteQuestionRequest(payload)),
        getQuestion: payload =>
            dispatch(getQuestionsActions.getQuestionRequest(payload)),
        editQuestion: payload =>
            dispatch(editQuestionsActions.editQuestionRequest(payload)),
        createQuestion: payload =>
            dispatch(createQuestionsActions.createQuestionRequest(payload)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(QuestionContainer));