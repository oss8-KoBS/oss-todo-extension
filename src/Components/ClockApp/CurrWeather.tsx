import { useEffect, useState } from "react";
import styled from "styled-components"


const Box = styled.div`
padding : 10px;
margin-top : 15px;
`

const Bottom = styled.div`
  display : flex;
  justify-content : space-evenly;
  text-align : center;
  width : 100%;
  margin : 1rem auto;
  margin-top : 50px
`
const Result_Wrap = styled.div`
`

const Ptag = styled.div`
  padding : 8px;
`
const Wrap = styled.div`
  
    left: 20%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 35px;

    margin-top: 60px;
    border: 1px black solid;
    border-radius: 8px;
  `;

function Unix_timestamp(t: number) {
  let date = new Date(t * 1000);
  let year = date.getFullYear();
  let month = "0" + (date.getMonth() + 1);
  let day = "0" + date.getDate();
  let hour = "0" + date.getHours();
  let minute = "0" + date.getMinutes();
  let second = "0" + date.getSeconds();
  return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
}


// OpenWeather API를 사용하기 위한 API key 입니다.
// Woong의 계정을 사용했습니다.
const API_KEY = "aac89a3088cd9eb6836eff8e3da71980";

// 아래의 인터페이스 정보를 입력했기에 자동 완성 기능이 제공됩니다.
// 위치 정보에 대한 인터페이스 입니다.
interface IPosition {
  lat: number | null;
  lon: number | null;
}
// 날씨 정보에 대한 인터페이스 입니다.
interface IWeather {
  clouds: { all: number };
  main: { feels_like: number; humidity: number; temp: number };
  name: string;
  sys: { sunrise: number; sunset: number };
  timezone: number;
  weather: { main: string; description: string; id: number; icon: string }[];
  wind: { speed: number; deg: number };
}
function CurrWeather() {
  // 날씨 정보를 불러왔는지 확인하기 위한 상태값 입니다.
  const [isLoading, setIsLoading] = useState(true);
  // 위치 정보를 저장하는 변수 입니다.
  const [position, setPosition] = useState<IPosition>({ lat: null, lon: null });
  // 날씨 정보를 저장하는 변수 입니다.
  const [weather, setWeather] = useState<IWeather | null>(null);

  // 위치 정보를 잘 불러왔을 경우 호출되는 함수입니다.
  const onGeoOK = (pos: GeolocationPosition) => {
    setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
  };
  // 위치 정보를 불러오는데 실패할 경우 호출되는 함수입니다.
  const onGeoFail = () => {
    console.log("Fail to find your location!");
  };

  // 이 컴포넌트가 랜더링되는 순간 단 한 번만 위치 정보를 불러옵니다.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOK, onGeoFail);
  }, []);

  // 위치 정보가 업데이트 되고, 위치 값이 null이 아닐 경우 OpenWeather API를 호출하여 날씨 정보를 받아옵니다.
  useEffect(() => {
    if (position.lat != null && position.lon != null) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data: IWeather) => {
          setWeather(data);
          setIsLoading(false);
        });
    }
  }, [position]);

  // 가져올 수 있는 정보는 아래와 같습니다.
  // 이 데이터를 토대로 화면을 이쁘게 구성해주세요!
  return (


    <Result_Wrap>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <Wrap>

          <div style={{ display: "flex", flexDirection: "column", fontSize: "20px" }}>

            <h2 style={{ color: "white" , fontSize: "40px"}}>{weather?.name}</h2>
            <div style={{ color: "white", fontSize: "65px"}}> {weather ? (weather.main.temp - 273.13).toFixed(1) + "°C" : "-"}</div>

            <Box>일출 : {weather ? Unix_timestamp(weather.sys.sunrise) : "-"}</Box>
            <Box>일몰 : {weather ? Unix_timestamp(weather.sys.sunset) : "-"}</Box>

            <Bottom>
              <div className="feels">
                {weather ? (weather.main.feels_like - 273.13).toFixed(1) + "°C" : "-"}
                <Ptag>체감온도</Ptag>
              </div>
              <div className="humidity">
                {weather?.main.humidity+"%"}
                <Ptag>습도</Ptag>
              </div>
              <div className="blow">
                {weather?.wind.speed + "m/s"}
                <Ptag>풍속</Ptag>
              </div>
{/* 

              <Box>체감온도: {weather ? (weather.main.feels_like - 273.13).toFixed(1) + "°C" : "-"}</Box>
              <Box>습도: {weather?.main.humidity}</Box>

              <Box>습도: {weather?.main.humidity}</Box>
              <Box>일출: {weather ? Unix_timestamp(weather.sys.sunrise) : "-"}</Box>
              <Box>일몰: {weather ? Unix_timestamp(weather.sys.sunset) : "-"}</Box>

              <Box>날씨: {weather?.weather[0].main}</Box>
              <Box>날씨 상세: {weather?.weather[0].description}</Box>
              <Box>풍속: {weather?.wind.speed + "m/s"}</Box> */}
            </Bottom>

            {/* 
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card text-white bg-secondary mb-3">
                  <div className="card-header">Header</div>
                  <div className="card-body">
                    <h5 className="card-title">Secondary card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>
            </div>*/}
          </div> 
        </Wrap>
      )}
    </Result_Wrap>


  );
}

export default CurrWeather;
