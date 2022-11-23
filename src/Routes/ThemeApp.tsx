import styled from "styled-components";
import {useSetRecoilState} from "recoil";
import {themeState} from "../atoms";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
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

const ButtonWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 160px);
  grid-auto-rows: 80px;
  justify-items: center;
  gap:50px;
  padding:50px;
  justify-content: center;
`;

const Button=styled.button<{bgColor: string}>`
border: 1.5px solid black;
border-radius:20px;
height: 80px;
width: 160px;
margin: 10px;
color: white;
  background-color: ${(props) => props.bgColor};
  &:hover {
    filter: brightness(80%);
  }
  transition: filter 0.3s ease-out;
`

function ThemeApp() {
  const setState = useSetRecoilState(themeState);
  return (
    <Wrapper>   
      <ButtonWrapper>
        <Button onClick={() => setState("DEFAULT")} bgColor="#3F8CF2">DEFAULT</Button>

        <Button onClick={() => setState("RED")} bgColor="#ED213A">Red</Button>

        <Button onClick={() => setState("BLACK")} bgColor="#434343">Black</Button>

        <Button onClick={() => setState("PURPLE")} bgColor="#654ea3">Purple</Button>

        <Button onClick={() => setState("GREEN")} bgColor="#159957">Green</Button>

        <Button onClick={() => setState("PEACH")} bgColor="#ee9ca7">Peach</Button>

        <Button onClick={() => setState("ORANGE")} bgColor="#FF8008">Oragne</Button>

        <Button onClick={() => setState("AVOCADO")} bgColor="#799F0C">Avocado</Button>

        <Button onClick={() => setState("PASTEL")} bgColor="#E6BA95">Pastel</Button>

        <Button onClick={() => setState("KAKAO")} bgColor="#603813">Kakao</Button>

        <Button onClick={() => setState("CHRISTMAS")} bgColor="#0f9b0f">Christmas</Button>

        <Button onClick={() => setState("SKY")} bgColor="#6dd5ed">Sky</Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default ThemeApp;