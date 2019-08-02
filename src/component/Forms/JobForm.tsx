import React, { ChangeEvent } from 'react';
import { isEqual } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '../inputs/input';
import { CreateJobData } from 'requests';

import { listInterests, listCompetences } from '../../requests';
import JobAutoComplete from '../inputs/JobAutoComplete';
import SelectInput from '../inputs/selectInput';

interface Props {
  classes: { [key: string]: string };
  fetching: boolean;
  submitText: string;
  onSubmit: (args: CreateJobData) => void;
  title?: string;
  description?: string;
  error?: string;
  interests: { _id: string; weight: number; rank: string; nom: string }[];
  competences: { _id: string; weight: number; rank: string; title: string }[];
  selectedSecteur?: string;
  selectedSecteurId?: string;
  secteur: { _id: string; title: string }[];
  Acceccible?: string;
}

interface State {
  title: string;
  description: string;
  titleError: boolean;
  descriptionError: boolean;
  titleProps?: string;
  descriptionProps?: string;
  interests: { label: string; value: string; weight: string }[];
  interestsProps: { _id: string; weight: number; rank: string; nom: string }[];
  competences: { label: string; value: string; weight: string }[];
  competencesProps: {
    _id: string;
    weight: number;
    rank: string;
    title: string;
  }[];
  secteurProps?: string;
  secteur?: string;
  Acceccible: string;
  AcceccibleProps?: string;
}

const formatInterests = (
  interests: { _id: string; weight: number; rank: string; nom: string }[]
) => {
  return interests.map(interest => ({
    value: interest._id,
    weight: `${interest.weight}`,
    label: interest.nom
  }));
};

const formatCompétence = (
  competences: { _id: string; weight: number; rank: string; title: string }[]
) => {
  return competences.map(competence => ({
    value: competence._id,
    weight: `${competence.weight}`,
    label: competence.title
  }));
};

class JobForm extends React.Component<Props, State> {
  static defaultProps = {
    submitText: 'Créer Emplois',
    onSubmit: () => {},
    interests: [],
    competences: []
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    let returnValue: Partial<State> | null = null;
    if (state.descriptionProps !== props.description) {
      returnValue = {
        description: props.description,
        descriptionProps: props.description
      };
    }
    if (state.titleProps !== props.title) {
      const titlePart = { title: props.title, titleProps: props.title };
      returnValue = returnValue ? { ...returnValue, ...titlePart } : titlePart;
    }

    if (!isEqual(state.interestsProps, props.interests)) {
      const interestsPart = {
        interests: formatInterests(props.interests),
        interestsProps: props.interests
      };
      returnValue = returnValue
        ? { ...returnValue, ...interestsPart }
        : interestsPart;
    }

    if (!isEqual(state.competencesProps, props.competences)) {
      const competencePart = {
        competences: formatCompétence(props.competences),
        competencesProps: props.competences
      };
      returnValue = returnValue
        ? { ...returnValue, ...competencePart }
        : competencePart;
    }

    if (state.secteurProps !== props.selectedSecteur) {
      const secteurPart = {
        secteurProps: props.selectedSecteur,
        secteur: props.selectedSecteur
      };
      returnValue = returnValue
        ? { ...returnValue, ...secteurPart }
        : secteurPart;
    }
    if (state.AcceccibleProps !== props.Acceccible) {
      const AccecciblePart = {
        Acceccible: props.Acceccible,
        AcceccibleProps: props.Acceccible
      };
      returnValue = returnValue
        ? { ...returnValue, ...AccecciblePart }
        : AccecciblePart;
    }

    return returnValue;
  }

  state: State = {
    title: this.props.title || '',
    description: this.props.description || '',
    interests: formatInterests(this.props.interests),
    competences: formatCompétence(this.props.competences),
    titleError: false,
    descriptionError: false,
    titleProps: this.props.title,
    descriptionProps: this.props.description,
    interestsProps: this.props.interests,
    competencesProps: this.props.competences,
    secteurProps: this.props.selectedSecteur,
    secteur: this.props.selectedSecteur || '',
    Acceccible: this.props.Acceccible || '',
    AcceccibleProps: this.props.Acceccible
  };

  isValid = () => {
    const {
      title,
      titleError,
      description,
      descriptionError,
      competences,
      interests
    } = this.state;

    const titleValid = !!title && !titleError;
    const descriptionValid = !!description && !descriptionError;
    const interestsValid = this.isWeightValid(interests);
    const competencesValid = this.isWeightValid(competences);
    return titleValid && descriptionValid && interestsValid && competencesValid;
  };

  isWeightValid = (
    array: { label: string; value: string; weight: string }[]
  ) => {
    if (array.length === 0) return true;
    if (array.find(({ weight }) => (weight as any) <= 0)) return false;
    return true;
  };

  handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: e.target.value,
      titleError: e.target.value.length < 3
    });
  };
  handleAccecibleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ Acceccible: e.target.value });
  };

  handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      description: e.target.value,
      descriptionError: e.target.value.length < 3
    });
  };

  handleInterestChange = (
    interests: { value: string; weight: string; label: string }[]
  ) => {
    this.setState({ interests });
  };

  handleCompetenceChange = (
    competences: { value: string; weight: string; label: string }[]
  ) => {
    this.setState({ competences });
  };

  getCompetence = async (value: string) => {
    try {
      const response: any = await listCompetences({ search: value });
      if (response.code === 200 && response.data) {
        return response.data.map((d: any) => ({
          label: d.title,
          value: d._id
        }));
      }
      return [];
    } catch (e) {
      return [];
    }
  };

  getInterest = async (value: string) => {
    try {
      const response = await listInterests({ search: value, perPage: 10 });
      if (response.code === 200 && response.data) {
        return response.data.data.map(d => ({ label: d.nom, value: d._id }));
      }
      return [];
    } catch (e) {
      return [];
    }
  };

  submit = () => {
    this.props.onSubmit({
      title: this.state.title,
      description: this.state.description,
      interests: this.state.interests.map(({ weight, value }) => ({
        weight,
        _id: value
      })),
      competences: this.state.competences.map(({ weight, value }) => ({
        weight,
        _id: value
      })),
      formations: [],
      secteur: [this.state.secteur],
      accessibility: this.state.Acceccible,
      environments: []
    });
  };
  handleSecteurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ secteur: e.target.value });
  };

  public render(): JSX.Element {
    const { classes, error, submitText, fetching } = this.props;

    return (
      <div className={classes.container}>
        <h1 className={classes.title}>{submitText}</h1>
        {error && <p className={classes.error}>{error}</p>}
        {fetching ? (
          <div className={`${classes.absolute} ${classes.center}`}>
            <CircularProgress />
          </div>
        ) : (
          <div className={classes.card}>
            <Grid container spacing={24} direction={'row'}>
              <Grid item sm={6}>
                <Input
                  placeholder="Titre"
                  id="1"
                  label="Titre"
                  value={this.state.title}
                  onChangeInput={this.handleTitleChange}
                  InputIndication={
                    this.state.titleError
                      ? 'Titre doit contenir au moins 3 caractère'
                      : ''
                  }
                />
              </Grid>
              <Grid item sm={6}>
                <Input
                  multiline
                  placeholder="Description"
                  id="2"
                  label="Description"
                  value={this.state.description}
                  onChangeInput={this.handleDescriptionChange}
                  InputIndication={
                    this.state.descriptionError
                      ? 'Description doit contenir au moins 3 caractère'
                      : ''
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={24} direction={'row'}>
              <Grid item sm={6}>
                <SelectInput
                  label="Secteur"
                  Selectvalue={this.state.secteur}
                  handleChange={this.handleSecteurChange}
                  id="3"
                  choice={this.props.secteur}
                  defaultValue={this.props.selectedSecteur}
                  defaultValueID={this.props.selectedSecteurId}
                />
              </Grid>
              <Grid item sm={6}>
                <Input
                  placeholder="Accessible"
                  id="4"
                  label="Accessible"
                  value={this.state.Acceccible}
                  onChangeInput={this.handleAccecibleChange}
                />
              </Grid>
            </Grid>

            <Grid alignItems="stretch" container spacing={24} direction={'row'}>
              <Grid item sm={6}>
                <JobAutoComplete
                  handleInputChange={this.getInterest}
                  label={'Intérêts'}
                  onValuesChange={this.handleInterestChange}
                  values={this.state.interests}
                />
              </Grid>
              <Grid item sm={6}>
                <JobAutoComplete
                  handleInputChange={this.getCompetence}
                  label={'Compétences'}
                  onValuesChange={this.handleCompetenceChange}
                  values={this.state.competences}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
              onClick={this.submit}
              disabled={!this.isValid()}
            >
              {submitText}
            </Button>
          </div>
        )}
      </div>
    );
  }
}
const styles = createStyles({
  container: {
    paddingBottom: 15,
    width: '100%',
    position: 'relative',
    maxWidth: 998,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'calc(50vh - 64px)'
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
    margin: '10px 0',
    flex: '0 0 auto',
    textAlign: 'center',
    width: '70%'
  },
  card: {
    width: '100%',
    position: 'relative',
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 30px',
    margin: 'auto'
  },
  formTitle: {
    margin: 25
  },
  button: {
    margin: '30px auto',
    display: 'block'
  },
  close: {
    position: 'absolute',
    right: 15,
    top: 20
  },
  absolute: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    color: 'rgb(225, 0, 80)',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'inherit'
  }
});

export interface JobFormComponent extends JobForm {}

export default withStyles(styles)(JobForm);
