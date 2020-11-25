import React from "react";
import { Button, TextField } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Background from '../../Images/Background.png';
import { makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#35A8A4',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

const mainBg = {
  backgroundImage: 'url(Background)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}

const Login = () => {

  return (
  <MuiThemeProvider theme={theme}>
    {/* document.body.style= {mainBg}; */}
    <div>
      <h1>Login page</h1>
      <div className="login-form">
      <form id="login-form">
          <TextField id="filled-basic" label="Usuario" variant="filled" className="login-field" />
          <br />
          <TextField id="filled-basic" label="Contraseña" variant="filled" className="login-field"/>
          <br /> <br />
         <Button variant="contained" color="primary">Sign in</Button>
         <br/>
        <small>You don't have an account?</small><Button color="secondary">Register now!</Button>
      </form>
    </div>
  </div>
 
  </MuiThemeProvider>)
};
export default Login;
