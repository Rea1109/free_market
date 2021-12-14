import Login from "../user/login/Login.container";
import * as S from "./Main.styles";
import { IMainUIProps } from "./Main.types";

export default function MainUI(props: IMainUIProps) {
  return (
    <S.Main>
      <S.MainWrapper>
        <S.WeatherMenu>
          <S.WeatherBtn onClick={() => window.location.reload()}>
            <img src="/images/main/reload.png" />
          </S.WeatherBtn>
          <S.WeatherSubWrapper>
            <S.WeatherImg src={props.weatherInfo.src} />
          </S.WeatherSubWrapper>
          <S.WheatherWrapper>
            <S.WeatherSubWrapper>
              <img src="/images/main/weather-news.png" />
              <S.WeatherInfo>{props.weatherInfo.weather}</S.WeatherInfo>
            </S.WeatherSubWrapper>
            <S.WeatherSubWrapper>
              <img src="/images/main/humidity.png" />
              <S.WeatherInfo>{props.weatherInfo.humidity} %</S.WeatherInfo>
            </S.WeatherSubWrapper>
            <S.WeatherSubWrapper>
              <img src="/images/main/temp.png" />
              <S.WeatherInfo>{props.weatherInfo.temp} ℃</S.WeatherInfo>
            </S.WeatherSubWrapper>
            <S.WeatherSubWrapper>
              <img src="/images/main/wind.png" />
              <S.WeatherInfo>{props.weatherInfo.wind} m/s</S.WeatherInfo>
            </S.WeatherSubWrapper>
          </S.WheatherWrapper>
        </S.WeatherMenu>
        <S.SubWrapperLeft>
          <S.BoardMenu onClick={props.onMoveBoard}>
            <S.MenuLabel>Free Board</S.MenuLabel>
          </S.BoardMenu>
          <S.MarketMenu onClick={props.onMoveMarket}>
            <S.MenuLabel>Market</S.MenuLabel>
          </S.MarketMenu>
        </S.SubWrapperLeft>
        <S.GuestBookMenu>
          <S.MenuLabel style={{ color: "black" }}>My Page</S.MenuLabel>
        </S.GuestBookMenu>
      </S.MainWrapper>
      <S.MainWrapper>
        <S.SignUpMenu>
          <S.SignMenuImg />
          <Login />
        </S.SignUpMenu>
        <S.SubWrapperRight>
          <S.ResumeMenu>
            <S.MenuLabel></S.MenuLabel>
          </S.ResumeMenu>
          <S.RefMenu>
            <S.MenuLabel></S.MenuLabel>
          </S.RefMenu>
        </S.SubWrapperRight>
      </S.MainWrapper>
    </S.Main>
  );
}
