import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div<{ isVisible: boolean }>`
  width: 100vw;
  height: 52px;
  background: linear-gradient(#ff6347, #00000000);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  pointer-events: ${(props) => (props.isVisible ? "all" : "none")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
const Area = styled.div<IAreaProps>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  padding-left: calc(50% - 130px);
  color: white;
  background: linear-gradient(#ff6347 90%, #00000000);
  opacity: ${(props) => (props.isDraggingOver ? 1 : 0)};
  transition: opacity 0.3s ease-out;

  position: relative;
  & > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

interface ITrashcan {
  isVisible: boolean;
}
function Trashcan({ isVisible }: ITrashcan) {
  return (
    <Wrapper isVisible={isVisible}>
      <Droppable droppableId="Trashcan_DBBEE57" isDropDisabled={!isVisible}>
        {(provider, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provider.innerRef}
            {...provider.droppableProps}
          >
            <span>Remove Card</span>
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Trashcan);
