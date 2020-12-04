import React, { useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import HabitItem from "./Habit/HabitItem";
import FriendItem from "./FriendItem/FriendItem";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Habit, Quest, User } from "../Interfaces/interfaces";
import QuestItem from "./Quests/QuestItem";
import HabitItemDash from "./Habit/HabitItemDash";
import CreateIcon from "@material-ui/icons/Create";

const MainContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  height: 100vh;
`;

const Container = styled.div`
  background-color: rgba(196, 196, 196, 0.5);
  border-radius: 32px;
  height: auto;
  margin: 5px;
  padding: 15px;
`;

const Title = styled.h1`
  color: white;
  text-align: left;
`;

const Subtitle = styled.h2`
  color: white;
  text-align: left;
`;

const Dashboard = () => {
  let history = useHistory();
  const [userId, setUserId] = React.useState("");
  const [habits, setHabits] = React.useState<Habit[]>([]);
  const [quests, setQuests] = React.useState<Quest[]>([]);
  const [user, setUser] = React.useState<User>({
    coins: 0,
    experience: 0,
    fullName: "",
    hitpoints: 100,
    level: 1,
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const accessToken = localStorage
      .getItem("accessToken")!
      .replace(/['"]+/g, "");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get("https://habita-app.herokuapp.com/api/user/me", config)
      .then((response) => {
        getHabits(response.data._id);
        getQuests();
        setUserId(response.data._id);
        getUserInfo(response.data._id);
      })
      .catch((e) => {
        // Capturamos los errores
      });
  }, []);

  const getUserInfo = (userId: string) => {
    axios
      .get(`https://habita-app.herokuapp.com/api/user/info/${userId}`)
      .then((response) => {
        setUser(response.data[0]);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getHabits = (userId: string) => {
    axios
      .get(`https://habita-app.herokuapp.com/api/habits/${userId}`)
      .then((response) => {
        setHabits(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getQuests = () => {
    axios
      .get(`https://habita-app.herokuapp.com/api/quests/`)
      .then((response) => {
        setQuests(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const pushToHabits = () => {
    history.push("/habits");
  };

  const pushToQuests = () => {
    history.push("/quests");
  };

  const getDailyHabits = () => {
    if (habits.length > 0) {
      const dailyHabits = habits.filter(
        (item: Habit) => item.fequencyDescription === "daily"
      );
      return dailyHabits.slice(0, 2);
    } else {
    }
    return [];
  };

  const getWeeklyHabits = () => {
    if (habits.length >= 0) {
      const weeklyHabits = habits.filter(
        (item: Habit) => item.fequencyDescription === "weekly"
      );
      return weeklyHabits.slice(0, 2);
    }
    return [];
  };

  return (
    <MainContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Container>
            <Title>Hábitos</Title>
            <Subtitle>Diarios</Subtitle>
            {getDailyHabits().length > 0 ? (
              getDailyHabits().map((item, index) => {
                return (
                  <HabitItemDash
                    key={index}
                    title={item.title}
                    coins={item.coins}
                    _id={item._id}
                    status={item.status}
                  />
                );
              })
            ) : (
              <p style={{ color: "white" }}>
                Actualmente no tienes hábitos diarios.
              </p>
            )}
            <Subtitle>Semanales</Subtitle>
            {getWeeklyHabits().length > 0 ? (
              getWeeklyHabits().map((item, index) => {
                return (
                  <HabitItemDash
                    key={index}
                    title={item.title}
                    coins={item.coins}
                    _id={item._id}
                    status={item.status}
                  />
                );
              })
            ) : (
              <p style={{ color: "white" }}>
                Actualmente no tienes hábitos semanales.
              </p>
            )}
            <Button
              variant="contained"
              style={{
                marginTop: "20px",
                borderRadius: 35,
                backgroundColor: "red",
                padding: "14px 18px",
                fontSize: "14px",
                fontWeight: "bold",
                width: "150px",
                color: "#fff",
              }}
              onClick={pushToHabits}
            >
              Ver más
            </Button>
          </Container>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Container>
            <Title>Quests</Title>
            {!isLoading &&
              quests.slice(0, 2).map((item, index) => {
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
              })}
            <Button
              variant="contained"
              style={{
                marginTop: "20px",
                borderRadius: 35,
                backgroundColor: "red",
                padding: "14px 18px",
                fontSize: "14px",
                fontWeight: "bold",
                width: "150px",
                color: "#fff",
              }}
              onClick={pushToQuests}
            >
              Ver más
            </Button>
          </Container>
        </Grid>
      </Grid>
    </MainContainer>
  );
};
export default Dashboard;
