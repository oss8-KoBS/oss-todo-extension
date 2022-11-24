import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CurrCalendar.css";
import { useRecoilValue } from "recoil";
import { toDoState } from "../../atoms";

const CalendarPrt = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Dot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InfoBox = styled.div`
  width: 500px;
  height: calc(100% - 350px);
  min-height: 100px;
  background: #00000060;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

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
const DayInfo = styled.div`
  margin: 5px;
  width: calc(100% - 10px);
  padding: 5px;
  font-size: 20px;
  background: #00000040;
  color: white;
  word-break: break-all;
  text-align: center;
  font-weight: 700;
  border-radius: 10px;
`;

function CurrCalendar() {
  const [value, onChange] = useState(new Date());
  const toDos = useRecoilValue(toDoState);
  const [htt, setHtt] = useState<{ expDate: Date | null; text: string }[]>([]);
  const [currTask, setCurrTask] = useState<{ text: string }[]>([]);
  useEffect(() => {
    // setCurrTask([]);
    Object.keys(toDos).forEach((key) => {
      toDos[key].forEach((card) => {
        if (card.expDate !== null) {
          setHtt((prev) => [
            ...prev,
            { expDate: card.expDate, text: card.text },
          ]);
        }
      });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrTask([]);
    htt.forEach((card) => {
      if (
        card.expDate
          ? Math.ceil(new Date().getTime() / (1000 * 60 * 60 * 24)) - 1 ===
            Math.ceil(new Date(card.expDate).getTime() / (1000 * 60 * 60 * 24))
          : false
      ) {
        setCurrTask((prev) => [...prev, { text: card.text }]);
      }
    });
  }, [htt]);

  useEffect(() => {
    setCurrTask([]);
    htt.forEach((card) => {
      if (
        card.expDate
          ? Math.ceil(value.getTime() / (1000 * 60 * 60 * 24)) ===
            Math.ceil(new Date(card.expDate).getTime() / (1000 * 60 * 60 * 24))
          : false
      ) {
        setCurrTask((prev) => [...prev, { text: card.text }]);
      }
    });
    // eslint-disable-next-line
  }, [value]);

  return (
    <CalendarPrt className="CurrCalendar">
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="year"
        calendarType="US"
        tileContent={({ date }) => {
          let isDot = false;
          if (
            htt.find((card) =>
              card.expDate
                ? Math.ceil(
                    new Date(card.expDate).getTime() / (1000 * 60 * 60 * 24)
                  ) === Math.ceil(date.getTime() / (1000 * 60 * 60 * 24))
                : false
            )
          ) {
            isDot = true;
          }
          return isDot ? (
            <Dot>
              <div className="dot"></div>
            </Dot>
          ) : null;
        }}
      />
      <InfoBox>
        {currTask.map((task, idx) => (
          <DayInfo key={idx}>{task.text}</DayInfo>
        ))}
      </InfoBox>
    </CalendarPrt>
  );
}

export default React.memo(CurrCalendar);
