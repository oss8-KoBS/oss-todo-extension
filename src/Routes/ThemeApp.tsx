import styled from "styled-components";
import {ThemeProvider} from "styled-components";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {themeState} from "../atoms";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button=styled.button<{bgColor: string}>`
boder:none;
border-radius:5px;
height: 80px;
width: 160px;
margin: 30px;
color: ${(props) => props.theme.cardColor};
  background-color: ${(props) => props.bgColor};
  &:hover {
    color: ${(props) => props.theme.bgColor};
    filter: brightness(80%);
  }
  transition: filter 0.3s ease-out, color 0.3s ease-out;
`
//버튼 스타일링 적용, AddBtn 애니메이션 적용

function ThemeApp() {

const [theme,setState]=useRecoilState(themeState);

 // const [state,setState]=useState("normal");    //이후에 useState대신 userecoilState를 이용하여 전역형태로 변환
  //("normal")대신 atoms.tsx의 themeState를 입력해 넣자

  //전역으로 테마 적용

  const onClickHandler=()=>{
    setState("DEFAULT");
  }
  const onClickHandler1=()=>{
    setState("RED");
  };
  const onClickHandler2=()=>{
    setState("BLACK");
  };
  const onClickHandler3=()=>{
    setState("PURPLE");
  };

  const onClickHandler4=()=>{
    setState("GREEN");
  };

  const onClickHandler5=()=>{
    setState("PEACH");
  };

  const onClickHandler6=()=>{
    setState("ORANGE");
  };

  const onClickHandler7=()=>{
    setState("AVOCADO");
  };

  const onClickHandler8=()=>{
    setState("EGG");
  };

  const onClickHandler9=()=>{
    setState("KAKAO");
  };

  const onClickHandler10=()=>{
    setState("CHRISTMAS");
  };

  const onClickHandler11=()=>{
    setState("SKY");
  };

  //색상 추가, 테마 적용

  return (
    <Wrapper>   
      <div> 
      {theme=="DEFAULT"? "": ""}
      <Button onClick={onClickHandler} bgColor="#3F8CF2">DEFAULT</Button>
      {/*<ThemeProvider themeState={themeState}></ThemeProvider>*/}

      {theme=="RED"? "": ""}
      <Button onClick={onClickHandler1} bgColor="#ED213A">Red</Button>

      {theme=="BLACK"? "": ""}
      <Button onClick={onClickHandler2} bgColor="#434343">Black</Button>

      {theme=="PURPLE"? "": ""}
      <Button onClick={onClickHandler3} bgColor="#654ea3">Purple</Button>

      {theme=="GREEN"? "": ""}
      <Button onClick={onClickHandler4} bgColor="#159957">Green</Button>

      {theme=="PEACH"? "": ""}
      <Button onClick={onClickHandler5} bgColor="#ee9ca7">Peach</Button>

      {theme=="ORANGE"? "": ""}
      <Button onClick={onClickHandler6} bgColor="#FF8008">Oragne</Button>

      {theme=="AVOCADO"? "": ""}
      <Button onClick={onClickHandler7} bgColor="#799F0C">Avocado</Button>

      {theme=="EGG"? "": ""}
      <Button onClick={onClickHandler8} bgColor="#FFE000">Egg</Button>

      {theme=="KAKAO"? "": ""}
      <Button onClick={onClickHandler9} bgColor="#603813">Kakao</Button>

      {theme=="CHRISTMAS"? "": ""}
      <Button onClick={onClickHandler10} bgColor="#0f9b0f">Christmas</Button>

      {theme=="SKY"? "": ""}
      <Button onClick={onClickHandler11} bgColor="#6dd5ed">Sky</Button>
      </div> 
    </Wrapper>
  );
}

export default ThemeApp;