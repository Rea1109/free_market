import styled from "@emotion/styled";

export const WriteUsedItemForm = styled.form`
  margin-bottom: 10px;
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const FormLeft = styled.div`
  background-color: green;
  width: 26%;
  height: 95%;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const FormLeftHeader = styled.div`
  background-color: red;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const FormInputBody = styled.div`
  background-color: gold;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const FormRight = styled.div`
  background-color: #f7d094;
  width: 66%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid black;
  border-radius: 10px;
`;

export const BtnBottom = styled.div`
  background-color: #f7d094;
  width: 100%;
  height: 10%;
  border: 2px solid black;
  border-radius: 10px;
`;

export const ImageForm = styled.div`
  background-color: #f7d094;
  width: 100%;
  height: 30%;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
`;

export const MapForm = styled.div`
  background-color: #f7d094;
  width: 100%;
  height: 50%;
  border: 2px solid black;
  border-radius: 10px;
`;

export const InfoInputBox1 = styled.input`
  width: 66%;
  height: 62px;
`;

export const InfoInputBox2 = styled.textarea`
  width: 66%;
  height: 300px;
  resize: none;
`;
