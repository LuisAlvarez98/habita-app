import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const Title = styled.h1`
  color: white;
`;
const Subtitle = styled.h1`
  color: white;
`;
const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  height: 100vh;
`;
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

const Home = () => {
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history.push("/dashboard");
    } else {
      console.log("No access token");
    }
  }, []);

  const pushRegister = () => {
    history.push("/register");
    window.location.reload();
  };
  return (
    <MuiThemeProvider theme={theme}>
      <Container>
        <Title>Bienvenid@ a Habita!</Title>
        <Subtitle>
          Una manera interactiva y divertida en donde podras crear y mejorar tus
          habitos personales!
        </Subtitle>
        <Button
          variant="contained"
          color={"primary"}
          style={{
            marginTop: "20px",
            borderRadius: 35,
            padding: "14px 18px",
            fontSize: "14px",
            fontWeight: "bold",
            width: "200px",
            alignSelf: "center",
            color: "#fff",
          }}
          onClick={pushRegister}
        >
          Pruebala ahora!
        </Button>
      </Container>
    </MuiThemeProvider>
  );
};
export default Home;
