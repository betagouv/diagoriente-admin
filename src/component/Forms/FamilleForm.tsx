import React from 'react';
import {
  Response,
  ListInterestResponse,
  DeletePhotoParams,
  Famille,
} from 'requests';
import {
  listSecteurs,
  listInterests,
  deleteFamillePhoto,
} from '../../requests';
import AutoComplete from '../inputs/autoComplete';
import Input from '../inputs/input';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import ImageUploader from 'react-images-upload';
import './familleForm.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

interface Props {
  interests?: any[];
  classes: any;
  onSubmitHandler: (themes: any) => void;
  submitText: string;
  requestClose: () => void;
  nom?: string;
  hasEdit?: boolean;
  photos?: any[];
  withPreview?: boolean;
  idFamilly: string;
}
interface Photo {
  preview: string;
  _id: string;
}

interface State {
  interests: any;
  nomValue: string;
  errorForNom: boolean;
  nomError: string;
  pictures: File[];
  previews: Photo[];
  open: boolean;
  currentResourceId: string;
}

class FamilleForm extends React.Component<Props> {
  state: State = {
    open: false,
    interests: this.props.interests
      ? this.props.interests.map(familleChild => ({
        label: familleChild.nom,
        value: familleChild._id,
      }))
      : [],
    nomValue: this.props.nom || '',
    errorForNom: false,
    nomError: '',
    pictures: [],
    previews: this.props.photos
      ? this.props.photos.map(photoPreview => ({
        preview: `data:image/png;base64,${photoPreview.base64}`,
        _id: photoPreview._id,
      }))
      : [],
    currentResourceId: '',
  };

  previews = this.props.photos
    ? this.props.photos.map(photoPreview => ({
      preview: `data:image/png;base64,${photoPreview.base64}`,
    }))
    : [];

  /* componentDidMount = () => {
    if (this.state.previews) {
      const pictures: File[] = [];
      this.state.previews.forEach(el => {
        fetch(el.preview)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'File name');
            pictures.push(file);
          });
      });

    }
  } */

  validateTitle = (value: string) => {
    return value ? '' : 'vous devez inserer un titre';
  }

  handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nomError = this.validateTitle(e.currentTarget.value);
    this.setState({
      nomError,
      nomValue: e.currentTarget.value,
      errorForNom: !!nomError,
    });
  }
  handleSuggestion = async (value: string) => {
    try {
      const response: Response<ListInterestResponse> = await listInterests({
        search: value,
      });

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

  themesChange = (interests: { label: string; value: string }[]) => {
    this.setState({
      interests,
    });
  }

  onSubmitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.onSubmitHandler({
      interests: this.state.interests.map(
        (familleChild: any) => familleChild.value,
      ),
      nom: this.state.nomValue,
      resources: this.state.pictures,
    });
  }

  onDrop = (pictureFiles: File[]) => {
    this.setState({ pictures: [...pictureFiles] });
    const prevs = pictureFiles.map(el => ({
      preview: URL.createObjectURL(el),
    }));

    this.setState((prevState: State) => ({
      previews: [...this.previews, ...prevs],
    }));
  }
  handleDelete = (id: string) => {
    /* const response: Response<Famille> = await deleteFamillePhoto({
      id: this.props.idFamilly,
      resource: id,
    });
    if (response.code === 200 && response.data) {

      // this.setState({ previews: response.data.resources });
      const  previews = response.data.resources
    ? response.data.resources.map(photoPreview => ({
      preview: `data:image/png;base64,${photoPreview.base64}`,
    }))
    : [];
      this.setState({ previews });
    } */
    this.setState({ open: true, currentResourceId: id });
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  yesDelete = async () => {
    const response: Response<Famille> = await deleteFamillePhoto({
      id: this.props.idFamilly,
      resource: this.state.currentResourceId,
    });
    if (response.code === 200 && response.data) {

      // this.setState({ previews: response.data.resources });
      const previews = response.data.resources
        ? response.data.resources.map(photoPreview => ({
          preview: `data:image/png;base64,${photoPreview.base64}`,
        }))
        : [];
      this.setState({ previews, open: false });
    }
  }

  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <Input
            id="1"
            label="Nom"
            InputIndication={this.state.nomError}
            error={this.state.errorForNom}
            value={this.state.nomValue}
            onChangeInput={this.handleChangeTitle}
          />
          <div className={classes.auto}>
            <AutoComplete
              placeholder="Interet"
              handleChange={this.themesChange}
              value={this.state.interests}
              title={'Intéréts'}
              handleInputChange={this.handleSuggestion}
            />
          </div>
          <div className={classes.previewContainer}>
            {this.props.hasEdit === true
              ? this.state.previews &&
                this.state.previews.map((preview, index) => {
                  return (
                    <div key={index} className={classes.photoContainer}>
                      <div
                        className={classes.deleteButton}
                        onClick={() => this.handleDelete(preview._id)}
                      >
                        X
                      </div>
                      <img src={preview.preview} className={classes.image} />
                    </div>
                  );
                })
              : null}
          </div>
          <ImageUploader
            withIcon={false}
            buttonText="Choisir les images"
            buttonClassName={classes.buttonChoose}
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={this.props.withPreview}
            className={classes.filesContainer}
            withLabel={false}
          />
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
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.dialogTitle} >{'Confirmation'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Confirmez-vous la suppression definitive de cet element
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogActions} >
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.yesDelete} color="primary" autoFocus>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
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
    filesContainer: {
      borderRadius: 10,
    },

    buttonChoose: {
      padding: '6px 16px',
      fontSize: '0.875rem',
      minWidth: 64,
      height: 36,
      transition:
        'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      lineHeight: 1.8,
      fontFamily: 'Poppins',
      fontWeight: 500,
      borderRadius: '4px !important',
      textTransform: 'uppercase',
      backgroundColor: '#2096f3 !important',
      boxShadow:
        '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
      color: 'white',
      cursor: 'pointer',
    },
    input: {
      display: 'none',
    },
    previewContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      position: 'relative',
      width: '100%',
    },
    photoContainer: {
      width: '25%',
      margin: '1%',
      padding: '10px',
      background: '#edf2f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'inherit',
      boxShadow: '0 0 8px 2px rgba(0, 0, 0, 0.1)',
      border: '1px solid #d0dbe4',
      position: 'relative',
    },
    deleteButton: {
      position: 'absolute',
      top: -9,
      right: -9,
      color: '#fff',
      background: '#ff4081',
      borderRadius: '50%',
      textAlign: 'center',
      cursor: 'pointer',
      fontSize: 26,
      fontWeight: 'bold',
      lineHeight: 1.2,
      width: 30,
      height: 30,
    },
    image: {
      width: '100%',
    },
    dialogTitle : {
      display:'flex',
      justifyContent:'center',
    },
    dialogActions :{
      justifyContent:'space-evenly !important',
    },
  });
export default withStyles(styles)(FamilleForm);
