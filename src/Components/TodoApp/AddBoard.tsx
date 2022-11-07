import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import { addBoardDialog, toDoState } from "../../atoms";

const Dialog = styled(motion.div)`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background: linear-gradient(#00000090, #00000000);
  position: relative;
`;
const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-top: 10px;
`;
const InputName = styled.input`
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  color: white;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  outline: none;
  &::placeholder {
    color: #ffffff90;
  }
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
  border-radius: 15px;
  font-size: 18px;
  color: white;
  transition: border 0.3s ease-out;
`;
const Obutton = styled(Button)`
  background-color: #54bab9;
  border: 1px solid #54bab9;
  &:hover {
    border: 2px solid white;
  }
`;
const NButton = styled(Button)`
  background-color: tomato;
  border: 1px solid tomato;
  &:hover {
    border: 2px solid white;
  }
`;
const AlertText = styled.span`
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  background: linear-gradient(90deg, #00000000, #00000050, #00000000);
  color: tomato;
  position: absolute;
  top: 170px;
`;

const AddBoardVariants: Variants = {
  init: { scale: 0 },
  ani: { scale: 1 },
  exit: { scale: 0, opacity: 0 },
};

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
    <Dialog
      key="AddBoard"
      variants={AddBoardVariants}
      transition={{ type: "spring", stiffness: 120, damping: 10 }}
      initial="init"
      animate="ani"
      exit="exit"
    >
      <Title>Add a new table</Title>
      <form onSubmit={createHandler}>
        <InputName
          type="text"
          placeholder="Please type a new table name"
          onChange={onChangeHandler}
          autoComplete="off"
        />
      </form>
      {isAlert ? <AlertText>Please enter table name</AlertText> : null}
      <BtnWrapper>
        <NButton onClick={() => setIsViewDialog(false)}>Cancel</NButton>
        <Obutton onClick={createHandler}>Create</Obutton>
      </BtnWrapper>
    </Dialog>
  );
}

export default AddBoard;
