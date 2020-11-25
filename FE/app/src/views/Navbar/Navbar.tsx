import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ProfileHUD from "./ProfileHUD/ProfileHUD";
import Logo from "../../img/logo.png";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const CustomNavbar = styled(AppBar)`
  background-color: transparent;
`;
const LogoImage = styled.img`
  width: 128px;
  height: 64px;
`;
const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
    </div>
  );
};
export default Navbar;
