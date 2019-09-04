import React from 'react';
import PropTypes from 'prop-types';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import VueGlobale from '../../containers/VueGlobaleContainer';

import './dialog.scss';

const styles = () =>
  createStyles({
    appBar: {
      backgroundColor: '#2096f3',
      position: 'relative',
    },
    flex: {
      flex: 1,
      color: 'white',
    },
    fill: {
      position: 'relative',
      height: '100%',
      width: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    tabs: {
      flex: 5,
      paddingRight: 30,
    },
    tabLabel: {
      color: '#fff',
      fontSize: 16,
    },
  });

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}
interface BaseProps {
  handleClose: (e: any) => void;
  open: boolean;
  title: string;
  fullScreen?: boolean;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  modalStyle?: string;
  hasDownload?: boolean;
  pdfDownload?: () => void;
  hasTabs?: boolean;
  handleChange(event: React.ChangeEvent<{}>, value: number): void;
  tabIndex: number;
  tabLabel1?: string;
  tabLabel2?: string;
}
interface StyleProps {
  classes: {
    appBar: string;
    flex: string;
    fill: string;
    tabs: string;
    tabLabel: string;
  };
}
type Props = BaseProps & StyleProps;

class FullModal extends React.Component<Props> {
  static defaultProps = {
    handleChange: () => {},
    tabIndex: 0,
  };

  state = {
    open: false,
    value: 0,
  };

  render() {

    const { classes, tabIndex } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        TransitionComponent={Transition}
        fullScreen={this.props.fullScreen}
        fullWidth
        className={'mui-dialog'}
        maxWidth={this.props.maxWidth}
        classes={{ paper: this.props.modalStyle }}

      >
        <div className={classes.fill}>
          <AppBar className={classes.appBar} color="default" position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.flex}>
                {this.props.title}
              </Typography>
              {this.props.hasTabs && (
                <Tabs
                  value={tabIndex}
                  onChange={this.props.handleChange}
                  className={classes.tabs}
                  indicatorColor="primary"
                  variant="fullWidth"
                >
                  <Tab label={this.props.tabLabel1} className={classes.tabLabel} />
                  <Tab label={this.props.tabLabel2} className={classes.tabLabel} />
                </Tabs>
              )}
              {this.props.hasDownload && tabIndex === 1 ? (
                <Button
                  variant="contained"
                  color="default"
                  onClick={this.props.pdfDownload}
                >
                  Télécharger le pdf
                </Button>
              ) : (
                <div style={{ width: 170 }} />
              )}
              <IconButton
                onClick={this.props.handleClose}
                aria-label="Close"
                style={{
                  alignItems: 'flex-end',
                  display: 'flex',
                  color: 'white',
                }}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {this.props.children}
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(FullModal);
