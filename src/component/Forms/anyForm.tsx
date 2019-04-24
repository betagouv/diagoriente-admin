import React, { Component, MouseEvent } from 'react';
import {
  Grid,
  Button,
  Card,
  withStyles,
  ConsistentWith,
} from '@material-ui/core';
import { CSSProperties, WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import SendIcon from '@material-ui/icons/SendRounded';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Input from '../inputs/input';
import SelectInput from '../inputs/selectInput';

interface Props {
  classes: {
    container: string;
    formTitle: string;
    formBox: string;
    iconSmall: string;
    button: string;
    rightIcon: string;
  };
}

class AnyForm extends Component<
  ConsistentWith<Props, WithStyles<string, true>>
> {
  state = {
    InputIndication: '',
    error: false,
    InputValue: '',
    selectedValue: '',
    empty: false,
    selectIndication: '',
  };

  Validate = () => {
    let isError: boolean = false;
    // handle empty input error
    if (this.state.InputValue.length <= 0) {
      this.setState({
        InputIndication: 'you nedd to fill this input',
        error: true,
      });
      isError = true;
    } else if (this.state.InputValue.length > 0) {
      this.setState({ InputIndication: '', error: false });
    }
    // handle select input error
    if (this.state.selectedValue === '') {
      this.setState({
        empty: true,
        selectIndication: 'you need to select something',
      });
      isError = true;
    } else if (this.state.selectedValue !== '') {
      this.setState({ empty: false, selectIndication: '' });
    }
    return isError;
  }
  // handle the submit button
  onSubmitHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const err = this.Validate();
  }
  // handle change for the input
  onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ InputValue: e.currentTarget.value }, () => this.Validate());
  }
  // handle changes for the select input
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ selectedValue: e.target.value }, () => this.Validate());
  }

  render(): JSX.Element {
    const classes = this.props.classes;
    return (
      <Card className={classes.container}>
        <div className={classes.formTitle}>
          <h1>My Form</h1>
        </div>

        <form className={classes.formBox}>
          <Typography
            variant="h5"
            gutterBottom
            className={classes.formSectioonTitle}
          >
            Section Title
          </Typography>
          <Grid container spacing={40} justify="center">
            <Grid item sm={6}>
              <Input
                placeholder="Input"
                id="1"
                label="Input"
                InputIndication={this.state.InputIndication}
                error={this.state.error}
                value={this.state.InputValue}
                onChangeInput={this.onChangeInput}
              />
            </Grid>
            <Grid item sm={6}>
              <Input
                placeholder="Input"
                id="1"
                label="Input"
                InputIndication={this.state.InputIndication}
                error={this.state.error}
                value={this.state.InputValue}
                onChangeInput={this.onChangeInput}
              />
            </Grid>
            <Grid item sm={6}>
              <Input
                placeholder="Input"
                id="1"
                label="Input"
                InputIndication={this.state.InputIndication}
                error={this.state.error}
                value={this.state.InputValue}
                onChangeInput={this.onChangeInput}
              />
            </Grid>
            <Grid item sm={6}>
              <Input
                placeholder="Input"
                id="1"
                label="Input"
                InputIndication={this.state.InputIndication}
                error={this.state.error}
                value={this.state.InputValue}
                onChangeInput={this.onChangeInput}
              />
            </Grid>
            <Grid item sm={6}>
              <Input
                placeholder="Input"
                id="1"
                label="Input"
                InputIndication={this.state.InputIndication}
                error={this.state.error}
                value={this.state.InputValue}
                onChangeInput={this.onChangeInput}
              />
            </Grid>
            <Grid item sm={6}>
              <SelectInput
                Selectvalue={this.state.selectedValue}
                handleChange={this.handleChange}
                empty={this.state.empty}
                indication={this.state.selectIndication}
                id="10"
                choice={[
                  { _id: '1', title: 'fedi' },
                  { _id: '2', title: 'walid' },
                  { _id: '3', title: 'safouen' },
                ]}
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Typography
            variant="h5"
            gutterBottom
            className={classes.formSectioonTitle}
          >
            Section Title
          </Typography>
          <Grid container spacing={40} justify="center">
            <Grid item sm={6}>
              <Input
                placeholder="Input"
                id="1"
                label="Input"
                InputIndication={this.state.InputIndication}
                error={this.state.error}
                value={this.state.InputValue}
                onChangeInput={this.onChangeInput}
              />
            </Grid>
            <Grid item sm={6}>
              <Input
                placeholder="Input"
                id="1"
                label="Input"
                InputIndication={this.state.InputIndication}
                error={this.state.error}
                value={this.state.InputValue}
                onChangeInput={this.onChangeInput}
              />
            </Grid>
            <Grid item sm={6}>
              <Input
                placeholder="Input"
                id="1"
                label="Input"
                InputIndication={this.state.InputIndication}
                error={this.state.error}
                value={this.state.InputValue}
                onChangeInput={this.onChangeInput}
              />
            </Grid>
            <Grid item sm={6}>
              <Input
                placeholder="Input"
                id="1"
                label="Input"
                InputIndication={this.state.InputIndication}
                error={this.state.error}
                value={this.state.InputValue}
                onChangeInput={this.onChangeInput}
              />
            </Grid>
            <Grid item sm={6}>
              <Input
                placeholder="Input"
                id="1"
                label="Input"
                InputIndication={this.state.InputIndication}
                error={this.state.error}
                value={this.state.InputValue}
                onChangeInput={this.onChangeInput}
              />
            </Grid>
            <Grid item sm={6}>
              <SelectInput
                Selectvalue={this.state.selectedValue}
                handleChange={this.handleChange}
                empty={this.state.empty}
                indication={this.state.selectIndication}
                id="2"
                choice={[
                  { _id: '1', title: 'fedi' },
                  { _id: '2', title: 'nader' },
                  { _id: '3', title: 'abd elwaheb' },
                ]}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            onClick={this.onSubmitHandler}
            disabled={this.state.error}
          >
            Send
            <SendIcon className={classes.rightIcon} />
          </Button>
        </form>
      </Card>
    );
  }
}
const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  button: {
    margin: theme.spacing.unit,
    alignSelf: 'flex-end',
    marginTop: '3%',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  container: {
    margin: '50px 15%',
  },
  formTitle: {
    margin: 25,
  },
  formBox: {
    margin: 35,
    justifyContent: 'space-between',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  section: {
    width: '100%',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flex: 1,
    justifyContent: 'space-betwwen',
    flexDirection: 'column',
    display: 'flex',
  },
  divider: {
    marginBottom: '2%',
    marginTop: '4%',
  },
  formSectioonTitle: {
    color: '#7CC1EF',
  },
});
export default withStyles(styles, { withTheme: true })(AnyForm);
