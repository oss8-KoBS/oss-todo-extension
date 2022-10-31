import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardWrapper = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;

  background-color: ${(props) =>
    props.isDragging ? props.theme.dragCardColor : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
  transition: background-color 0.3s ease-out;
`;

interface ICardProps {
  cardId: number;
  cardIdx: number;
  cardText: string;
}
function Card({ cardId, cardIdx, cardText }: ICardProps) {
  return (
    <Draggable draggableId={cardId + ""} index={cardIdx}>
      {(cardProvided, cardInSnapshot) => (
        <CardWrapper
          isDragging={cardInSnapshot.isDragging}
          ref={cardProvided.innerRef}
          {...cardProvided.draggableProps}
          {...cardProvided.dragHandleProps}
        >
          {cardText}
        </CardWrapper>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
