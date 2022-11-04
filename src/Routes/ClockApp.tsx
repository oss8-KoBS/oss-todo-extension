import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Clock = styled.h1`
  text-align: center;
  position: relative;
  top: 50px;
  font-size: 100px;
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
    </Wrapper>
  );
}

export default ClockApp;
