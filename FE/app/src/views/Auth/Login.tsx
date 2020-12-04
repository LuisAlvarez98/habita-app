import React from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
import { useLocalStorage } from "use-hooks";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

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

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history.push("/dashboard");
      window.location.reload();
    } else {
      console.log("No access token");
    }
  }, []);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& label.Mui-focused": {
          color: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "white",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
      },
      floatingLabelFocusStyle: {
        color: "white",
      },
    })
  );
  const classes = useStyles();

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
          <h1>Login</h1>
          <div className="login-form">
            <form id="login-form">
              <div>
                <TextFieldWrapper
                  style={{
                    marginBottom: "1em",
                  }}
                  id="outlined-basic"
                  label="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  variant="outlined"
                  className={classes.root}
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                />
              </div>
              <TextFieldWrapper
                id="outlined-basic"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                variant="outlined"
                className={classes.root}
                type="password"
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
              />
              <div>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "3em",
                    borderRadius: 35,
                    padding: "14px 18px",
                    fontSize: "14px",
                    color: "white",
                    fontWeight: "bold",
                    width: "175px ",
                  }}
                  color="primary"
                  onClick={handleLogin}
                >
                  Iniciar sesión
                </Button>
              </div>
              <small>¿No tienes cuenta?</small>
              <Button onClick={pushRegister} color="secondary">
                Registrarse ya!
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </MuiThemeProvider>
  );
};
export default Login;
