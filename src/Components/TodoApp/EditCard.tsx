import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editCardDialog, IToDo, IToDoState, toDoState } from "../../atoms";

const Dialog = styled(motion.div)`
  width: 500px;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.boardColor};
`;
const TitleWrapper = styled.div`
  width: 500px;
  height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;
const Title = styled.h2`
  width: 460px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
`;
const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-top-right-radius: 5px;
  background-color: tomato;
  color: white;
  font-size: 20px;
  font-weight: 700;
`;
const DateWrapper = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ResetBtn = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #54bab9;
  &:hover {
    filter: brightness(80%);
  }
  transition: filter 0.3s ease-out;
`;

const EditCardVariants: Variants = {
  init: { scale: 0 },
  ani: { scale: 1 },
  exit: { scale: 0, opacity: 0 },
};

function EditCard() {
  const [cardId, setIsViewDialog] = useRecoilState(editCardDialog);
  const [cardObj, setCardObj] = useState<IToDo | null>(null);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [expireDate, setExpireDate] = useState<Date | null>(null);

  useEffect(() => {
    Object.keys(toDos).forEach((key) => {
      toDos[key].forEach((card) => {
        if (card.id === cardId) {
          setCardObj(card);
          card?.expDate
            ? setExpireDate(new Date(card.expDate))
            : setExpireDate(null);
        }
      });
    });
  }, []);

  const onChange = (date: Date) => {
    setToDos((prev) => {
      let newBoards: IToDoState = {};
      Object.keys(prev).forEach((key) => {
        let newBoard: IToDo[] = [];
        toDos[key].forEach((card) => {
          if (card.id === cardId) {
            // 이 카드의 데이터를 바꾼 후 집어넣음
            cardObj
              ? newBoard.push({
                  id: card.id,
                  text: card.text,
                  expDate: date,
                })
              : newBoard.push(card);
          } else {
            // 그대로 집어넣음
            newBoard.push(card);
          }
        });
        newBoards[key] = newBoard;
      });

      return newBoards;
    });

    setIsViewDialog(null);
  };

  const onClick = () => {
    setToDos((prev) => {
      let newBoards: IToDoState = {};
      Object.keys(prev).forEach((key) => {
        let newBoard: IToDo[] = [];
        toDos[key].forEach((card) => {
          if (card.id === cardId) {
            // 이 카드의 데이터를 바꾼 후 집어넣음
            cardObj
              ? newBoard.push({
                  id: card.id,
                  text: card.text,
                  expDate: null,
                })
              : newBoard.push(card);
          } else {
            // 그대로 집어넣음
            newBoard.push(card);
          }
        });
        newBoards[key] = newBoard;
      });

      return newBoards;
    });

    setIsViewDialog(null);
  };

  return (
    <Dialog
      key="EditCard"
      variants={EditCardVariants}
      transition={{ type: "spring", stiffness: 120, damping: 10 }}
      initial="init"
      animate="ani"
      exit="exit"
    >
      <TitleWrapper>
        <Title>{cardObj?.text}</Title>
        <CloseBtn onClick={() => setIsViewDialog(null)}>X</CloseBtn>
      </TitleWrapper>
      <DateWrapper>
        <div style={{ height: "100%" }}>
          <DatePicker selected={expireDate} onChange={onChange} inline />
        </div>
        <span style={{ margin: "0 20px" }}>or</span>
        <ResetBtn onClick={onClick}>no expire</ResetBtn>
      </DateWrapper>
    </Dialog>
  );
}

export default EditCard;
