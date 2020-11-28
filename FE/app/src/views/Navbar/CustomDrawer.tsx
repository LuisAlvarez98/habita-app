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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";

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
  }
`;

export default function CustomDrawer() {
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
      <List>
        <ListItem button key={"Dashboard"} onClick={pushToDashboard}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <ListItem button key={"Habits"} onClick={pushToHabits}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Habits"} />
        </ListItem>
        <ListItem button key={"Quests"} onClick={pushToQuests}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Quests"} />
        </ListItem>
        <ListItem button key={"Profile"} onClick={pushToProfile}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={"Logout"} onClick={logoutUser}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
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
}
