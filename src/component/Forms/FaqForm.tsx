import React, { MouseEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import createStyles from '@material-ui/core/styles/createStyles';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import Input from '../inputs/input';

interface Props {
  onSubmitHandler(params: {
    rebrique: string;
    questions: [{ question: string; response: any }];
  }): void;
  header?: string;
  submitText?: string;
  classes: any;
  data?: any;
  buttonName?: string;
  fetching?: boolean;
}
interface State {
  submit: boolean;
  rebrique: string;
  fields: [{ question: string; response: any }];
}

class FaqForm extends React.Component<Props> {
  state: State = {
    submit: false,
    rebrique: '',
    fields: [{ question: '', response: EditorState.createEmpty() }],
  };

  componentDidUpdate(props: Props) {
    if (this.props.data && props.data !== this.props.data) {
      this.setState({
        rebrique: this.props.data.rebrique,
        fields: this.props.data.questions,
      });
    }
  }
  addInputField = () => {
    this.setState({
      fields: [...this.state.fields, { question: '', response: '' }],
    });
  };

  // handle rebrique changes
  handleChangeRebrique = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ rebrique: e.target.value });
  };
  // handle question changes
  handleChangeQuestion = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    this.state.fields[index].question = e.target.value;
    this.setState({ fields: this.state.fields });
  };
  // handle question changes
  onEditorStateChange = (value: any, index: number) => {
    const nextFiled = [...this.state.fields];
    nextFiled[index] = { ...nextFiled[index], response: value };
    this.setState({ fields: nextFiled });
  };

  handelRemove = (index: number) => {
    this.state.fields.splice(index, 1);
    this.setState({ fields: this.state.fields });
  };

  // oncreate theme handler
  onSubmit = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (this.state.fields) {
      this.props.onSubmitHandler({
        rebrique: this.state.rebrique,
        questions: this.state.fields,
      });
    }
  };

  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        {this.props.fetching && (
          <div
            className={`${this.props.classes.absolute} ${
              this.props.classes.center
            }`}>
            <CircularProgress />
          </div>
        )}
        <Grid
          direction="column"
          container
          spacing={8}
          alignItems="center"
          justify="center"
          className={this.props.classes.formContainer}>
          <Grid className={this.props.classes.inputsContainer} item sm={8}>
            <Input
              placeholder="Rubrique"
              id="0"
              label="Rubrique"
              value={this.state.rebrique}
              onChangeInput={this.handleChangeRebrique}
              name={this.state.rebrique}
            />
            {this.state.fields.map((field, index) => {
              return (
                <div key={index}>
                  <Input
                    placeholder="question"
                    id={index.toString()}
                    label="Question"
                    value={field.question}
                    onChangeInput={(e) => this.handleChangeQuestion(e, index)}
                    name={field.question}
                  />
                  <Editor
                    editorState={field.response}
                    editorStyle={{ height: 250, border: '1px solid gray' }}
                    toolbarClassName="toolbar-class"
                    toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                    onEditorStateChange={(value) =>
                      this.onEditorStateChange(value, index)
                    }
                  />

                  {this.props.data && (
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={() => this.handelRemove(index)}
                        className={classes.button}>
                        supprimer
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </Grid>
          <Grid className={classes.buttonContainer} item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.addInputField}
              className={classes.button}>
              Ajouter une question
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.onSubmit}
              className={classes.button}>
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
      marginBottom: 20,
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
      alignItems: 'baseline',
      justifyContent: 'space-between',
      width: '100%',
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

export default withStyles(styles)(FaqForm);
