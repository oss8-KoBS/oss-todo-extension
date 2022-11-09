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
  padding: 1px 0;
`;
const ButtonTitle = styled.h1<{ isSelected: boolean }>`
  width: 100px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.isSelected ? props.theme.cardColor : props.theme.textColor};
  background-color: ${(props) =>
    props.isSelected ? "#00000010" : "transparent"};
  transition: color 0.3s ease-out, background-color 0.3s ease-out;
  &:hover {
    color: ${(props) => props.theme.cardColor};
  }
`;
const ButtonIndicator = styled(motion.div)`
  width: 100px;
  height: 2px;
  background-color: ${(props) => props.theme.cardColor};
`;

function Navigator() {
  const [currentNav, setCurrentNav] = useRecoilState(navState);

  return (
    <Wrapper>
      <ButtonWrapper onClick={() => setCurrentNav("THEME")}>
        <ButtonTitle isSelected={currentNav === "THEME"}>Theme</ButtonTitle>
        {currentNav === "THEME" ? (
          <ButtonIndicator layoutId="indicator" />
        ) : null}
      </ButtonWrapper>
      <ButtonWrapper onClick={() => setCurrentNav("TODO")}>
        <ButtonTitle isSelected={currentNav === "TODO"}>Todo</ButtonTitle>
        {currentNav === "TODO" ? (
          <ButtonIndicator layoutId="indicator" />
        ) : null}
      </ButtonWrapper>
      <ButtonWrapper onClick={() => setCurrentNav("CLOCK")}>
        <ButtonTitle isSelected={currentNav === "CLOCK"}>Clock</ButtonTitle>
        {currentNav === "CLOCK" ? (
          <ButtonIndicator layoutId="indicator" />
        ) : null}
      </ButtonWrapper>
    </Wrapper>
  );
}

export default Navigator;
