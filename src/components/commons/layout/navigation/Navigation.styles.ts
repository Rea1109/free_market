import styled from "@emotion/styled";

export const Navigation = styled.header`
  width: 100%;
  height: 80px;
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
  font-size: 20px;
`;

export const LogoutBtn = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #00b6d8;
  color: white;
`;
