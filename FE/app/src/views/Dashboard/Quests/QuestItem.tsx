import React, { useEffect } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Coin from "../../../img/coin.png";
import Checkbox from "@material-ui/core/Checkbox";
import { Quest } from "../../Interfaces/interfaces";
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
interface QuestItemProps {
  title: string;
  coins: number;
  _id: string;
  status: string;
  userId: string;
  completedQuests?: [Quest];
}
const QuestItem = (props: QuestItemProps) => {
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    props.completedQuests && findQuest(props.completedQuests, props._id)
      ? setChecked(true)
      : setChecked(false);
  }, []);

  const findQuest = (questList: [Quest], id: string) => {
    let ans = false;
    questList.forEach((q) => {
      console.log(id);
      console.log(q._id.toString());
      if (q._id.toString() === id) {
        ans = true;
      }
    });
    return ans;
  };
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    const res = await axios
      .put(
        `https://habita-app.herokuapp.com/api/quests/${props._id}/${props.userId}`,
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
          </Grid>
        </Grid>
      </Cell>
    </div>
  );
};
export default QuestItem;
