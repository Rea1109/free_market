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
  border: none;
`;

export const SearchBar = styled.div`
  width: 100%;
  height: 100px;
`;

export const InfiniteScrollBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UsedItemsWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
`;

export const BestItemCard = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  border: none;
  overflow: hidden;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
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
`;
export const ItemCard = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  border: none;
  overflow: hidden;
`;

export const ItemName = styled.div`
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  font-size: 20px;
  font-weight: bolder;
  padding: 5px;
`;

export const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  background-color: #e4e6e7;
`;

export const ItemIcon = styled.div`
  width: 100%;
  text-align: left;
  font-size: 15px;
  font-weight: bolder;
  color: gray;
`;

export const AddBtn = styled.button`
  position: absolute;
  right: 60px;
  border-radius: 5px;
  border: none;
  font-weight: bolder;
`;

export const ItemImg = styled.img`
  width: 100%;
  height: 55%;
  border-radius: 10px;
`;

export const AddBasket = styled.button`
  width: 40%;
  border: none;
`;
