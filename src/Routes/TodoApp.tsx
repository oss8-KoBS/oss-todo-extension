import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "../Components/TodoApp/Board";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const BoardWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
const Boards = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
`;

function TodoApp() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {};

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardWrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </BoardWrapper>
      </DragDropContext>
    </Wrapper>
  );
}

export default TodoApp;
