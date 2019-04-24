import React from 'react';
import { Response, ListThemesResponse, Theme } from 'requests';
import { listSecteurs, listThemes } from '../../requests';
import AutoComplete from '../inputs/autoComplete';
import Input from '../inputs/input';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

interface Props {
  secteurChilds?: any[];
  classes: any;
  onSubmitHandler: (themes: any) => void;
  submitText: string;
  requestClose: () => void;
  title?: string;
}

class SecteurForm extends React.Component<Props> {
  state = {
    secteurChilds: this.props.secteurChilds
      ? this.props.secteurChilds.map(secteurChild => ({
        label: secteurChild.title,
        value: secteurChild._id,
      }))
      : [],
    titleValue: this.props.title || '',
    errorForTitle: false,
    titleError: '',
  };

  validateTitle = (value: string) => {
    return value ? '' : 'vous devez inserer un titre';
  }

  handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleError = this.validateTitle(e.currentTarget.value);
    this.setState({
      titleError,
      titleValue: e.currentTarget.value,
      errorForTitle: !!titleError,
    });
  }
  handleSuggestion = async (value: string) => {
    try {
      const response: Response<ListThemesResponse> = await listThemes({
        search: value,
        type: 'professional',
      });

      if (response.code === 200 && response.data) {
        return response.data.data.map(suggestion => ({
          value: suggestion._id,
          label: suggestion.title,
        }));
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  themesChange = (secteurChilds: { label: string; value: string }[]) => {
    this.setState({
      secteurChilds,
    });
  }

  onSubmitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.onSubmitHandler({
      secteurChilds: this.state.secteurChilds.map(secteurChild => secteurChild.value),
      title: this.state.titleValue,
    });
  }

  render(): JSX.Element {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
      <Card className={classes.card}>
        <Input
        id="1"
          label="Titre"
          InputIndication={this.state.titleError}
          error={this.state.errorForTitle}
          value={this.state.titleValue}
          onChangeInput={this.handleChangeTitle}
        />
        <div className={classes.auto}>
          <AutoComplete
            placeholder="theme"
            handleChange={this.themesChange}
            value={this.state.secteurChilds}
            title={'themes'}
            handleInputChange={this.handleSuggestion}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={this.onSubmitHandler}
          className={classes.button}
        >
          {this.props.submitText}
        </Button>
        </Card>
      </div>
    );
  }
}

const styles = () =>
  createStyles({
    container: {
      paddingBottom: 15,
      flex: '1 1 50%',
      padding: 15,
      height: '50vh',
    },
    button: {
      marginRight: 'auto',
      marginLeft: 'auto',
      display: 'block',
    },
    auto: {
      minHeight: 350,
    },
    card: {
      width: '100%',
      padding: 25,

    },
  });
export default withStyles(styles)(SecteurForm);
