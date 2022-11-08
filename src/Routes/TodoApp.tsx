import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { useState } from "react";
import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  addBoardDialog,
  dragBoard,
  dragCard,
  editCardDialog,
  IToDoState,
  toDoState,
} from "../atoms";
import AddBoard from "../Components/TodoApp/AddBoard";
import Board from "../Components/TodoApp/Board";
import EditCard from "../Components/TodoApp/EditCard";
import Trashcan from "../Components/TodoApp/Trashcan";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const BoardsWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
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
const AddBtn = styled.button`
  width: 130px;
  height: 40px;
  border: 2px solid ${(props) => props.theme.cardColor};
  border-radius: 20px;
  font-size: 18px;
  font-weight: 700;
  position: fixed;
  top: 5px;
  right: 20px;
  z-index: 1;
  color: ${(props) => props.theme.cardColor};
  background-color: ${(props) => props.theme.bgColor};
  &:hover {
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.cardColor};
  }
  transition: background-color 0.3s ease-out, color 0.3s ease-out;
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
  justify-content: flex-start;
  padding: 10px 10px;
  float: left;
`;

const DialogBGVariants: Variants = {
  init: { opacity: 0 },
  ani: { opacity: 1 },
  exit: { opacity: 0 },
};
const DialogBack = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: #00000030;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
`;

function TodoApp() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isDragBoard, setIsDragBoard] = useRecoilState(dragBoard);
  const [isDragCard, setIsDragCard] = useRecoilState(dragCard);
  const [trashVisible, setTrashVisible] = useState(false);
  const [isViewBoardDialog, setIsViewBoardDialog] =
    useRecoilState(addBoardDialog);
  const isViewCardDialog = useRecoilValue(editCardDialog);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;

    // dragging card
    if (isDragCard) {
      // remove card
      if (destination.droppableId === "Trashcan_DBBEE57") {
        setToDos((prev) => {
          const boardCopy = [...prev[source.droppableId]];
          boardCopy.splice(source.index, 1);
          return {
            ...prev,
            [source.droppableId]: boardCopy,
          };
        });
      } else {
        // move card
        // same board movement
        if (destination.droppableId === source.droppableId) {
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
        // cross board movement
        if (destination.droppableId !== source.droppableId) {
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
      }
    }
    // dragging board
    if (isDragBoard) {
      if (destination.droppableId === "Boards_DBBEE57") {
        setToDos((prev) => {
          const newBoardsKeys = Object.keys(prev).filter(
            (key) => key !== Object.keys(prev)[source.index]
          );
          let newBoards: IToDoState = {};
          for (let i = 0; i < newBoardsKeys.length; i++) {
            if (i === destination.index) {
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
    }

    setIsDragBoard(true);
    setIsDragCard(true);
    setTrashVisible(false);
  };
  const onDragStart = (info: DragStart) => {
    if (info.source.droppableId === "Boards_DBBEE57") {
      setIsDragBoard(true);
      setIsDragCard(false);
    } else {
      setIsDragBoard(false);
      setIsDragCard(true);
      setTrashVisible(true);
    }
  };

  return (
    <Wrapper>
      <AnimatePresence>
        {isViewBoardDialog || isViewCardDialog ? (
          <DialogBack
            key="DialogBack"
            variants={DialogBGVariants}
            initial="init"
            animate="ani"
            exit="exit"
          >
            {isViewBoardDialog ? <AddBoard /> : null}
            {isViewCardDialog ? <EditCard /> : null}
          </DialogBack>
        ) : null}
      </AnimatePresence>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <AddBtn onClick={() => setIsViewBoardDialog(true)}>+ Add Table</AddBtn>
        <Trashcan isVisible={trashVisible} />
        <BoardsWrapper>
          <Droppable
            droppableId="Boards_DBBEE57"
            direction="horizontal"
            isDropDisabled={!isDragBoard}
          >
            {(boardProvider, boardSnapshot) => (
              <BoardDropArea
                isDraggingOver={boardSnapshot.isDraggingOver}
                draggingFromThisWith={Boolean(
                  boardSnapshot.draggingFromThisWith
                )}
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
        </BoardsWrapper>
      </DragDropContext>
    </Wrapper>
  );
}

export default React.memo(TodoApp);
