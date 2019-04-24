import React, { ChangeEvent } from 'react';

// components
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/icons/Close';

// styles
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from '../../utils/classNames';

interface Suggestion {
  label: string;
  value: string;
}

interface Props {
  classes: { [key: string]: string };
  className: string;
  handleInputChange: (
    value: string,
  ) => Promise<{ label: string; value: string }[]>;
  onValuesChange: (selection: (Suggestion & { weight: string })[]) => void;
  values: (Suggestion & { weight: string })[];
  label: string;
}

interface State {
  open: boolean;
  value: string;
  suggestions: Suggestion[];
}

class JobAutoComplete extends React.PureComponent<Props, State> {
  static defaultProps = {
    className: '',
    onChange: () => {},
    initialValues: [],
  };

  state: State = {
    open: false,
    value: '',
    suggestions: [],
  };

  suggestions: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e: MouseEvent) => {
    if (!this.suggestions.current) return;
    if (this.suggestions.current.contains(e.target as any)) return;
    this.setState({ open: false });
  }

  onFocus = async (e: FocusEvent) => {
    const suggestions = await this.props.handleInputChange(this.state.value);
    this.setState({ suggestions, open: true });
  }

  add = (suggestion: Suggestion) => {
    return [...this.props.values, { ...suggestion, weight: '0' }];
  }

  remove = (value: string) => {
    return this.props.values.filter(row => row.value !== value);
  }

  handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { value } = e.target;
    this.setState({ value });
    const suggestions = await this.props.handleInputChange(value);
    this.setState({ suggestions, open: true });
  }

  onSelectionWeightChange = (value: string, weight: string) => {
    this.props.onValuesChange(
      this.props.values.map(row => {
        if (row.value === value) return { ...row, weight };
        return row;
      }),
    );
  }

  renderSuggestion = (suggestion: Suggestion) => {
    const { classes, values } = this.props;
    const selected = values.find(({ value }) => value === suggestion.value);

    const click = () => {
      this.props.onValuesChange(
        selected ? this.remove(suggestion.value) : this.add(suggestion),
      );
    };

    const crossClick = () => {
      this.props.onValuesChange(this.remove(suggestion.value));
    };

    return (
      <div key={suggestion.value} className={classes.suggestionContainer}>
        <Tooltip title={suggestion.label}>
          <div onClick={click} className={classes.suggestion}>
            <span className={classes.suggestionLabel}>{suggestion.label}</span>
          </div>
        </Tooltip>
        {selected && (
          <div onClick={crossClick} className={classes.cross}>
            <Icon fontSize={'small'} />
          </div>
        )}
      </div>
    );
  }

  renderSelectedSuggestion = (selection: Suggestion & { weight: string }) => {
    const { classes } = this.props;

    const crossClick = () => {
      this.props.onValuesChange(this.remove(selection.value));
    };

    const change = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const value: any = e.target.value.replace(',', '.');
      if (value === '.') {
        this.onSelectionWeightChange(selection.value, '0.');
      }

      if (value - 0 === NaN) return;

      if (value <= 1) {
        this.onSelectionWeightChange(selection.value, value);
      }
    };

    return (
      <div key={selection.value} className={classes.suggestionContainer}>
        <Tooltip title={selection.label}>
          <div className={classes.suggestion}>
            <span
              style={{
                color:
                  (selection.weight as any) > 0 ? 'inherit' : 'rgb(225, 0, 80)',
              }}
              className={classes.suggestionLabel}
            >
              {selection.label}
            </span>
          </div>
        </Tooltip>
        <div className={classes.selectionRight}>
          <TextField
            variant="outlined"
            className={classes.numberInput}
            inputProps={{ className: classes.numberInputClassName }}
            placeholder={'0.0'}
            onChange={change}
            value={selection.weight}
          />
          <div onClick={crossClick} className={classes.cross}>
            <Icon fontSize={'small'} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { classes, className, handleInputChange, values } = this.props;

    return (
      <div className={classes.container}>
        <TextField
          className={classNames(classes.input, className)}
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          label={this.props.label}
        />
        <div className={classes.selectedContainer}>
          <div className={classes.selectionContainer}>
            {values.map(this.renderSelectedSuggestion)}
          </div>
          {this.state.open && (
            <div className={classes.suggestionRefDiv} ref={this.suggestions}>
              <Paper className={classes.suggestionWrapper}>
                {this.state.suggestions.map(this.renderSuggestion)}
              </Paper>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const styles = createStyles({
  container: {
    width: '100%',
    height: 260,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    flex: '0 0 auto',
  },
  selectedContainer: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginTop: 20,
    flexWrap: 'nowrap',
    width: '100%',
    overflow: 'hidden',
  },
  suggestionRefDiv: {
    position: 'absolute',
    width: '100%',
    maxHeight: '100%',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    padding: 2,
  },
  suggestionWrapper: {
    overflowY: 'auto',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    maxHeight: '100%',
  },
  suggestionContainer: {
    flex: '0 0 auto',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestion: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    cursor: 'pointer',
    flex: '1 1 0%',
    minWidth: 0,
  },
  suggestionLabel: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    paddingRight: 15,
    flex: '1 1 auto',
    width: 1,
  },
  cross: {
    flex: '0 0 auto',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberInput: {
    width: 42,
    height: 20,
    marginRight: 8,
  },
  selectionRight: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  numberInputClassName: {
    padding: '3px 0',
    marginLeft: 5,
    fontSize: 12,
  },
  selectionContainer: {
    height: '100%',
    overflowY: 'scroll',
    width: 'calc(100% + 15px)',
  },
});

export default withStyles(styles)(JobAutoComplete);
