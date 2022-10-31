import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dragBoard, toDoState } from "../atoms";
import Board from "../Components/TodoApp/Board";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
const BoardDropArea = styled.div<IAreaProps>`
  min-width: 100%;
  min-height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
`;

function TodoApp() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isDragBoard, setIsDragBoard] = useRecoilState(dragBoard);
  const onDragEnd = (info: DropResult) => {
    setIsDragBoard(true);
  };
  const onDragStart = (info: DragStart) => {
    info.source.droppableId === "Boards_EF9026D"
      ? setIsDragBoard(true)
      : setIsDragBoard(false);
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable
          droppableId="Boards_EF9026D"
          direction="horizontal"
          isDropDisabled={!isDragBoard}
        >
          {(boardProvider, boardSnapshot) => (
            <BoardDropArea
              isDraggingOver={boardSnapshot.isDraggingOver}
              draggingFromThisWith={Boolean(boardSnapshot.draggingFromThisWith)}
              ref={boardProvider.innerRef}
              {...boardProvider.droppableProps}
            >
              {Object.keys(toDos).map((boardId, boardIdx) => (
                <Board
                  key={boardId}
                  boardIdx={boardIdx}
                  boardId={boardId}
                  toDos={toDos[boardId]}
                />
              ))}
              {boardProvider.placeholder}
            </BoardDropArea>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
}

export default TodoApp;
