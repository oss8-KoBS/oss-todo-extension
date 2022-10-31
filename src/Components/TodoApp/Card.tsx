import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardContent = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
`;

interface ICardProps {
  toDoId: number;
  toDoText: string;
  idx: number;
}
function Card({ toDoId, toDoText, idx }: ICardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={idx}>
      {(provided, snapshot) => (
        <CardContent
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </CardContent>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
