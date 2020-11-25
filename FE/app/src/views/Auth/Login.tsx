import React from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import { MuiThemeProvider, createMuiTheme, makeStyles} from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';

var userData = {
  email: "",
  password: ""
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#35A8A4",
    },
    secondary: {
      main: "#f44336",
    },
  },
});



const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  color: white;
  height: 750px;
  width: 100%;
`;



const TextFieldWrapper = styled(TextField)`
  fieldset {
    border-radius: 50px;
    color: white;
  },
  .MuiInputBase-input{
    color: white;
  }
  
`;

const Login = () => {
  let history = useHistory();
  
  function pushRegister() {
    history.push("/register");
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Container>
      <div>
        <h1>Login</h1>
        <div className="login-form">
          <form id="login-form">
            <div>
            <TextFieldWrapper
            style = {{
              marginBottom: "1em",
            }}
                id="outlined-basic"
                label="Email"
                placeholder="example@email.com"
                variant="outlined"
            />
            </div>
            <TextFieldWrapper
              id="outlined-basic"
              label="Password"
              placeholder="Password"
              variant="outlined"
              type="password"
            />
            <div>
            <Button variant="contained" 
                  style={{
                    marginTop: "3em",
                    borderRadius: 35,
                    padding: "14px 18px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    width: "150px",
                  }}
              color="primary">
              Sign in
            </Button>
            </div>
            <small>You don't have an account?</small>
            <Button onClick={pushRegister} color="secondary">Register now!</Button>
          </form>
        </div>
      </div>
      </Container>
    </MuiThemeProvider>
  );
};
export default Login;
