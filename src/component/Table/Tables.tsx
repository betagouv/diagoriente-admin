import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import DeleteIcon from "../Icons/Delete";
import EditIcon from "../Icons/Edit";
import VisualisationIcon from "../Icons/visualization";
import Input from "../inputs/input";
import Button from "@material-ui/core/Button";
import FilterListMenu from "../inputs/filterListMenu";
import TableFooter from "@material-ui/core/TableFooter";
import Chip from "@material-ui/core/Chip";

import Pagination from "./TablePagination";

import "./Tables.scss";
import users from "../../reducers/users";
import { PER_PAGE } from "../../containers/VueGlobaleContainer/VueGlobaleContainer";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import { IGroup, ListResponse } from "requests";
import {listParcoursSearch} from '../../requests/parcours';

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: 16,
    backgroundColor: "#2196f3",
    color: "#ffffff"
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto"
    },
    button: {
      margin: theme.spacing.unit * 2.5,
      flex: "0 0 auto"
    },
    extendedIcon: {
      marginRight: theme.spacing.unit
    },
    table: {
      minWidth: 700
    },
    row: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    },
    wrapperPagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end"
    },
    pagesCount: {
      borderRadius: 5,
      height: 29,
      fontWeight: 500,
      boxShadow:
        "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
    }
  });

interface HeaderRow {
  id: string;
  title: string;
  render?: (value: any) => JSX.Element | null | string;
}

interface Props<T> {
  rows: T[];
  headers: HeaderRow[];
  edit: (id: string) => void;
  delete: (id: string) => void;
  showVisualisation: (id: string) => void;
  add: () => void;
  rowsPerPage: number;
  hasEdit: boolean;
  hasDelete: boolean;
  hasAdd: boolean;
  hasPagination: boolean;
  hasVisualization: boolean;
  onChangeType: (type: string) => void;
  typeFilter: boolean;
  typeSearch: boolean;
  typeButton: boolean;
  totalPages: number;
  count: number;
  currentPage: number;
  user: boolean;
  handlePageChange: (page: number) => void;
  search: (value: string) => void;
  reset: () => void;
  classes: { [key: string]: string };
  advisor: boolean;
  groups?: ListResponse<IGroup>;
  groupSearch?: boolean;
  serachList?: (codeId: string) => void;
  groupReset?: boolean;
}

interface State {
  InputIndication: string;
  selectIndication: string;
  value: string;
  index: number;
  Numpages: number;
  group: string;
}

class Tables<T> extends React.PureComponent<Props<T>, State> {
  static defaultProps = {
    hasEdit: true,
    hasDelete: true,
    hasAdd: true,
    rowsPerPage: 1,
    hasVisualization: false,
    edit: () => {},
    delete: () => {},
    add: () => {},
    onChangeType: () => {},
    showVisualisation: () => {},
    typeFilter: false,
    typeSearch: true,
    typeButton: true,
    hasPagination: true,
    user: false,
    advisor: false,
    search: () => {},
    reset: () => {}
  };

  state: State = {
    InputIndication: "",
    selectIndication: "",
    value: "",
    index: 0,
    Numpages: PER_PAGE,
    group: ""
  };

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("de value", this.state.value);
      this.props.search(this.state.value);
    }
  };

  onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.currentTarget.value });
  };

  onChangeType = (type: string, index: number) => {
    this.setState({ index });
    this.props.onChangeType(type);
  };

  search = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("de value", this.state.value);
    this.props.search(this.state.value);
  };

  reset = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState({ value: "", index: 0 });
    this.props.reset();
  };
  resetGroup = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState({ group: "", index: 0 });
    this.props.reset();
  };

  groupSearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    this.setState({ group: event.target.value }, () =>
      console.log(this.state.group)
      
    );
    this.props.serachList &&  this.props.serachList(value);
    
  };

  renderTableBody = (
    id: string,
    row: any,
    render?: (value: any) => JSX.Element | null | string
  ) => {
    if (render) {
      return render(row[id]);
    }
    if (id === "userId") {
      return row[id]._id;
    }

    if (!this.props.user) {
      if (id === "email") {
        if (row["userId"].email) {
          return row["userId"].email;
        }
        return "--";
      }
    }
    /* else {
      if (id === 'email') {
        if (row['uniqId'].email) {
          return row['uniqId'].profile.email;
        }
      }
    } */
    return row[id];
  };
  /*  pagesCount = () => {
    let Numpages = this.props.rowsPerPage;
    this.setState({ Numpages });
    Numpages = +this.state.Numpages ;

  s
    return Numpages;
  } */

  /*  componentDidUpdate () {
    this.pagesCount();
  } */

  public render(): JSX.Element {
    const {
      classes,
      headers,
      rows,
      add,
      handlePageChange,
      currentPage,
      totalPages,
      hasAdd,
      hasDelete,
      hasEdit,
      edit,
      typeFilter,
      typeButton,
      typeSearch,
      hasPagination,
      hasVisualization,
      count,
      rowsPerPage
    } = this.props;

    return (
      <div className="table-container">
        <div className="table-component-search">
          <div className="table-component-add-search">
            {typeSearch && (
              <Input
                id="15"
                label="Chercher"
                InputIndication={this.state.InputIndication}
                value={this.state.value}
                onChangeInput={this.onChangeInput}
                onKeyDown={this.onKeyDown}
              />
            )}
            {typeButton && (
              <Button onClick={this.search} className={classes.button}>
                Recherche
              </Button>
            )}

            {typeFilter && (
              <FilterListMenu
                selectedIndex={this.state.index}
                onChangeType={this.onChangeType}
              />
            )}
            {this.state.value || this.state.index > 0 ? (
              <Button
                onClick={this.reset}
                className={classes.button}
                style={{ color: "red" }}
              >
                Annuler
              </Button>
            ) : null}
            {this.props.groupSearch ? (
              <Select
                value={this.state.group}
                onChange={this.groupSearch}
                displayEmpty
                variant="filled"
              >
                <MenuItem value="" disabled>
                  Recherche par Groupe
                </MenuItem>
                {this.props.groups &&
                  this.props.groups.data.map((el, index) => {
                    return (
                      <MenuItem key={el._id} value={el._id}>
                        {el.title}
                      </MenuItem>
                    );
                  })}
              </Select>
            ) : null}
            {this.props.groupReset && <Button
                onClick={this.resetGroup}
                className={classes.button}
                style={{ color: "red" }}
              >
                Annuler
              </Button>}
          </div>
          {hasAdd ? (
            <div className="table-component-add-icon ">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={add}
              >
                Ajouter
              </Button>
            </div>
          ) : null}
        </div>
        <Paper className={classes.root}>
          {rows.length ? (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {headers.map(header => {
                    return (
                      <CustomTableCell
                        className="table-hedear-title"
                        padding="checkbox"
                        key={header.id}
                      >
                        {header.title}
                      </CustomTableCell>
                    );
                  })}
                  <CustomTableCell
                    align="right"
                    className="table-header-title"
                    padding="checkbox"
                  />
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row: any) => {
                  return (
                    <TableRow className={classes.row} key={row._id}>
                      {headers.map(({ id, render }) => (
                        <CustomTableCell
                          component="th"
                          scope="row"
                          className="table-header-title"
                          key={id}
                          padding="checkbox"
                        >
                          {this.renderTableBody(id, row, render)}
                        </CustomTableCell>
                      ))}

                      <CustomTableCell padding="checkbox">
                        <div className="table-header-title icons-table-cell">
                          {hasEdit ? (
                            <EditIcon onClick={() => edit(row._id)} />
                          ) : null}

                          {hasVisualization ? (
                            <VisualisationIcon
                              onClick={() =>
                                this.props.showVisualisation(row._id)
                              }
                            />
                          ) : null}
                          {hasDelete ? (
                            <DeleteIcon
                              onClick={() => this.props.delete(row._id)}
                            />
                          ) : null}
                        </div>
                      </CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              {hasPagination ? (
                <TableFooter>
                  <TableRow>
                    <td colSpan={1000} className={"table-pagination-wrapper"}>
                      <div className={classes.wrapperPagination}>
                        <Chip
                          label={
                            currentPage !== totalPages
                              ? `${rowsPerPage * currentPage} / ${count}`
                              : `${count} / ${count}`
                          }
                          color="primary"
                          className={classes.pagesCount}
                        />

                        <Pagination
                          totalPages={totalPages}
                          currentPage={currentPage}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    </td>
                  </TableRow>
                </TableFooter>
              ) : null}
            </Table>
          ) : null}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Tables);
