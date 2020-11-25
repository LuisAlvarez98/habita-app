import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const Cell = styled.div`
  height: 40px;
  width: 100%;
  background-color: #c4c4c4;
  display: flex;
  border-radius: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  &:hover {
    background-color: grey;
  }
`;

const CheckButton = styled.div`
  background-color: white;
  height: 24px;
  width: 24px;
  border-radius: 16px;
  &:hover {
    background-color: red;
  }
`;
interface HabitItemProps {
  title: string;
  coins: number;
}
const HabitItem = (props: HabitItemProps) => {
  return (
    <div>
      <Cell>
        <Grid container spacing={0}>
          <Grid
            item
            xs={3}
            style={{
              alignSelf: "center",
              textAlign: "left",
              color: "white",
              paddingLeft: "15px",
            }}
          >
            {props.title}
          </Grid>
          <Grid
            item
            xs={6}
            style={{ alignSelf: "center", textAlign: "center", color: "white" }}
          >
            {props.coins}
          </Grid>
          <Grid
            item
            xs={3}
            style={{ alignSelf: "center", textAlign: "right", color: "white" }}
          >
            <CheckButton></CheckButton>
          </Grid>
        </Grid>
      </Cell>
    </div>
  );
};
export default HabitItem;
