import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { editCardDialog } from "../../atoms";

const CardWrapper = styled.div<{ isDragging: boolean }>`
  max-width: 260px;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  position: relative;

  background-color: ${(props) =>
    props.isDragging ? props.theme.dragCardColor : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;
const Text = styled.span`
  word-break: break-all;
  color: ${(props) => props.theme.textColor};
`;
const TimeLeft = styled.div<{ isExpired: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  font-size: 50px;
  font-weight: 700;
  font-style: italic;
  color: ${(props) => (props.isExpired ? "tomato" : props.theme.textColor)};
  opacity: 0.1;
  white-space: nowrap;
  overflow: hidden;
  z-index: 0;
`;

interface ICardProps {
  cardId: number;
  cardIdx: number;
  cardText: string;
  timeLeft: number | null;
}
function Card({ cardId, cardIdx, cardText, timeLeft }: ICardProps) {
  const setIsViewDialog = useSetRecoilState(editCardDialog);
  const onClick = () => {
    setIsViewDialog(cardId);
  };
  return (
    <Draggable draggableId={cardId + ""} index={cardIdx}>
      {(cardProvided, cardInSnapshot) => (
        <CardWrapper
          onClick={onClick}
          isDragging={cardInSnapshot.isDragging}
          ref={cardProvided.innerRef}
          {...cardProvided.draggableProps}
          {...cardProvided.dragHandleProps}
        >
          <Text>{cardText}</Text>
          <TimeLeft
            isExpired={timeLeft === null ? false : timeLeft <= 0 ? true : false}
          >
            {timeLeft !== null
              ? timeLeft < 0
                ? `D+${-timeLeft}`
                : timeLeft === 0
                ? "D-Day"
                : `D-${timeLeft}`
              : null}
          </TimeLeft>
        </CardWrapper>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
