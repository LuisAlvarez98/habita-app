import React, { useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import HabitItem from "./Habit/HabitItem";
import FriendItem from "./FriendItem/FriendItem";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Habit, Quest } from "../Interfaces/interfaces";

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
      .get("http://localhost:8080/api/user/me", config)
      .then((response) => {
        getHabits(response.data._id);
        getQuests();
        setUserId(response.data._id);
      })
      .catch((e) => {
        // Capturamos los errores
      });
  }, []);
  const getHabits = (userId: string) => {
    axios
      .get(`http://localhost:8080/api/habits/${userId}`)
      .then((response) => {
        setHabits(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getQuests = () => {
    axios
      .get(`http://localhost:8080/api/quests/`)
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
    if (habits.length >= 0) {
      const dailyHabits = habits.filter(
        (item: Habit) => item.fequencyDescription === "daily"
      );
      return dailyHabits.slice(0, 2);
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
            <Title>Habits</Title>
            <Subtitle>Daily</Subtitle>
            {getDailyHabits().map((item, index) => {
              return (
                <HabitItem
                  key={index}
                  title={item.title}
                  coins={item.coins}
                  _id={item._id}
                />
              );
            })}
            <Subtitle>Weekly</Subtitle>
            {getWeeklyHabits().map((item, index) => {
              return (
                <HabitItem
                  key={index}
                  title={item.title}
                  coins={item.coins}
                  _id={item._id}
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
              onClick={pushToHabits}
            >
              See more
            </Button>
          </Container>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Container>
            <Title>Quests</Title>
            {quests.slice(0, 2).map((item, index) => {
              return (
                <HabitItem
                  key={index}
                  title={item.title}
                  coins={item.coins}
                  _id={item._id}
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
              See more
            </Button>
          </Container>
        </Grid>
      </Grid>
    </MainContainer>
  );
};
export default Dashboard;
