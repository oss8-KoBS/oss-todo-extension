import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { navState } from "../atoms";

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.button`
  width: 100px;
  height: 50px;
  background-color: transparent;
  border: none;
`;
const ButtonTitle = styled.h1`
  width: 100px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
const ButtonIndicator = styled(motion.div)`
  width: 100px;
  height: 2px;
  background-color: red;
`;

function Navigator() {
  const [currentNav, setCurrentNav] = useRecoilState(navState);

  return (
    <Wrapper>
      <ButtonWrapper onClick={() => setCurrentNav("THEME")}>
        <ButtonTitle>Theme</ButtonTitle>
        {currentNav === "THEME" ? (
          <ButtonIndicator layoutId="indicator" />
        ) : null}
      </ButtonWrapper>
      <ButtonWrapper onClick={() => setCurrentNav("TODO")}>
        <ButtonTitle>Todo</ButtonTitle>
        {currentNav === "TODO" ? (
          <ButtonIndicator layoutId="indicator" />
        ) : null}
      </ButtonWrapper>
      <ButtonWrapper onClick={() => setCurrentNav("CLOCK")}>
        <ButtonTitle>Clock</ButtonTitle>
        {currentNav === "CLOCK" ? (
          <ButtonIndicator layoutId="indicator" />
        ) : null}
      </ButtonWrapper>
    </Wrapper>
  );
}

export default Navigator;
