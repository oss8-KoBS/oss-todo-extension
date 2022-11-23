import { useEffect, useState } from "react";
import styled from "styled-components";
import CurrCalendar from "../Components/ClockApp/CurrCalendar";
import CurrWeather from "../Components/ClockApp/CurrWeather";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  /* width */
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  /* Track */
  &::-webkit-scrollbar-corner,
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.cardColor};
    border-radius: 5px;
  }
`;
const Clock = styled.h1`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  margin-top: 30px;
  color: white;
`;
const BoxWrapper = styled.div`
  width: 100%;
  height: calc(100% - 210px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 60px;
`;

function ClockApp() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Wrapper>
      <Clock>{time.toLocaleTimeString("en-US")}</Clock>
      <BoxWrapper>
        <Box>
          <CurrWeather />
        </Box>
        <Box>
          <CurrCalendar />
        </Box>
      </BoxWrapper>
    </Wrapper>
  );
}

export default ClockApp;
