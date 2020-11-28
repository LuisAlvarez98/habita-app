import React from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
import { useLocalStorage } from "use-hooks";
import { useEffect } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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

const Register = () => {
  let history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cPassword, setCPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [accessToken, setAccessToken] = useLocalStorage<string>(
    "accessToken",
    ""
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string>(
    "refreshToken",
    ""
  );
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history.push("/dashboard");
    } else {
      console.log("No access token");
    }
  }, []);

  const handleRegister = async () => {
    var readyToRegister: boolean = false;

    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      ) &&
      password === cPassword &&
      fullName !== ""
    ) {
      readyToRegister = true;
    } else {
      console.log("Invalid info.");
    }
    if (readyToRegister) {
      const res = await axios
        .post("http://localhost:8080/api/user/register", {
          email,
          password,
          fullName,
        })
        .then((res) => {
          if (res.status === 200) handleLogin();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
          pushDashboard();
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.response.status === 404) console.log("Incorrect email");
        if (err.response.status === 400) console.log("Incorrect password");
      });
  };

  const pushDashboard = () => {
    history.push("/dashboard");
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Container>
        <div>
          <h1>Register</h1>
          <div className="login-form">
            <form id="login-form">
              <div>
                <TextFieldWrapper
                  style={{
                    marginBottom: "1em",
                  }}
                  id="outlined-basic"
                  label="Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Name"
                  variant="outlined"
                />
              </div>
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
                style={{
                  marginBottom: "1em",
                }}
                id="outlined-basic"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                variant="outlined"
                type="password"
              />
              <div></div>
              <TextFieldWrapper
                id="outlined-basic"
                label="ConfirmPassword"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
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
                    color: "white",
                    fontWeight: "bold",
                    width: "150px",
                  }}
                  color="primary"
                  onClick={handleRegister}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </MuiThemeProvider>
  );
};
export default Register;
