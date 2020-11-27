import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ProfileHUD from "./ProfileHUD/ProfileHUD";
import Logo from "../../img/logo.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { User } from "../Interfaces/interfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const CustomNavbar = styled(AppBar)`
  background-color: transparent;
  position: absolute;
`;
const LogoImage = styled.img`
  width: 128px;
  height: 64px;
`;

const Navbar = () => {
  let history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState<User>({
    coins: 0,
    experience: 0,
    fullName: "",
    hitpoints: 100,
    level: 1,
  });

  useEffect(() => {
    me();
  }, []);
  //pushes to register
  const pushRegister = () => {
    history.push("/register");
  };
  //pushes to log in
  const pushLogin = () => {
    history.push("/login");
  };
  //this function gets the info of the user.
  const getUserInfo = (userId: string) => {
    axios
      .get(`http://localhost:8080/api/user/info/${userId}`)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // this function obtains the userId with the token.
  const me = async () => {
    const accessToken = localStorage
      .getItem("accessToken")!
      .replace(/['"]+/g, "");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get("http://localhost:8080/api/user/me", config)
      .then((response) => {
        getUserInfo(response.data._id);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className={classes.root}>
      {localStorage.getItem("accessToken") ? (
        <CustomNavbar elevation={0} position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <ProfileHUD user={user} />
            <LogoImage src={Logo}></LogoImage>
          </Toolbar>
        </CustomNavbar>
      ) : (
        <CustomNavbar elevation={0} position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <a href="/">
                <LogoImage src={Logo} />
              </a>
            </Typography>
            <Button color="inherit" onClick={pushRegister}>
              Register
            </Button>
            <Button color="inherit" onClick={pushLogin}>
              Login
            </Button>
          </Toolbar>
        </CustomNavbar>
      )}
    </div>
  );
};
export default Navbar;
