import React, { MouseEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '../inputs/input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import SelectInput from '../inputs/selectInput';
import { CreateActivityParams, Interest } from 'requests';
import AutoComplete from '../inputs/autoComplete';

import { listInterests } from '../../requests';

interface Props {
  onSubmitHandler(params: CreateActivityParams): void;
  header: string;
  submitText: string;
  requestClose: () => void;
  classes: any;
  title?: string;
  type?: string;
  verified?: boolean;
  interests?: Interest[];
  fetching?: boolean;
  showInterest: boolean;
  description?: string;
}

interface State {
  submit: boolean;
  errorForType: boolean;
  errorForTitle: boolean;
  titleError: string;
  titleValue: string;
  typeError: string;
  typeValue: string;
  checkBoxError: string;
  verified: boolean;
  interests: { label: string; value: string }[];
  descriptionError: string;
  errorForDescription: boolean;
  descriptionValue: string;
}

class ActivityForm extends React.Component<Props, State> {
  static defaultProps = {
    header: 'Créer Activité',
    submitText: 'Créer Activité',
    showInterest: true,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      submit: false,
      errorForType: false,
      errorForTitle: false,
      titleError: '',
      titleValue: this.props.title || '',
      typeError: '',
      typeValue: this.props.type || '',
      checkBoxError: '',
      verified: this.props.verified || false,
      interests: this.props.interests
        ? this.props.interests.map(interest => ({
          label: interest.nom,
          value: interest._id,
        }))
        : [],
      descriptionError: '',
      errorForDescription: false,
      descriptionValue: this.props.description || '',
    };
  }

  resetValues = () => {
    this.setState({
      submit: false,
      errorForType: false,
      errorForTitle: false,
      titleError: '',
      titleValue: '',
      typeError: '',
      typeValue: '',
      checkBoxError: '',
      verified: false,
      interests: [],
    });
  }

  // handle errors
  validateTitle = (value: string) => {
    // handle title error
    if (value === '') {
      return 'vous devez inserer un titre';
    }
    return '';
  }
  validateDescription = (value: string) => {
    // handle title error
    if (value === '') {
      return 'vous devez inserer une Description';
    }
    return '';
  }
  validateType = (value: string) => {
    // handle description error
    if (value === '') {
      return 'vous devez inserer une type';
    }
    return '';
  }

  interestsChange = (interests: any) => {
    this.setState({ interests });
  }

  handleSuggestion = async (value: string) => {
    try {
      const response = await listInterests({ search: value, perPage: 10 });
      if (response.code === 200 && response.data) {
        return response.data.data.map(suggestion => ({
          value: suggestion._id,
          label: suggestion.nom,
        }));
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  // handle name changes
  handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleError = this.validateTitle(e.currentTarget.value);
    this.setState({
      titleError,
      titleValue: e.currentTarget.value,
      errorForTitle: !!titleError,
    });
  }
  // handle change for description
  handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const descriptionError = this.validateDescription(e.currentTarget.value);
    this.setState({
      descriptionError,
      descriptionValue: e.currentTarget.value,
      errorForDescription: !!descriptionError,
    });
  }

  // handle change for rank
  handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typeError = this.validateType(e.currentTarget.value);
    this.setState({
      typeError,
      typeValue: e.target.value,
      errorForType: !!typeError,
    });
  }
  // handle checkbok change
  handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ verified: event.target.checked });
  }

  // oncreate theme handler
  onSubmitHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (this.state.errorForTitle && this.state.errorForType) {
      this.setState({
        titleError: this.validateTitle(this.state.titleValue),
        errorForType: true,
        typeError: this.validateType(this.state.typeValue),
        errorForTitle: true,
      });
    } else {
      this.props.onSubmitHandler({
        title: this.state.titleValue,
        description: this.state.descriptionValue,
        type: this.state.typeValue,
        verified: this.state.verified,
        interests: this.state.interests.map(({ value }) => value),
      });
    }
  }

  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        {this.props.fetching && (
          <div
            className={`${this.props.classes.absolute} ${
              this.props.classes.center
            }`}
          >
            <CircularProgress />
          </div>
        )}
        <Card className={classes.card}>
          <Grid container spacing={8} justify="center">
            <Grid item sm={8}>
              <Input
                placeholder="Titre"
                id="1"
                label="Titre"
                InputIndication={this.state.titleError}
                error={this.state.errorForTitle}
                value={this.state.titleValue}
                onChangeInput={this.handleChangeTitle}
              />
              <Input
                placeholder="Description"
                id="11"
                label="Description"
                InputIndication={this.state.descriptionError}
                error={this.state.errorForDescription}
                value={this.state.descriptionValue}
                onChangeInput={this.handleChangeDescription}
                multiline
              />
              <SelectInput
                label="Type"
                Selectvalue={this.state.typeValue}
                handleChange={this.handleChangeType}
                indication={this.state.typeError}
                empty={this.state.errorForType}
                id="1"
                choice={[
                  { _id: 'professional', title: 'professional' },
                  { _id: 'personal', title: 'personal' },
                ]}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.verified}
                    onChange={this.handleCheckBoxChange}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Verified"
              />
              <FormHelperText style={{ color: 'red' }}>
                {this.state.checkBoxError}
              </FormHelperText>
              {this.props.showInterest && (
                <AutoComplete
                  placeholder="Intérêt"
                  handleChange={this.interestsChange}
                  value={this.state.interests}
                  title={'Intérêts'}
                  handleInputChange={this.handleSuggestion}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.onSubmitHandler}
                disabled={!(this.state.titleValue && this.state.typeValue)}
                className={classes.button}
              >
                {this.props.submitText}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}
const styles = () =>
  createStyles({
    container: {
      paddingBottom: 15,
      width: '100%',
      position: 'relative',
    },
    card: {
      width: '100%',
      position: 'relative',
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column',
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
  });

export interface ActivityFormComponent extends ActivityForm {}

export default withStyles(styles)(ActivityForm);
