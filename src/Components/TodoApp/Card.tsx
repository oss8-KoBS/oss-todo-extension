import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { editCardDialog } from "../../atoms";

const CardWrapper = styled.div<{ isDragging: boolean }>`
  max-width: 260px;
  word-break: break-all;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;

  background-color: ${(props) =>
    props.isDragging ? props.theme.dragCardColor : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;

interface ICardProps {
  cardId: number;
  cardIdx: number;
  cardText: string;
}
function Card({ cardId, cardIdx, cardText }: ICardProps) {
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
          {cardText}
        </CardWrapper>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
