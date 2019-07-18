import React, { MouseEvent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '../inputs/input';
import SelectInput from '../inputs/selectInput';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import AutoComplete from '../inputs/autoComplete';
import Close from '../Icons/Close';
import { listActivities, listCompetences } from '../../requests';
import {
  Activity,
  ListActivitiesResponse,
  Response,
  ListCompetencesResponse,
  ICompetence,
} from 'requests';

export interface SubmitParams {
  title: string;
  description: string;
  type: string;
  verified: boolean;
  activities: string[];
  parentId?: string;
}

interface Props {
  onSubmitHandler: (params: SubmitParams) => void;
  header: string;
  submitText: string;
  title?: string;
  description?: string;
  type?: string;
  verified?: boolean;
  activities?: Activity[];
  classes: any;
  requestClose: () => void;
  secteur: { _id: string; title: string }[];
  selectedSecteur: string;
  selectedSecteurId?: string;
  competences?: ICompetence[];
}

class CreateTheme extends React.Component<Props> {
  static defaultProps = {
    header: 'Créer Théme',
    submitText: 'Créer Théme',
  };

  state = {
    titleValue: this.props.title || '',
    errorForTitle: false,
    titleError: '',
    descriptionValue: this.props.description || '',
    descriptionError: '',
    errorForDescription: false,
    role: this.props.type || '',
    emptyRole: false,
    roleError: '',
    activity: '',
    verified: this.props.verified || false,
    submit: false,
    secteur: '' || this.props.selectedSecteur,
    activities: this.props.activities
      ? this.props.activities.map(activity => ({
        label: activity.title,
        value: activity._id,
      }))
      : [],
    Competences: this.props.competences
      ? this.props.competences.map(competence => ({
        label: competence.title,
        value: competence._id,
      }))
      : [],
  };
  // handle errors
  validateTitle = (value: string) => {
    return value ? '' : 'vous devez inserer un titre';
  }
  validateDescription = (value: string) => {
    return value ? '' : 'vous devez inserer une description';
  }
  validateRole = (value: string) => {
    return value ? '' : 'vous devez selectionner un role';
  }

  // handle checkbok change
  handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ verified: event.target.checked });
  }
  // handle title changes
  handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleError = this.validateTitle(e.currentTarget.value);
    this.setState({
      titleError,
      titleValue: e.currentTarget.value,
      errorForTitle: !!titleError,
    });
  }
  // handle change for description
  onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const descriptionError = this.validateDescription(e.currentTarget.value);
    this.setState({
      descriptionError,
      descriptionValue: e.currentTarget.value,
      errorForDescription: !!descriptionError,
    });
  }
  // handle select input changes
  handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const roleError = this.validateRole(e.target.value);
    this.setState({ roleError, role: e.target.value, emptyRole: !!roleError });
  }
  handleSecteurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ secteur: e.target.value });
  }

  handleSuggestion = async (value: string) => {
    try {
      const response: Response<ListActivitiesResponse> = await listActivities({
        search: value,
        perPage: 10,
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

  activitiesChange = (activities: { label: string; value: string }[]) => {
    this.setState({
      activities,
    });
  }

  handleSuggestionCompetences = async (value: string) => {
    try {
      const response: Response<any> = await listCompetences(
        {
          search: value,
          perPage: 10,
        },
      );

      if (response.code === 200 && response.data) {
        return response.data.map((suggestion: any) => ({
          value: suggestion._id,
          label: suggestion.title,
        }));
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  CompetencesChange = (Competences: { label: string; value: string }[]) => {
    this.setState({
      Competences,
    });
  }

  // oncreate theme handler
  onSubmitHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      this.validateTitle(this.state.titleValue) !== '' ||
      this.validateDescription(this.state.descriptionValue) !== '' ||
      this.validateRole(this.state.role) !== ''
    ) {
      this.setState({
        titleError: this.validateTitle(this.state.titleValue),
        error: true,
        descriptionError: this.validateDescription(this.state.descriptionValue),
        errorForTitle: true,
        roleError: this.validateRole(this.state.role),
      });
    } else {
      this.props.onSubmitHandler({
        title: this.state.titleValue,
        description: this.state.descriptionValue,
        type: this.state.role,
        verified: this.state.verified,
        activities: this.state.activities.map(activity => activity.value),
        parentId: this.state.secteur,
      });
    }
  }

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <div className={classes.contentContainer}>
            <Input
              id="1"
              label="Titre"
              InputIndication={this.state.titleError}
              error={this.state.errorForTitle}
              value={this.state.titleValue}
              onChangeInput={this.handleChangeTitle}
            />
            <Input
              id="2"
              label="Description"
              InputIndication={this.state.descriptionError}
              error={this.state.errorForDescription}
              value={this.state.descriptionValue}
              onChangeInput={this.onChangeDescription}
              textArea={true}
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
            <FormHelperText style={{ color: 'red' }} />
            <SelectInput
              label="Role"
              Selectvalue={this.state.role}
              handleChange={this.handleSelectChange}
              empty={this.state.emptyRole}
              indication={this.state.roleError}
              id="1"
              choice={[
                { _id: 'professional', title: 'professional' },
                { _id: 'personal', title: 'personal' },
              ]}
            />
            {this.state.role === 'professional' ? (
              <SelectInput
                label="Secteur"
                Selectvalue={this.state.secteur}
                handleChange={this.handleSecteurChange}
                id="2"
                choice={this.props.secteur}
                defaultValue={this.props.selectedSecteur}
                defaultValueID={this.props.selectedSecteurId}
              />
            ) : null}
            <AutoComplete
              placeholder="activité"
              handleChange={this.activitiesChange}
              value={this.state.activities}
              title={'activities'}
              handleInputChange={this.handleSuggestion}
            />
            <AutoComplete
              placeholder="Compétences"
              handleChange={this.CompetencesChange}
              value={this.state.Competences}
              title={'Competences'}
              handleInputChange={this.handleSuggestionCompetences}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.onSubmitHandler}
              disabled={this.state.submit}
              className={classes.button}
            >
              {this.props.submitText}
            </Button>
          </div>
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
      paddingLeft: 15,
    },
    card: {
      position: 'relative',
      width: '100%',
      padding: 30,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    },
    formTitle: {},
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
    contentContainer: {
      width: '80%',
      height: '100%',
      flex: '0 0 auto',
      alignItems: 'stretch',
      display: 'flex',
      flexDirection: 'column',
    },
  });

export default withStyles(styles)(CreateTheme);
