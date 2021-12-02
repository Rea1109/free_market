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
  onMoveBoard: () => void;
  onMobeMarket: () => void;
}
