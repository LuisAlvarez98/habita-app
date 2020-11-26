import React from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
import { useLocalStorage } from "use-hooks";
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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
  }
  ,
  .MuiInputBase-input {
    color: white;
  }
`;

const Login = () => {
  let history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [accessToken, setAccessToken] = useLocalStorage<string>(
    "accessToken",
    ""
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string>(
    "refreshToken",
    ""
  );

  function pushRegister() {
    history.push("/register");
  }

  const handleLogin = async () => {
    const res = await axios
      .post("http://localhost:8080/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          const { accessToken, refreshToken } = res.data;
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) console.log("Incorrect email");
        if (err.response.status === 400) console.log("Incorrect password");
      });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Container>
        <div>
          <h1>Login</h1>
          <div className="login-form">
            <form id="login-form">
              <div>
                <TextFieldWrapper
                  style={{
                    marginBottom: "1em",
                  }}
                  id="outlined-basic"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  variant="outlined"
                />
              </div>
              <TextFieldWrapper
                id="outlined-basic"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                variant="outlined"
                type="password"
              />
              <div>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "3em",
                    borderRadius: 35,
                    padding: "14px 18px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    width: "150px",
                  }}
                  color="primary"
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
              </div>
              <small>You don't have an account?</small>
              <Button onClick={pushRegister} color="secondary">
                Register now!
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </MuiThemeProvider>
  );
};
export default Login;
