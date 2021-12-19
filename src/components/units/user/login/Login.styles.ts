import styled from "@emotion/styled";

export const LoginMenuForm = styled.form`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const LoginTitle = styled.h3`
  font-size: 40px;
  font-weight: bolder;
  color: #45c5e5;
`;

export const InputWrapper = styled.div`
  width: 80%;
`;

export const InputBox = styled.input`
  width: 100%;
  height: 50px;
  padding: 20px;
  border-radius: 10px;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 15px;
`;

export const BtnWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
`;

export const SumbitBtn = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: #00b6d8;
  color: white;
`;

export const ClickBtn = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  color: black;
`;
