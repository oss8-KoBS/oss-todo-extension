import { useEffect, useState } from "react";

// OpenWeather API를 사용하기 위한 API key 입니다.
// Woong의 계정을 사용했습니다.
const API_KEY = "27c1eb3309e9989c58c8506ce75ae82f";

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
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>구름양: {weather?.clouds.all}</span>

          <span>온도: {weather?.main.temp}</span>
          <span>체감온도: {weather?.main.feels_like}</span>
          <span>습도: {weather?.main.humidity}</span>

          <span>위치: {weather?.name}</span>

          <span>일출: {weather?.sys.sunrise}</span>
          <span>일몰: {weather?.sys.sunset}</span>
          <span>타임존(일출/일몰 계산용): {weather?.timezone}</span>

          <span>날씨: {weather?.weather[0].main}</span>
          <span>날씨 설명: {weather?.weather[0].description}</span>
          <span>날씨id: {weather?.weather[0].id}</span>
          <span>날씨icon: {weather?.weather[0].icon}</span>

          <span>풍속: {weather?.wind.speed}</span>
          <span>풍향: {weather?.wind.deg}</span>
        </div>
      )}
    </>
  );
}

export default CurrWeather;
