import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../../atoms";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const Wrapper = styled.div`
  width: 300px;
  min-height: 300px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 10px 0;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IDropAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
const DropArea = styled.div<IDropAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#bfd6c9"
      : props.draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  transition: background-color 0.3s ease-out;
  flex-grow: 1;
  padding: 20px;
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}
interface IForm {
  toDo: string;
}
function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    //TODO: add todo list
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task no ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provider, snapshot) => (
          <DropArea
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provider.innerRef}
            {...provider.droppableProps}
          >
            {toDos.map((toDo, idx) => (
              <Card
                key={toDo.id}
                idx={idx}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provider.placeholder}
          </DropArea>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Board);
