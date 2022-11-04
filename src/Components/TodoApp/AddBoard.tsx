import React, { ReactEventHandler, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { addBoardDialog, toDoState } from "../../atoms";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00000050;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
`;
const Dialog = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.boardColor};
  position: relative;
`;
const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
  margin-top: 10px;
`;
const InputName = styled.input`
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
`;
const BtnWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 15px;
`;
const Button = styled.button`
  width: 230px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  color: white;
  &:hover {
    filter: brightness(80%);
  }
  transition: filter 0.3s ease-out;
`;
const Obutton = styled(Button)`
  background-color: #54bab9;
`;
const NButton = styled(Button)`
  background-color: #ff9f9f;
`;
const AlertText = styled.span`
  font-size: 15px;
  color: tomato;
  position: absolute;
  top: 170px;
`;

function AddBoard() {
  const setIsViewDialog = useSetRecoilState(addBoardDialog);
  const [title, setTitle] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const setToDos = useSetRecoilState(toDoState);

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setIsAlert(false);
  };
  const createHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (title.replace(/ /g, "").length > 0) {
      setToDos((prev) => ({
        ...prev,
        [title]: [],
      }));

      setIsViewDialog(false);
    } else {
      setIsAlert(true);
    }
  };
  return (
    <Wrapper>
      <Dialog>
        <Title>Add a new table</Title>
        <form onSubmit={createHandler}>
          <InputName
            type="text"
            placeholder="Please type a new table name"
            onChange={onChangeHandler}
          />
        </form>
        {isAlert ? <AlertText>Please enter table name</AlertText> : null}
        <BtnWrapper>
          <NButton onClick={() => setIsViewDialog(false)}>Cancel</NButton>
          <Obutton onClick={createHandler}>Create</Obutton>
        </BtnWrapper>
      </Dialog>
    </Wrapper>
  );
}

export default AddBoard;
