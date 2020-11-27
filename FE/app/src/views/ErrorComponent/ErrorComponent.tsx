import React from "react";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  color: white;
  height: 750px;
  width: 100%;
`;

const ErrorComponent = () => {
  return (
    <Container>
      <p>Error 404</p>
    </Container>
  );
};
export default ErrorComponent;
