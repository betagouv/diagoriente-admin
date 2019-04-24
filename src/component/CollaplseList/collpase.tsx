import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import './collapseStyle.scss';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = (): { [key: string]: CSSProperties } => ({
  MaxWidth: {
    maxWidth: 300,
    fontSize: 16,
    flexWrap: 'wrap',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  Container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  themePaper: {
    display: 'flex',
    alignItems: 'center',
    height: 45,
    paddingLeft: '5%',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    backgroundColor: '#edeff9',
    // fbeef3 for red
  },
  redPaper: {
    display: 'flex',
    alignItems: 'center',
    height: 45,
    paddingLeft: '5%',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    backgroundColor: '#fbeef3',
  },
  perso: {
    backgroundColor: '#f50057',
    borderRadius: 5,
    /* borderTopRightRadius: 0,
    borderBottomRightRadius: 0, */
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 50,
    marginRight: 10,
  },
  pro: {
    backgroundColor: '#3f51b5',
    borderRadius: 5,
    /* borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0, */
    marginRight: 10,
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 50,
  },
  activityPaper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipSpan: {
    whiteSpace: 'initial',
    margin: 5,
  },
  chipActivityBlue: {
    margin: 5,
    borderRadius: 5,
    borderLeftColor: '#3f51b5',
    borderLeftWidth: 5,
    height: 'auto',
  },
  chipActivityRed: {
    margin: 5,
    borderRadius: 5,
    borderLeftColor: '#f50057',
    borderLeftWidth: 5,
    height: 'auto',
  },
  chipLabel: {
    fontSize: 14,
  },
  tooltip: {
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    opacity: 1,
    backgroundColor: '#fff',
  },
});

interface Props {
  theme?: any;
  classes: any;
  avitivities?: any;
  type: string;
}
class Collapse extends React.Component<Props> {
  /*  interests = this.props.interests && this.props.interests.map((index: any, interest: any) => {
    return (
      <ul key={index}>
        <li>{interest.nom}</li>
      </ul>
    );
  }); */
  renderInterests = (activitys: any): any => {
    if (activitys) {
      return (
        <div>
          {activitys.interests.map((interest: any, index: any) => {
            return (
              <Chip
                key={index}
                variant="outlined"
                label={interest.nom}
                classes={{ label: this.props.classes.chipLabel }}
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              />
            );
          })}
        </div>
      );
    }
    return <div />;
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className="Container">
        <Grid container className={classes.Container}>
          <Grid item>
            <div className={this.props.type === 'personal' ? classes.redPaper : classes.themePaper}>
              <Typography>Theme : {this.props.theme}</Typography>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {this.props.type === 'personal' ? (
                  <Typography className={classes.perso}>Perso</Typography>
                ) : (
                  <Typography className={classes.pro}>Pro</Typography>
                )}
              </div>
            </div>
          </Grid>
          <Grid item>
            <Paper elevation={0} className={classes.activityPaper}>
              {this.props.avitivities.map((activity: any, index: number) => {
                return (
                  <div key={index}>
                    <Tooltip
                      title={this.renderInterests(activity)}
                      classes={{
                        tooltip: classes.MaxWidth,
                        popper: classes.tooltip,
                      }}
                    >
                      <Chip
                        classes={{ label: classes.chipSpan }}
                        label={activity.title}
                        variant="outlined"
                        className={this.props.type === 'personal' ? classes.chipActivityRed : classes.chipActivityBlue}
                      />
                    </Tooltip>
                  </div>
                );
              })}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Collapse);
