import React, { MouseEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import createStyles from '@material-ui/core/styles/createStyles';
import Input from '../inputs/input';
import Typography from '@material-ui/core/Typography';

interface Props {
    onSubmitHandler(params: { title: string }): void;
    header?: string;
    submitText?: string;
    classes: any;
    title?: string;
    buttonName?: string;
    fetching?: boolean;
}

class CreateQuestion extends React.Component<Props> {
    state = {
        submit: false,
        errorForQuestion: false,
        questionValue: this.props.title || '',
        questionError: '',
    };

    resetValues = () => {
        this.setState({
            submit: false,
            errorForQuestion: false,
            questionValue: '',
            questionError: '',
        });
    }

    // handle errors
    validateName = (value: string) => {
        // handle title error
        if (value === '') {
            return 'vous devez insérer un question';
        }
        return '';
    }

    // handle question changes
    handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        const questionError = this.validateName(e.currentTarget.value);
        this.setState({
            questionError,
            questionValue: e.currentTarget.value,
            errorForQuestion: !!questionError,
        });
    }
    // oncreate theme handler
    onSubmitHandler = (e: MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (this.state.questionValue) {
            this.props.onSubmitHandler({
                title: this.state.questionValue,
            });
        }
    }

    checkError = () => {
        return !!(
            this.state.questionError ||
            !this.state.questionValue
        );
    }

    public render(): JSX.Element {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                {this.props.fetching && (
                    <div
                        className={`${this.props.classes.absolute} ${
                            this.props.classes.center
                            }`}
                    >
                        <CircularProgress />
                    </div>
                )}
                <Typography variant="h4" gutterBottom className={classes.formTitle}>
                    {this.props.header}
                </Typography>
                <Grid
                    direction="column"
                    container
                    spacing={8}
                    alignItems="center"
                    justify="center"
                    className={this.props.classes.formContainer}
                >
                    <Grid className={this.props.classes.inputsContainer} item sm={8}>
                        <Input
                            placeholder="Question"
                            id="1"
                            label="Question"
                            InputIndication={this.state.questionError}
                            error={this.state.errorForQuestion}
                            value={this.state.questionValue}
                            onChangeInput={this.handleChangeQuestion}
                        />
                    </Grid>
                    <Grid className={classes.buttonContainer} item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={this.onSubmitHandler}
                            // disabled={this.checkError()}
                            className={classes.button}
                        >
                            {this.props.buttonName}
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}
const styles = () =>
    createStyles({
        card: {
            width: '100%',
            position: 'relative',
            flex: '0 0 auto',
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100% - 15px)',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: 15,
        },
        formTitle: {
            margin: 25,
        },
        button: {
            marginBottom: 30,
            marginRight: 'auto',
            marginLeft: 'auto',
            display: 'block',
        },
        close: {
            position: 'absolute',
            right: 15,
            top: 20,
        },
        buttonContainer: {
            flex: '1 1 auto',
            display: 'flex',
            alignItems: 'flex-end',
        },
        absolute: {
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
        },
        center: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        formContainer: {
            width: '100%',
            height: '100%',
        },
        inputsContainer: {
            width: '100%',
        },
    });

export interface QuestionFormComponent extends CreateQuestion { }

export default withStyles(styles)(CreateQuestion);
