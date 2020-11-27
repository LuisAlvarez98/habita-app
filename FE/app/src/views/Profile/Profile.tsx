import React, { useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import HabitDone from "./HabitDone"

const MainContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(50, 51, 63,1);
`;

const Container = styled.div`
  background-color: rgba(196, 196, 196, 0.5);
  border-radius: 32px;
  height: auto;
  margin: 5px;
  padding: 15px;
  border-width: 2px;
  border-style: solid;
  border-color: black;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
`;

const LogoImage = styled.img`
  width: 25vw;
  height: 50vh;
`;

const Box = styled.div`
  width: 40vw;
  height: 30vh;
  background-color: rgba(67, 68, 74,1);
  border-radius: 32px;
  height: auto;
  margin: 5px;
  padding: 15px;
  text-align: center;
`;


const mockDataHabits = [
  { habitId: 1, title: "Habit 1", coins: 200 },
  { habitId: 2, title: "Habit 2", coins: 250 },
];

const mockDataUser = 
  {
    image: "https://www.abeautifulsite.net/uploads/2014/08/bit-face.png",
    name: "Luis Alvarez",
  }
;

const Profile = () => {
  useEffect(() => {}, []);

  return (
    
    <MainContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
          <Container>
            <Title>{mockDataUser.name}</Title>
            <LogoImage src={mockDataUser.image}></LogoImage>
            <Button
              variant="contained"
              style={{
                marginTop: "20px",
                borderRadius: 35,
                backgroundColor: "rgba(250, 87, 65)",
                padding: "14px 18px",
                fontSize: "14px",
                fontWeight: "bold",
                width: "150px",
                color: "#fff",
              }}
            >
              Edit Profile
            </Button>
          </Container>
        </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Container>
              <Title>Habits</Title>
              <Grid container direction="column" justify="center" alignItems="center" >
              <Box>
              {mockDataHabits.map((item, index) => {
              return (
                <HabitDone key={index} title={item.title} coins={item.coins} />
              );
            })}
              </Box>
              </Grid>
            </Container>
          </Grid>
      </Grid>
    </MainContainer>
  );
};
export default Profile;
