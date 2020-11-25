import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import HabitItem from "./Habit/HabitItem";
import FriendItem from "./FriendItem/FriendItem";
import Button from "@material-ui/core/Button";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 16px;
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

const mockDataHabits = [
  { habitId: 1, title: "Habit 1", coins: 200 },
  { habitId: 2, title: "Habit 2", coins: 250 },
];

const mockDataFriends = [
  {
    image: "https://www.abeautifulsite.net/uploads/2014/08/bit-face.png",
    name: "Luis Alvarez",
  },
  {
    image: "https://www.abeautifulsite.net/uploads/2014/08/bit-face.png",
    name: "David Cantu",
  },
];

const Dashboard = () => {
  return (
    <MainContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
          <Container>
            <Title>Habits</Title>
            <Subtitle>Daily</Subtitle>
            {mockDataHabits.map((item) => {
              return <HabitItem title={item.title} coins={item.coins} />;
            })}
            <Subtitle>Weekly</Subtitle>
            {mockDataHabits.map((item) => {
              return <HabitItem title={item.title} coins={item.coins} />;
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
            >
              See more
            </Button>
          </Container>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Container>
            <Title>Quests</Title>
            {mockDataHabits.map((item) => {
              return <HabitItem title={item.title} coins={item.coins} />;
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
            >
              See more
            </Button>
          </Container>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Container>
            <Title>Friends</Title>
            {mockDataFriends.map((item) => {
              return <FriendItem image={item.image} name={item.name} />;
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
            >
              See more
            </Button>
            <Title>Group quests</Title>
            {mockDataHabits.map((item) => {
              return <HabitItem title={item.title} coins={item.coins} />;
            })}
          </Container>
        </Grid>
      </Grid>
    </MainContainer>
  );
};
export default Dashboard;