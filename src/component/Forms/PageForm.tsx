import React, { MouseEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import createStyles from '@material-ui/core/styles/createStyles';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Input from '../inputs/input';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { map } from 'lodash';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
interface Props {
  onSubmitHandler(params: {
    title: string;
    type: string;
    page: { text: string }[];
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
  error: string;
  title: string;
  type: string;
  page: { text: string }[];
}

class PageForm extends React.Component<Props> {
  state: State = {
    submit: false,
    error: '',
    title: '',
    type: '',
    page: [{ text: '' }],
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
      const formattedArray = this.props.data.page.map((el: any) => {
        console.log(el);
        return {
          text: this.convertHTMLtoEditorState(el.text),
        };
      });
      this.setState({
        title: this.props.data.title,
        type: this.props.data.type,
        page: formattedArray,
      });
    }
  }
  addInputField = () => {
    this.setState({
      page: [...this.state.page, { text: '' }],
    });
  };
  handleChangeRebrique = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value, error: '' });
  };
  handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ type: e.target.value, error: '' });
  };
  // handle question changes
  onEditorStateChange = (value: any, index: number) => {
    const nextFiled = [...this.state.page];
    nextFiled[index] = {
      ...nextFiled[index],
      text: value,
    };
    this.setState({ page: nextFiled });
  };

  handelRemove = (index: number) => {
    this.state.page.splice(index, 1);
    this.setState({ page: this.state.page });
  }; // oncreate theme handler

  onSubmit = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (this.state.page.length !== 0) {
      const error = this.state.page.find((el: any) => {
        return el.text === '';
      });
      if (error) {
        this.setState({
          error: 'Veuillez remplire le champs text',
        });
      } else {
        const formattedArray = map(this.state.page, (el: any) => {
          return {
            text: this.valueToHtml(el.text),
          };
        });
        this.props.onSubmitHandler({
          title: this.state.title,
          type: this.state.type,
          page: formattedArray,
        });
      }
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
              placeholder="Type"
              id="0"
              label="Type"
              value={this.state.type}
              onChangeInput={this.handleChangeType}
              name={this.state.type}
            />
            <Input
              placeholder="Title"
              id="0"
              label="Title"
              value={this.state.title}
              onChangeInput={this.handleChangeRebrique}
              name={this.state.title}
            />
            {this.state.page.map((field, index) => {
              console.log(field)
              return (
                <div key={index}>
                  <Editor
                    editorState={field.text}
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

                  {this.state.page.length > 1 ? (
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
              Ajouter
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

export default withStyles(styles)(PageForm);
