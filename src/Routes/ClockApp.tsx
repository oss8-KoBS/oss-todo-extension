import { useEffect, useState } from "react";
import styled from "styled-components";
import CurrWeather from "../Components/ClockApp/CurrWeather";

const Wrapper = styled.div`
width: 100%;
height: 100%;


content: '';
  background: url('sunset.jpg') no-repeat center center/cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  
`;
const Clock = styled.h1`
  text-align: center;
  position: relative;
  font-size: 100px;
  padding: 30px 30px 30px 30px;
  width: 100%;
`;
const Calendar_Weather_area = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;
const Box = styled.div`
  width: 100%;
  height: 100%;

  
`;

function ClockApp() {
  const [time, setTime] = useState(new Date());

  useEffect (() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Wrapper>
      <Clock>
        {time.toLocaleTimeString('en-US')}
      </Clock>
        <Box>
          <CurrWeather /> // 여기에 날씨 api 들어가야 함.
        </Box>
        <Box>
        </Box>
    </Wrapper>
  );
}

export default ClockApp;
