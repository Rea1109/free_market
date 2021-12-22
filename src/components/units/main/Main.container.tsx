import MainUI from "./Main.presenter";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getTemp } from "../../../commons/libraries/utils";
import { IWeatherInfo } from "./Main.types";
import { FETCH_USER_LOGGED_IN, LOGOUT_USER } from "./Main.queries";
import { GlobalContext } from "../../../../pages/_app";
import { useQuery, useMutation } from "@apollo/client";
import { IQuery } from "../../../commons/types/generated/types";
import { Modal } from "antd";

export default function Main() {
  const router = useRouter();
  const [weatherInfo, setWeatherInfo] = useState<IWeatherInfo>({});
  const { isLogout, setIsLogout } = useContext(GlobalContext);
  const [logoutUser] = useMutation(LOGOUT_USER);
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  const fetchWeather = async () => {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Seoul,kr&appid=${process.env.NEXT_PUBLIC_APP_KEY}`
    );

    console.log("날씨 정보 :", result);

    setWeatherInfo({
      cityName: result.data.name,
      src: `http://openweathermap.org/img/w/${result.data.weather[0].icon}.png`,
      humidity: result.data.main.humidity,
      temp: getTemp(result.data.main.temp),
      wind: result.data.wind.speed,
      weather: result.data.weather[0].description,
    });
  };

  const onClickLogOut = () => {
    try {
      logoutUser();
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("basket");
      localStorage.removeItem("userInfo");
      setIsLogout?.(true);
      router.push("/");
    } catch (error) {
      error instanceof Error && Modal.error({ title: error.message });
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <MainUI
      onMoveBoard={() => router.push("/boards")}
      onMoveMarket={() => router.push("/market")}
      onMoveMyPage={() => router.push("/user/get")}
      onClickLogOut={onClickLogOut}
      weatherInfo={weatherInfo}
      isLogout={isLogout}
      data={data}
    />
  );
}
