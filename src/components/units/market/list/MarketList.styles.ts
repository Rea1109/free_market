import styled from "@emotion/styled";

export const ListHeader = styled.div`
  width: 100%;
  height: 100px;
  text-align: center;
  padding-top: 10px;
  position: relative;
`;

export const BestWrapper = styled.div`
  width: 90%;
  height: 400px;
  display: flex;
  justify-content: space-evenly;
  border: 1px solid black;
`;

export const SearchBar = styled.div`
  width: 100%;
  height: 100px;
`;

export const UsedItemsWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  /* overflow: auto; */
  border: 1px solid black;
`;

export const BestItemCard = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid black;
  /* border: none;
  border-radius: 15px;
  box-shadow: 0px 0px 5px gray; */
  overflow: hidden;
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ItemCardWrapper = styled.div`
  width: 20%;
  height: 400px;
  display: flex;
  padding: 30px 0px 30px 30px;
  border: 1px solid black;
`;
export const ItemCard = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid black;
  /* border-radius: 15px;
  box-shadow: 0px 0px 5px gray; */
  overflow: hidden;
`;

export const Info = styled.span`
  border: 1px solid black;
  overflow: hidden;
  width: 100%;
  height: 10%;
`;

export const AddBtn = styled.button`
  position: absolute;
  right: 60px;
`;

export const ItemImg = styled.img`
  width: 100%;
  height: 55%;
  border: 1px solid black;
  border-radius: 10px;
`;

export const AddBasket = styled.button`
  width: 40%;
  border: none;
`;
