import styled from "@emotion/styled";

export const MapWrapper = styled.div`
  position: relative;
  height: 100%;
  margin-bottom: 20px;
`;

export const AddressTitle = styled.h3`
  color: #00aec7;
  font-size: 30px;
  font-weight: bolder;
  margin: 0px;
`;

export const Map = styled.div`
  width: 100%;
  height: 70%;
  margin: 20px 0px 20px 0px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px gray;
`;

export const AddrInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ZipcodeBox = styled.input`
  width: 15%;
  height: 40px;
  text-align: center;
  border: 2px solid #cacaca;
  border-radius: 5px;
`;

export const AddreessBox = styled.input`
  width: 30%;
  height: 40px;
  padding: 20px;
  border: 2px solid #cacaca;
  border-radius: 5px;
`;

export const AddressDetailBox = styled.input`
  width: 40%;
  height: 40px;
  padding: 20px;
  border: 2px solid #cacaca;
  border-radius: 5px;
`;
export const SearchAddrBtn = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: #00b6d8;
  color: white;
  height: 30px;
  position: absolute;
  top: 80px;
  right: 20px;
  z-index: 1;
`;
