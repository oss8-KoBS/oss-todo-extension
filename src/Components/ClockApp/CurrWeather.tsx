import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
const Card = styled.div`
  width: 300px;
  height: 400px;
`;

const Location = styled.h2`
  color: white;
  font-size: 40px;
`;
const Temp = styled.h3`
  color: white;
  font-size: 65px;
`;

const Box = styled.div`
  color: white;
  font-size: 20px;
  margin-top: 20px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00000060;
  border-radius: 10px;
`;

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`;
const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #00000060;
  border-radius: 10px;
  padding: 10px 0;
  color: white;
  &:nth-child(2) {
    margin: 0 10px;
  }
  & > span:first-child {
    margin-bottom: 5px;
  }
`;

const API_KEY = "aac89a3088cd9eb6836eff8e3da71980";

interface IPosition {
  lat: number | null;
  lon: number | null;
}
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
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState<IPosition>({ lat: null, lon: null });
  const [weather, setWeather] = useState<IWeather | null>(null);

  const onGeoOK = (pos: GeolocationPosition) => {
    setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
  };
  const onGeoFail = () => {
    console.log("Fail to find your location!");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOK, onGeoFail);
  }, []);

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

  const timeFormater = (t: number) => {
    const date = new Date(t * 1000);
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    const second = date.getSeconds().toString();
    return (
      hour.padStart(2, "0") +
      ":" +
      minute.padStart(2, "0") +
      ":" +
      second.padStart(2, "0")
    );
  };

  return (
    <Wrapper>
      {isLoading ? (
        <span style={{ color: "white" }}>Loading weather information...</span>
      ) : (
        <Card>
          <Location>{weather?.name}</Location>
          <Temp>
            {weather ? (weather.main.temp - 273.13).toFixed(1) + "°C" : "-"}
          </Temp>

          <Box>
            <span>Weather</span>
            <span>{weather ? weather.weather[0].main : "-"}</span>
          </Box>
          <Box>
            <span>Day Time</span>
            <span>
              {weather ? timeFormater(weather.sys.sunrise) : "-"} ~{" "}
              {weather ? timeFormater(weather.sys.sunset) : "-"}
            </span>
          </Box>

          <BottomWrapper>
            <Bottom>
              <span>
                {weather
                  ? (weather.main.feels_like - 273.13).toFixed(1) + "°C"
                  : "-"}
              </span>
              <span>Feels like</span>
            </Bottom>
            <Bottom>
              <span>{weather?.main.humidity + "%"}</span>
              <span>Humidity</span>
            </Bottom>
            <Bottom>
              <span>{weather?.wind.speed + "m/s"}</span>
              <span>Wind spd.</span>
            </Bottom>
          </BottomWrapper>
        </Card>
      )}
    </Wrapper>
  );
}

export default CurrWeather;
