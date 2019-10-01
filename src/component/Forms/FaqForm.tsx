import React, { MouseEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import createStyles from '@material-ui/core/styles/createStyles';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { map } from 'lodash';
import Input from '../inputs/input';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
interface Props {
  onSubmitHandler(params: {
    rebrique: string;
    questions: { question: string; response: any }[];
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
  error: string;
  fields: [{ question: string; response: any }];
}

class FaqForm extends React.Component<Props> {
  state: State = {
    submit: false,
    rebrique: '',
    error: '',
    fields: [{ question: '', response: '' }],
  };

  convertHTMLtoEditorState(html: string): any {
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorState = EditorState.createWithContent(contentState);
      return editorState;
    }

    return EditorState.createEmpty();
  }

  valueToHtml = (value: any) => {
    const test = draftToHtml(convertToRaw(value.getCurrentContent()));
    return test;
  };
  componentDidUpdate(props: Props) {
    if (this.props.data && props.data !== this.props.data) {
      const formattedArray = this.props.data.questions.map((el: any) => {
        return {
          question: el.question,
          response: this.convertHTMLtoEditorState(el.response),
        };
      });
      this.setState({
        rebrique: this.props.data.rebrique,
        fields: formattedArray,
      });
    }
  }
  addInputField = () => {
    this.setState({
      fields: [...this.state.fields, { question: '', response: '' }],
    });
  }; // handle rebrique changes

  handleChangeRebrique = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ rebrique: e.target.value, error: '' });
  }; // handle question changes
  handleChangeQuestion = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    this.state.fields[index].question = e.target.value;
    this.setState({ fields: this.state.fields, error: '' });
  };

  // handle question changes
  onEditorStateChange = (value: any, index: number) => {
    const nextFiled = [...this.state.fields];
    nextFiled[index] = {
      ...nextFiled[index],
      response: value,
    };

    this.setState({ fields: nextFiled });
  };

  handelRemove = (index: number) => {
    this.state.fields.splice(index, 1);
    this.setState({ fields: this.state.fields });
  }; // oncreate theme handler

  onSubmit = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (this.state.rebrique !== '') {
      const error = this.state.fields.find((el: any) => {
        return el.question === '' || el.response === '';
      });
      if (error) {
        this.setState({
          error: !error.question
            ? 'Veuillez remplire tous question'
            : 'Veuillez remplire tous response',
        });
      } else {
        const formattedArray = map(this.state.fields, (el: any) => {
          return {
            question: el.question,
            response: this.valueToHtml(el.response),
          };
        });
        this.props.onSubmitHandler({
          rebrique: this.state.rebrique,
          questions: formattedArray,
        });
      }
    } else {
      this.setState({
        error: 'Rubrique est obligatoire',
      });
    }
  };

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
                
        {this.props.fetching && (
          <div
            className={`${this.props.classes.absolute} ${
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
            <div className={classes.error}>{this.state.error}</div>
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
                    editorStyle={{
                      height: 200,
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: 'gray',
                      marginBottom: 15,
                    }}
                    toolbarClassName="toolbar-class"
                    toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                    onEditorStateChange={(value: any) =>
                      this.onEditorStateChange(value, index)
                    }
                  />

                  {this.state.fields.length > 1 ? (
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={() => this.handelRemove(index)}
                        className={classes.button}>
                        Supprimer
                      </Button>
                    </div>
                  ) : null}
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
              Ajouter une question
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
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100% - 15px)',
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
      flex: '1 1 auto',
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
    editorWrapper: {
      marginTop: '1rem',
    },
    editor: {
      border: '1px solid #f1f1f1',
      height: '500px',
      padding: '1rem',
      overflow: 'scroll',
    },
    editorLinkPopup: {
      height: 'auto',
    },
    editorImagePopup: {
      left: '-100%',
    },
    error: {
      color: 'red',
      fontSize: 13,
    },
  });

export default withStyles(styles)(FaqForm);
