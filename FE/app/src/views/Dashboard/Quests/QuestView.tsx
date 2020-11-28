import React, { useEffect } from "react";
import styled from "styled-components";

import { Scrollbars } from "react-custom-scrollbars";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import axios from "axios";
import { Habit, Quest } from "../../Interfaces/interfaces";
import DatePicker from "react-datepicker";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import "react-datepicker/dist/react-datepicker.css";
import HabitItem from "../Habit/HabitItem";

const MainContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  height: 100vh;
`;

const QuestContainer = styled.div`
  background-color: rgba(196, 196, 196, 0.5);
  width: 80%;
  height: 500px;
  border-radius: 32px;
  align-self: center;
  padding: 16px;
`;

const Title = styled.h1`
  color: white;
  text-align: left;
`;
const TextFieldWrapper = styled(TextField)`
  width: 300px;
  fieldset {
    border-radius: 50px;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    paper: {
      width: 400,
      height: 525,
      backgroundColor: "rgba(196, 196, 196, 1)",
    },
  })
);

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

const HabitView = () => {
  const [searchText, setSearchText] = React.useState("");
  const [quests, setQuests] = React.useState<Quest[]>([]);
  const classes = useStyles();

  useEffect(() => {
    getQuests();
  }, []);

  const getQuests = () => {
    axios
      .get(`http://localhost:8080/api/quests`)
      .then((response) => {
        setQuests(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getData = () => {
    if (searchText !== "") {
      return quests.filter((item) => item.title.includes(searchText));
    }
    return quests;
  };

  return (
    <MuiThemeProvider theme={theme}>
      <MainContainer>
        <QuestContainer>
          <div>
            <Title>Your quests</Title>
            <TextFieldWrapper
              id="outlined-basic"
              label="Type to search"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Scrollbars style={{ height: 300 }}>
            {getData().length > 0 ? (
              getData().map((item, index) => {
                return (
                  <HabitItem
                    key={index}
                    title={item.title}
                    coins={item.coins}
                    _id={item._id}
                  />
                );
              })
            ) : (
              <p style={{ color: "white" }}>
                No tienes actualmente quests o no han sido encontrados.
              </p>
            )}
          </Scrollbars>
        </QuestContainer>
      </MainContainer>
    </MuiThemeProvider>
  );
};
export default HabitView;
