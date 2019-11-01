import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = {
  formControl: {
    minWidth: 200,
    width: '100%',
  },
};
type oneChoice = { _id: string; name: string };
interface Props {
  indication?: string;
  Selectvalue?: string;
  handleChange(e: any): void;
  empty?: boolean;
  id: string;
  label?: string;
  choice: { _id: string; name: string }[];
  defaultValueID?: string;
  defaultValue?: string;
}

class SelectInput extends Component<Props> {
  render(): JSX.Element {
    return (
      <div>
        <FormControl style={styles.formControl}>
          <InputLabel htmlFor="Niveau">{this.props.label}</InputLabel>
          <Select
            value={this.props.Selectvalue}
            onChange={this.props.handleChange}
            input={<Input name="selectInputValue" id="Niveau" />}
            error={this.props.empty}
          >
            {!isEmpty(this.props.choice) &&
              this.props.choice.map((choiceArray: oneChoice) => {
                return (
                  <MenuItem key={choiceArray._id} value={choiceArray._id}>
                    {choiceArray.name}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText style={{ color: 'red' }}>{this.props.indication}</FormHelperText>
        </FormControl>
      </div>
    );
  }
}
export default SelectInput;
