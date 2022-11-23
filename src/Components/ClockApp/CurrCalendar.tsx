
import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CurrCalendar.css';
import { useRecoilValue } from "recoil";
import { toDoState } from "../../atoms";
import Card from "../TodoApp/Card";
import moment from "moment";

const Calendar_prt = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Dot = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Info_Box = styled.div`
    margin: 10px;
    width: 500px;
    height: 156px;
    background: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    overflow: auto;
`;
const Day_info = styled.div`
    margin: 2px;
    width: 495px;
    padding: 5px;
    font-size: 20px;
    background: white;
    word-break: break-all;
    text-align: center;
    font-weight: 700;
    opacity: 0.6;
    border-radius: 10px;
`;

function CurrCalendar(){
    const [value, onChange] = useState(new Date());
    const toDos = useRecoilValue(toDoState);
    const [htt, setHtt] = useState<{expDate: Date | null, text: string}[]>([]);
    const [currTask, setCurrTask] = useState<{text: string}[]>([]);
    useEffect (() => {
        Object.keys(toDos).forEach((key)=>{
            toDos[key].forEach((card)=>{
                if (card.expDate !== null) {
                    setHtt(prev => [...prev, {expDate: card.expDate, text: card.text}]);
                    if (Math.ceil(new Date().getTime() / (1000*60*60*24)) - 1 === Math.ceil(new Date(card.expDate).getTime() / (1000*60*60*24))) {
                        setCurrTask([]);
                        setCurrTask(prev => [...prev, {text: card.text}]);
                    }
                }
            })
        });
    },[]);

    useEffect(() => {
        htt.forEach((card)=>{
            if (card.expDate ? Math.ceil(new Date().getTime() / (1000*60*60*24)) - 1 === Math.ceil(new Date(card.expDate).getTime() / (1000*60*60*24)): false) {
                setCurrTask([]);
                setCurrTask(prev => [...prev, {text: card.text}]);
            }
        });
    }, [htt])

    useEffect(() => {
        setCurrTask([]);
        htt.forEach((card) => {
            if (card.expDate ? Math.ceil(value.getTime() / (1000*60*60*24)) === Math.ceil(new Date(card.expDate).getTime() / (1000*60*60*24)) : false) {
                setCurrTask(prev => [...prev, {text: card.text}]);
            }
        });
    }, [value])

    return (
        <Calendar_prt className="CurrCalendar">
            <Calendar
                onChange={onChange}
                value={value}
                calendarType="US"
                tileContent={({date}) => {
                    let isDot = false;
                    if (htt.find((card) => card.expDate ? Math.ceil(new Date(card.expDate).getTime() / (1000*60*60*24)) === Math.ceil(date.getTime() / (1000*60*60*24)): false)) {
                        isDot = true;
                    }
                    return isDot ? <Dot><div className="dot"></div></Dot> : null;
                }}
            />
            <Info_Box>
                {currTask.map((task, idx) => 
                    <Day_info key={idx}>
                        {task.text}
                    </Day_info>
                )}
            </Info_Box>
        </Calendar_prt>
    );
}

export default React.memo(CurrCalendar);