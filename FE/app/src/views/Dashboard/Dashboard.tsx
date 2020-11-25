import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: #c4c4c4;
  border-radius: 32px;
  height: 500px;
  width: 300px;
  margin: 5px;
`;

const Dashboard = () => {
  return (
    <MainContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Container>
            <h1>Habits</h1>
          </Container>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Container>
            <h1>Quests</h1>
          </Container>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Container>
            <h1>Friends</h1>
          </Container>
        </Grid>
      </Grid>
    </MainContainer>
  );
};
export default Dashboard;
