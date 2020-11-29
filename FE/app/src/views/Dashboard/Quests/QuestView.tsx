import React, { useEffect } from "react";
import styled from "styled-components";

import { Scrollbars } from "react-custom-scrollbars";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import axios from "axios";
import { Habit, Quest, User } from "../../Interfaces/interfaces";
import "react-datepicker/dist/react-datepicker.css";
import QuestItem from "./QuestItem";

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
  const [userId, setUserId] = React.useState("");
  const [habits, setHabits] = React.useState<Habit[]>([]);
  const [user, setUser] = React.useState<User>({
    coins: 0,
    experience: 0,
    fullName: "",
    hitpoints: 100,
    level: 1,
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const classes = useStyles();
  useEffect(() => {
    getQuests();

    const accessToken = localStorage
      .getItem("accessToken")!
      .replace(/['"]+/g, "");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get("http://localhost:8080/api/user/me", config)
      .then((response) => {
        setUserId(response.data._id);
        getUserInfo(response.data._id);
      })
      .catch((e) => {
        // Capturamos los errores
      });
  }, []);

  const getUserInfo = (userId: string) => {
    axios
      .get(`http://localhost:8080/api/user/info/${userId}`)
      .then((response) => {
        setUser(response.data[0]);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
            {!isLoading && getData().length > 0 ? (
              getData().map((item, index) => {
                return (
                  <QuestItem
                    key={index}
                    title={item.title}
                    coins={item.coins}
                    _id={item._id}
                    status={item.status}
                    userId={userId}
                    completedQuests={user.completedQuests}
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
