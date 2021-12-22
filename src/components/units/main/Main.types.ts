import { IQuery } from "../../../commons/types/generated/types";

export interface IWeatherInfo {
  cityName?: string;
  src?: string;
  humidity?: string;
  temp?: string;
  wind?: number;
  weather?: string;
}

export interface IMainUIProps {
  weatherInfo: IWeatherInfo;
  isLogout?: boolean;
  data?: Pick<IQuery, "fetchUserLoggedIn">;
  onMoveBoard: () => void;
  onMoveMarket: () => void;
  onClickLogOut: () => void;
  onMoveMyPage: () => void;
}
