import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
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

  const pushRegister = () => {
    history.push("/register");
  };
  return (
    <MuiThemeProvider theme={theme}>
      <Container>
        <Title>Welcome to Habita</Title>
        <Subtitle>
          An interactive fun website where you will create and improve your
          habits.
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
            width: "150px",
            alignSelf: "center",
            color: "#fff",
          }}
          onClick={pushRegister}
        >
          Try it out!
        </Button>
      </Container>
    </MuiThemeProvider>
  );
};
export default Home;
