import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const Cell = styled.div`
  height: 40px;
  width: 100%;
  background-color: #646464;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  &:hover {
    background-color: grey;
  }
`;

interface HabitItemProps {
  title: string;
  coins: number;
}
const HabitDone = (props: HabitItemProps) => {
  return (
    <div>
      <Cell>
        <Grid container spacing={0}>
          <Grid
            item
            xs={6}
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
        </Grid>
      </Cell>
    </div>
  );
};
export default HabitDone;
