import React, { Component, InputHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
  input: {
    width: '100%',
  },
};

type Props = TextFieldProps & {
  id: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  required?: boolean;
  value?: any;
  InputIndication?: string;
  textArea?: boolean;
  onChangeInput(e: any): void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

class Input extends Component<Props> {
  render(): JSX.Element {
    const {
      required,
      error,
      id,
      label,
      placeholder,
      onChangeInput,
      textArea,
      InputIndication,
      ...other
    } = this.props;
    return (
      <>
        <TextField
          required={this.props.required}
          error={this.props.error}
          style={styles.input}
          id={this.props.id}
          label={this.props.label}
          onChange={this.props.onChangeInput}
          variant="standard"
          multiline={this.props.textArea}
          rows={this.props.textArea ? 5 : 0}
          {...other}
        />
        <FormHelperText style={{ color: 'red' }}>
          {this.props.InputIndication}
        </FormHelperText>
      </>
    );
  }
}

export default Input;
