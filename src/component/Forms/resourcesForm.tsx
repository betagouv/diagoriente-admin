import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { SketchPicker } from 'react-color';

import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

export interface SubmitParams {}

interface Props {
  classes: any;
  color?: string;
  backgroundColor?: string;
  icon?: string;
}

interface State {
  background: string;
  icon: string;
  file?: File;
  iconValide: boolean;
}

class ResourcesForm extends React.Component<Props, State> {
  state: State = {
    background: this.props.backgroundColor || '#fff',
    icon: this.props.icon || '',
    iconValide: true,
  };

  // oncreate theme handler
  handleChangeComplete = (color: any) => {
    this.setState({ background: color.hex });
  }
  handleChangeIcon = (event: any) => {
    const img = new Image();
    img.src = URL.createObjectURL(event.target.files[0]);
    const imgUrl = img.src;
    const file = event.target.files[0];

    img.onload = () => {
      if (img.height <= 520 && img.width <= 520) {
        this.setState({ file, icon: imgUrl, iconValide: true });
      } else {
        this.setState({ icon: '', iconValide: false });
      }
    };
  }
  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <div className={classes.cardBody}>
            <input
              id="f02"
              type="file"
              placeholder="Add profile picture"
              onChange={this.handleChangeIcon}
              style={{ marginBottom: 25 }}
              accept=".svg"
            />
            <Card className={classes.demo}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Demo
                </Typography>
                <div
                  className={classes.media}
                  style={{
                    backgroundColor: this.state.background,
                    borderRadius: 15,
                  }}
                >
                  {this.state.iconValide && this.state.icon && (
                    <img src={this.state.icon} className={classes.img} />
                  )}
                </div>
                {!this.state.iconValide && (
                  <span className={classes.msg}>
                    la taille de l'icône n'est pas valide
                  </span>
                )}
              </CardContent>
            </Card>
          </div>

          <Grid container spacing={8} justify="center">
            <Grid item className={classes.sketchCountainer}>
              <SketchPicker
              // @ts-ignore: Unreachable code error
                color={this.state.background}
                onChangeComplete={this.handleChangeComplete}
              />
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
      margin: 'auto 0',
      width: '100%',
    },
    card: {
      width: '100%',
      padding: 25,
      display: 'flex',
      flexDirection: 'row',
    },
    title: {
      textAlign: 'center',
      fontSize: 'medium',
      marginBottom: 30,
    },
    button: {
      marginBottom: 30,
      marginRight: 'auto',
      marginLeft: 'auto',
      display: 'block',
      maxWidth: 80,
    },
    close: {
      position: 'absolute',
      right: 15,
      top: 20,
    },
    demo: {
      width: 275,
      height: '86%',
      marginTop: 5,
    },
    media: {
      objectFit: 'cover',
      width: '100%',
      height: '70%',
      marginBottom: '15px',
    },
    sketchCountainer: {
      alignItems: 'center',
      marginTop: '50px',
    },
    img: {
      width: ' 100%',
      height: '100%',
    },
    content: {
      paddingBottom: '24px',
      height: '100%',
    },
    msg: {
      color: 'red',
      fontSize: 16,
    },
  });

export interface ResourcesFormComponent extends ResourcesForm {}

export default withStyles(styles)(ResourcesForm);
