import styled from "@emotion/styled";

export const Navigation = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: black;
  opacity: 0.9;
  border-radius: 10px;
  margin-bottom: 20px;
  position: relative;
`;

export const NavMenu = styled.div`
  color: white;
  font-size: 30px;
`;

export const LogoutImg = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 5px;
  right: 10px;
`;
