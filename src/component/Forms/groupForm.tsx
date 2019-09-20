import React from "react";
import { withStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import Input from "@material-ui/core/Input";
import { IUser, IGroup } from "requests";
import { Button } from "@material-ui/core";
import { createGroupParams } from "requests";

interface Props {
  classes?: any;
  firstName: string;
  lastName: string;
  id: string;
  onSubmitHandler: (
    params: { title: string; advisorId: string; code: string; users: any[] }
  ) => void;
  group: IGroup;
}

class GroupForm extends React.Component<Props> {
  state = {
    title: this.props.group.title || "",
    code:this.props.group.code || ""
  };
  handlechangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  };

  generetaCode = () => {
    let code = Math.floor(100000 + Math.random() * 900000);
    this.setState({ code: `${this.userIntilas}${code.toString()}` });
  };
  userIntilas =`${this.props.firstName.substr(0, 1).toUpperCase()}${this.props.lastName.substr(0,1).toUpperCase()}`

  onSubmitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (this.state.title.length > 0 && this.state.code.length > 0) {
      this.props.onSubmitHandler({
        title: this.state.title,
        code: this.state.code,
        users: [],
        advisorId: this.props.id
      });
    }
  };

  render() {
   // console.log('firstName',this.props.firstName)
    const { classes } = this.props;
    const { title, code } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <Input className={classes.input} value={title} onChange={this.handlechangeTitle} />
        </div>
        <div className={classes.codeContainer}>
          <Input className={classes.input} value={code} />
          <Button onClick={this.generetaCode}>Générer</Button>
        </div>
        <Button onClick={this.onSubmitHandler}>Valider</Button>
      </div>
    );
  }
}

const styles = () =>
  createStyles({
    container: {
      paddingBottom: 15,
      width: "100%",
      position: "relative",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: '50vh',
    },
    titleContainer: {
      width: '50%',
    },
    codeContainer: {
      width: '50%',
    },
    input: {
      width: '100%'
    }
  });

export default withStyles(styles)(GroupForm);
