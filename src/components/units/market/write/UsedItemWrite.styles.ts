import styled from "@emotion/styled";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const WriteUsedItemForm = styled.form`
  margin-bottom: 10px;
  width: 100%;
  height: 900px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const FormLeft = styled.div`
  width: 35%;
  padding: 15px 20px 20px 20px;
  height: 98%;
`;

export const FormLeftTitle = styled.h3`
  color: #00aec7;
  font-size: 30px;
  font-weight: bolder;
  margin: 0px;
`;
export const FormLeftBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const FormRight = styled.div`
  width: 45%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const BtnBottom = styled.div`
  width: 70%;
  height: 10%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
`;

export const SumbmitBtn = styled.button`
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

export const ImageForm = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const MapForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 70%;
`;

export const ContentsInputBox = styled(ReactQuill)`
  width: 90%;
  height: 600px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 10px gray;
  overflow: auto;
`;

export const InfoInputBox = styled.input`
  width: 90%;
  height: 30px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 10px gray;
  padding-left: 20px;
`;

export const ErrorText = styled.div`
  font-size: 10px;
  color: red;
  overflow: hidden;
`;

export const InfoWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
