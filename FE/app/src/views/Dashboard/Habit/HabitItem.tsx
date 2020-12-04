import React, { useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Coin from "../../../img/coin.png";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { Habit } from "../../Interfaces/interfaces";
import CreateIcon from "@material-ui/icons/Create";
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

const EditButton = styled(Button)`
  min-width: 32px;
  width: 32px;
  height: 32px;
  margin-right: 10px;
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
  _id: string;
  status: string;
  handleEdit: (habit: Habit) => void;
  habit: Habit;
}
const HabitItem = (props: HabitItemProps) => {
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    if (props.status === "Completed") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    const res = await axios
      .put(
        `https://habita-app.herokuapp.com/api/habit/confirm/${props._id}`,
        {}
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) console.log("Habit not found");
      });
    window.location.reload();
  };

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
            <img width="16px" height="16px" src={Coin} />
            {props.coins}
          </Grid>
          <Grid></Grid>
          <Grid
            item
            xs={3}
            style={{ alignSelf: "center", textAlign: "right", color: "white" }}
          >
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            {props.status === "Completed" ? (
              <EditButton
                variant="contained"
                onClick={() => props.handleEdit(props.habit)}
                disabled={props.status === "Completed"}
                style={{
                  borderRadius: 35,
                  backgroundColor: "grey",
                  fontSize: "7px",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                <CreateIcon style={{ fontSize: "16px" }} />
              </EditButton>
            ) : (
              <EditButton
                variant="contained"
                onClick={() => props.handleEdit(props.habit)}
                disabled={props.status === "Completed"}
                style={{
                  borderRadius: 35,
                  backgroundColor: "red",
                  fontSize: "7px",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                <CreateIcon style={{ fontSize: "16px" }} />
              </EditButton>
            )}
          </Grid>
        </Grid>
      </Cell>
    </div>
  );
};
export default HabitItem;
