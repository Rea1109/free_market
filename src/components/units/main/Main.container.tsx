import MainUI from "./Main.presenter";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { getTemp } from "../../../commons/libraries/utils";
import { IWeatherInfo } from "./Main.types";

export default function Main() {
  const router = useRouter();
  const [weatherInfo, setWeatherInfo] = useState<IWeatherInfo>({});

  console.log(process.env.NEXT_PUBLIC_APP_KEY);

  const fetchWeather = async () => {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Seoul,kr&appid=${process.env.NEXT_PUBLIC_APP_KEY}`
    );
    console.log(result.data);

    setWeatherInfo({
      cityName: result.data.name,
      src: `http://openweathermap.org/img/w/${result.data.weather[0].icon}.png`,
      humidity: result.data.main.humidity,
      temp: getTemp(result.data.main.temp),
      wind: result.data.wind.speed,
      weather: result.data.weather[0].description,
    });
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <MainUI
      onMoveBoard={() => router.push("/boards")}
      onMoveMarket={() => router.push("/market")}
      weatherInfo={weatherInfo}
    />
  );
}
