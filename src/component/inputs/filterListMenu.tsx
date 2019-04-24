import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    maxWidth: 300,
    maxHeight: 65,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop:14,
  },
  list: {
    borderRadius: 10,
  },
  listItem: {
    borderRadius: 10,
    paddingRight: 0,
  },
};

interface Props {
  classes: any;
  onChangeType: (type: string, index: number) => void;
  selectedIndex: number;
}

const options = {
  options: [
    { value: 'Aucun' },
    { key: 'professional', value: 'professionnel' },
    { key: 'personal', value: 'personnel' },
  ],
};

class SimpleListMenu extends React.Component<Props> {
  state = {
    anchorEl: null,
  };

  handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
    key: string | undefined,
  ) => {
    if (key) {
      this.setState({ anchorEl: null });
      this.props.onChangeType(key, index);
    }
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <List component="nav" disablePadding={true} className={classes.list}>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="When device is locked"
            onClick={this.handleClickListItem}
            className={classes.listItem}
          >
            <ListItemText
              primary="Catégorie"
              secondary={
                this.props.selectedIndex !== 0
                  ? options.options[this.props.selectedIndex].value
                  : false
              }
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.options.map(
            (option: { value: string; key?: string }, index: number) => (
              <MenuItem
                key={option.value}
                disabled={index === 0}
                selected={index === this.props.selectedIndex}
                onClick={event =>
                  this.handleMenuItemClick(event, index, option.key)
                }
              >
                {option.value}
              </MenuItem>
            ),
          )}
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleListMenu);
