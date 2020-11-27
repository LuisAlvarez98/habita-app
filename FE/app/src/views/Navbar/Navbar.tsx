import React from "react";
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

  const pushRegister = () => {
    history.push("/register");
  };

  const pushLogin = () => {
    history.push("/login");
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
            <ProfileHUD />
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
