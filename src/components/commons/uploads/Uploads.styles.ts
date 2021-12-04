import styled from "@emotion/styled";

export const UploadImageWrapper = styled.div`
  width: 20%;
  height: 100%;
  position: relative;
`;

export const UploadImage = styled.img`
  width: 90%;
  height: 100%;
  border-radius: 10px;
  margin: 0px 10px 0px 10px;
`;

export const UploadIcon = styled.div`
  background-image: url("/images/market/upload-image.png");
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 20%;
  height: 100%;
  border-radius: 10px;
`;

export const DeleteIcon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 25px;
  top: 5px;
  :hover {
    cursor: pointer;
  }
`;
