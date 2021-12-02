import styled from "@emotion/styled";

export const Main = styled.div`
  width: 100%;
  padding: 30px 10px 30px 10px;
  display: flex;
  justify-content: space-between;
`;

export const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 1200px;
  padding: 30px;
  flex-direction: column;
  justify-content: space-between;
`;

export const SubWrapperLeft = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const SubWrapperRight = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 49%;
`;

export const BoardMenu = styled.div`
  width: 48%;
  height: 250px;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 0px 5px gray;
  overflow: hidden;
  position: relative;
  background-image: url("/images/main/board-menu.png");
`;

export const MarketMenu = styled.div`
  width: 48%;
  height: 250px;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 0px 5px gray;
  overflow: hidden;
  position: relative;
  background-image: url("/images/main/market-menu.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

export const GuestBookMenu = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 0px 5px gray;
  background-image: url("/images/commons/sub-banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;
`;

export const WeatherMenu = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 0px 5px gray;
  position: relative;
  background-image: url("/images/main/weather-menu.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

export const WheatherWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const WeatherSubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const WeatherImg = styled.img`
  width: 100px;
  height: 100px;
`;

export const WeatherInfo = styled.div`
  font-size: 30px;
  color: #4c4c4c;
  font-weight: bolder;
  margin-top: 20px;
`;

export const SignUpMenu = styled.div`
  width: 100%;
  height: 45%;
  display: flex;
  justify-content: space-between;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 0px 5px gray;
  overflow: hidden;
`;

export const SignMenuImg = styled.div`
  width: 60%;
  height: 100%;
  background-image: url("/images/commons/signup-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

export const MenuLabel = styled.div`
  position: absolute;
  color: white;
  font-size: 40px;
  font-weight: bolder;
  top: -5px;
  left: 10px;
`;

export const WeatherBtn = styled.button`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 20px;
  right: 30px;
  border: none;
  background-color: transparent;
`;

export const ResumeMenu = styled.div`
  width: 48%;
  height: 100%;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 0px 5px gray;
  overflow: hidden;
  background-image: url("/images/main/resume-menu.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;
`;

export const RefMenu = styled.div`
  width: 48%;
  height: 100%;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 0px 5px gray;
  overflow: hidden;
  background-image: url("/images/main/ref-menu.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;
`;
