import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dashboard from "@material-ui/icons/AccountBalance";
import AssignmentIcon from "@material-ui/icons/Assignment";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import FaceIcon from "@material-ui/icons/Face";
import Logout from "@material-ui/icons/MeetingRoom";
import Quests from "@material-ui/icons/ContactSupport";
import { User } from "../Interfaces/interfaces";
const AvatarImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 30px;
`;
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const DrawerContainer = styled(Drawer)`
  .MuiPaper-root {
    width: 300px;
    background-color: #32343f;
    color: white;
  }
`;

interface DrawerProps {
  user: User;
}

const CustomDrawer = (props: DrawerProps) => {
  let history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor: string, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, left: open });
  };

  const pushToHabits = () => {
    history.push("/habits");
    window.location.reload();
  };

  const pushToDashboard = () => {
    history.push("/dashboard");
    window.location.reload();
  };

  const pushToQuests = () => {
    history.push("/quests");
    window.location.reload();
  };

  const pushToProfile = () => {
    history.push("/profile");
    window.location.reload();
  };

  const logoutUser = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    history.push("/");
    window.location.reload();
  };

  const list = (anchor: string) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#3b3d44",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <AvatarImage src="https://www.abeautifulsite.net/uploads/2014/08/bit-face.png" />
        <h3>{props.user.fullName}</h3>
        <p>Nivel {props.user.level}</p>
      </div>

      <List>
        <ListItem button key={"Dashboard"} onClick={pushToDashboard}>
          <ListItemIcon>
            <Dashboard style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <ListItem button key={"Hábitos"} onClick={pushToHabits}>
          <ListItemIcon>
            <AssignmentIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={"Hábitos"} />
        </ListItem>
        <ListItem button key={"Quests"} onClick={pushToQuests}>
          <ListItemIcon>
            <Quests style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={"Quests"} />
        </ListItem>
        <ListItem button key={"Perfil"} onClick={pushToProfile}>
          <ListItemIcon>
            <FaceIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={"Perfil"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={"Cerrar Sesión"} onClick={logoutUser}>
          <ListItemIcon>
            <Logout style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={"Cerrar Sesión"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <DrawerContainer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </DrawerContainer>
      </React.Fragment>
    </div>
  );
};

export default CustomDrawer;
