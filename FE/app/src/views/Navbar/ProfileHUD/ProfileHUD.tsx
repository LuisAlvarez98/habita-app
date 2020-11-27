import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { User } from "../../Interfaces/interfaces";
const AvatarImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 30px;
  margin-right: 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileInfoItem = styled.p`
  padding: 0;
  margin: 0;
  text-align: left;
  font-size: 12px;
`;

const HPBar = styled.div`
  background-color: green;
  height: 5px;
  width: 160px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ExpBar = styled.div`
  background-color: brown;
  height: 5px;
  width: 160px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const BarText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 12px;
  text-align: right;
`;
interface ProfileHUDProps {
  user: User;
}
const ProfileHUD = (props: ProfileHUDProps) => {
  const { fullName, level, coins } = props.user;

  return (
    <Container>
      <AvatarImage src="https://www.abeautifulsite.net/uploads/2014/08/bit-face.png" />
      <div>
        <ProfileInfoItem>{fullName}</ProfileInfoItem>
        <ProfileInfoItem>Level {level}</ProfileInfoItem>
        <ProfileInfoItem>{coins} coins</ProfileInfoItem>
      </div>
      <div style={{ marginLeft: "3em" }}>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <HPBar></HPBar>
          </Grid>
          <Grid item xs={4}>
            {" "}
            <BarText>HP </BarText>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <ExpBar></ExpBar>
          </Grid>
          <Grid item xs={4}>
            {" "}
            <BarText>EXP</BarText>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
export default ProfileHUD;
