import React from 'react';
import onClickOutside from 'react-click-outside';
import { isEqual } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { CSSProperties, WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Paper from '@material-ui/core/Paper/Paper';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

import classNames from '../../utils/classNames';

interface Props {
  classes: any;
  label?: any;
  placeholder?: string;
  handleChange: (value: { label: string; value: string }[]) => void;
  value: { label: string; value: string }[];
  title: string;
  handleInputChange: (value: string) => Promise<{ label: string; value: string }[]>;
}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '10px 0',
    minHeight: 250,
  },
  itemsContainer: {
    flex: '1 1 auto',
    position: 'relative',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    alignItems: 'stretch',
  },
  chip: {
    margin: theme.spacing.unit,
    flex: '0 0 auto',
    backgroundColor: '#3f51b5',
    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex',
  },
  paper: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    maxHeight: 250,
    overflow: 'auto',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    transform: 'scale(0)',
    transition: `all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
  },
  chipLabel: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    flex: '1 1 auto',
  },
  paperShow: {
    transform: 'scale(1)',
  },
  chipNotSelected: {
    backgroundColor: '#2196f3',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
  },
});

interface Suggestion {
  label: string;
  value: string;
}

interface State {
  value: string;
  suggestions: (Suggestion & { selected: boolean })[];
  open: boolean;
  selectedSuggestion: string | null;
}

class TextAutoCompleteComponent extends React.Component<Props, State> {
  state: State = {
    value: '',
    suggestions: [],
    open: false,
    selectedSuggestion: null,
  };

  componentDidUpdate(props: Props) {
    if (!isEqual(this.props.value, props.value)) {
      const suggestions = this.handleSuggestions(this.state.suggestions);
      this.setState({ suggestions });
    }
  }

  handleClickOutside = () => {
    this.setState({ open: false });
  }

  onFocus = async () => {
    let { suggestions } = this.state;
    if (!suggestions.length) {
      const initialSuggestion = await this.props.handleInputChange(this.state.value);
      suggestions = this.handleSuggestions(initialSuggestion);
    }
    this.setState({ suggestions, open: true });
  }

  onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ value });
    const initialSuggestion = await this.props.handleInputChange(value);
    const suggestions = this.handleSuggestions(initialSuggestion);
    this.setState({ suggestions, open: true });
  }

  handleSuggestions = (suggestions: Suggestion[]) => {
    let validatedSuggestions = suggestions.map((suggestion: Suggestion) => {
      const selected = !!this.props.value.find(({ value }) => value === suggestion.value);
      return { ...suggestion, selected };
    });
    validatedSuggestions = validatedSuggestions.sort((a, b) => {
      if (a.selected === b.selected) return 0;
      if (a.selected) return 1;
      return -1;
    });
    return validatedSuggestions;
  }

  handleDelete = (value: string) => {
    this.setState({ selectedSuggestion: null });
    const index = this.props.value.findIndex((item) => item.value === value);
    this.props.handleChange(this.props.value.filter((item, i) => i !== index));
  }

  handleAdd = (item: Suggestion) => {
    this.setState({ selectedSuggestion: null });
    this.props.handleChange([...this.props.value, item]);
  }

  renderSuggestion = ({ label, value, selected }: { label: string; value: string; selected: boolean }) => {
    const handleDelete = () => {
      this.handleDelete(value);
    };
    const handleClick = () => {
      if (!selected) {
        return this.handleAdd({ label, value });
      }
      this.handleDelete(value);
    };
    return (
      <Chip
        label={label}
        onDelete={selected ? handleDelete : undefined}
        onClick={handleClick}
        className={classNames(this.props.classes.chip, !selected && this.props.classes.chipNotSelected)}
        color="primary"
        icon={!selected ? <DoneIcon /> : undefined}
        classes={{ label: this.props.classes.chipLabel }}
        key={value}
        clickable={false}
      />
    );
  }

  renderChip = ({ label, value }: Suggestion) => {
    const handleDelete = () => {
      this.handleDelete(value);
    };
    const handleClick = () => {
      if (this.state.selectedSuggestion === value) {
        return this.handleDelete(value);
      }
      this.setState({ selectedSuggestion: value });
    };
    return (
      <Chip
        key={value}
        label={label}
        onDelete={handleDelete}
        onClick={handleClick}
        className={classNames(this.props.classes.chip)}
        color="primary"
        classes={{ label: this.props.classes.chipLabel }}
      />
    );
  }

  render() {
    const { classes, label, value } = this.props;

    return (
      <div className={this.props.classes.container}>
        <TextField
          label={label}
          value={this.state.value}
          onChange={this.onChange}
          InputLabelProps={{
            shrink: false,
          }}
          onFocus={this.onFocus}
        />
        <div className={classes.itemsContainer}>
          <div className={classes.content}>{value.length ? value.map(this.renderChip) : null}</div>

          <Paper className={classNames(classes.paper, this.state.open && classes.paperShow)}>
            {this.state.suggestions.map(this.renderSuggestion)}
          </Paper>
        </div>
      </div>
    );
  }
}

const TextAutoComplete = onClickOutside(TextAutoCompleteComponent);

class AutoComplete extends React.PureComponent<Props> {
  render() {
    const { classes, title } = this.props;

    return (
      <div className={classes.root}>
        <Typography>{title}</Typography>
        <TextAutoComplete {...this.props} />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AutoComplete);
