import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dragBoard, IToDoState, toDoState } from "../atoms";
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
    const { destination, source } = info;
    if (!destination) return;

    if (!isDragBoard) {
      // dragging card
      if (destination.droppableId === source.droppableId) {
        // same board movement
        setToDos((prev) => {
          const boardCopy = [...prev[source.droppableId]];
          const [popTodo] = boardCopy.splice(source.index, 1);
          boardCopy.splice(destination?.index, 0, popTodo);
          return {
            ...prev,
            [source.droppableId]: boardCopy,
          };
        });
      }
      if (destination.droppableId !== source.droppableId) {
        // cross board movement
        setToDos((prev) => {
          const sourceBoardCopy = [...prev[source.droppableId]];
          const popTodo = sourceBoardCopy[source.index];
          const destBoardCopy = [...prev[destination.droppableId]];
          sourceBoardCopy.splice(source.index, 1);
          destBoardCopy.splice(destination?.index, 0, popTodo);
          return {
            ...prev,
            [source.droppableId]: sourceBoardCopy,
            [destination.droppableId]: destBoardCopy,
          };
        });
      }
    } else {
      // dragging board
      setToDos((prev) => {
        const newBoardsKeys = Object.keys(prev).filter(
          (key) => key != Object.keys(prev)[source.index]
        );
        let newBoards: IToDoState = {};
        for (let i = 0; i < newBoardsKeys.length; i++) {
          if (i == destination.index) {
            newBoards[Object.keys(prev)[source.index]] =
              prev[Object.keys(prev)[source.index]];
          }
          newBoards[newBoardsKeys[i]] = prev[newBoardsKeys[i]];
        }
        if (destination.index === newBoardsKeys.length) {
          newBoards[Object.keys(prev)[source.index]] =
            prev[Object.keys(prev)[source.index]];
        }

        return newBoards;
      });
    }

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
