import React from "react";
import styled from "styled-components";
import Error404 from "../../img/error404.png";
const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  color: white;
  height: 100vh;
  width: 100%;
`;

const ErrorComponent = () => {
  return (
    <Container>
      <img width="100%" height="20%" src={Error404} />
    </Container>
  );
};
export default ErrorComponent;
