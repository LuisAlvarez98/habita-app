import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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

const AvatarImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 16px;
`;

interface FriendItemProps {
  image: string;
  name: string;
}
const FriendItem = (props: FriendItemProps) => {
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
              paddingLeft: "10px",
            }}
          >
            <AvatarImage src={props.image} />
          </Grid>
          <Grid
            item
            xs={6}
            style={{ alignSelf: "center", textAlign: "left", color: "white" }}
          >
            {props.name}
          </Grid>
          <Grid
            item
            xs={3}
            style={{ alignSelf: "center", textAlign: "center", color: "white" }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Grid>
        </Grid>
      </Cell>
    </div>
  );
};
export default FriendItem;
