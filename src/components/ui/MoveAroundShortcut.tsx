import styled from "styled-components";

const MoveAround = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  width: 13px;
  height: 13px;
  background-color: #b6b6b6;
  border: 1px solid black;
`;
const BoxRow = styled.div`
  display: flex;
`;

const MoveAroundShortcut = () => {
  return (
    <MoveAround>
      <Box />
      <BoxRow>
        <Box />
        <Box />
        <Box />
      </BoxRow>
    </MoveAround>
  );
};

export default MoveAroundShortcut;
