import React from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
import { useLocalStorage } from "use-hooks";
import { useEffect } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
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
        .post("https://habita-app.herokuapp.com/api/user/register", {
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
      .post("https://habita-app.herokuapp.com/api/user/login", {
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
          <h1>Registro</h1>
          <div className="login-form">
            <form id="login-form">
              <div>
                <TextFieldWrapper
                  style={{
                    marginBottom: "1em",
                  }}
                  id="outlined-basic"
                  label="Nombre"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nombre"
                  variant="outlined"
                  className={classes.root}
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                />
              </div>
              <div>
                <TextFieldWrapper
                  style={{
                    marginBottom: "1em",
                  }}
                  id="outlined-basic"
                  label="Correo electrónico"
                  value={email}
                  className={classes.root}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                />
              </div>
              <TextFieldWrapper
                style={{
                  marginBottom: "1em",
                }}
                id="outlined-basic"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className={classes.root}
                variant="outlined"
                type="password"
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
              />
              <div></div>
              <TextFieldWrapper
                id="outlined-basic"
                label="Confirmar contraseña"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                placeholder="Contraseña"
                className={classes.root}
                variant="outlined"
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
                  onClick={handleRegister}
                >
                  Registrarse
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
