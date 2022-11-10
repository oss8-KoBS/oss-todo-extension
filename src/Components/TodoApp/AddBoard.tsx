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
    font-weight: 400;
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
  transition: background-color 0.3s ease-out;
`;
const Obutton = styled(Button)`
  background-color: #54bab9c0;
  &:hover {
    background-color: #54bab9;
  }
`;
const NButton = styled(Button)`
  background-color: #ff6347c0;
  &:hover {
    background-color: #ff6347;
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
  const [isAlert, setIsAlert] = useState<false | "NONAME" | "EXISTNAME">(false);
  const setToDos = useSetRecoilState(toDoState);

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setIsAlert(false);
  };
  const createHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let isExsist = false;

    if (title.replace(/ /g, "").length > 0) {
      setToDos((prev) => {
        Object.keys(prev).forEach((key) => {
          if (key === title) {
            isExsist = true;
          }
        });
        if (isExsist) {
          setIsAlert("EXISTNAME");
          return prev;
        }

        return {
          ...prev,
          [title]: [],
        };
      });

      if (!isExsist) {
        setIsViewDialog(false);
      }
    } else {
      setIsAlert("NONAME");
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
      {isAlert ? (
        <AlertText>
          {isAlert === "NONAME"
            ? "Please enter table name"
            : `${title} table is already exist`}
        </AlertText>
      ) : null}
      <BtnWrapper>
        <NButton onClick={() => setIsViewDialog(false)}>Cancel</NButton>
        <Obutton onClick={createHandler}>Create</Obutton>
      </BtnWrapper>
    </Dialog>
  );
}

export default AddBoard;
