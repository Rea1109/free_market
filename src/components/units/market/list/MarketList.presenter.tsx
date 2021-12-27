import * as S from "./MarketList.styles";
import InfiniteScroll from "react-infinite-scroller";
import { IMarketListUIProps } from "./MarketList.types";
import {
  changeUrl,
  replaceAddr,
  replacePrice,
} from "../../../../commons/libraries/utils";
import { v4 as uuid } from "uuid";
import SearchBar from "../../../commons/search/Search.container";

export default function MarketListUI(props: IMarketListUIProps) {
  return (
    <>
      <S.ListHeader>
        <S.HeaderTitle>Best Of The Items</S.HeaderTitle>
        <S.AddBtn onClick={props.onMoveMarketNew}>상품 등록하기</S.AddBtn>
      </S.ListHeader>
      <S.BestWrapper>
        {props.bestUsedItems?.fetchUseditemsOfTheBest.map((el) => (
          <S.BestItemCard key={uuid()}>
            <S.ItemImg
              src={changeUrl(el.images?.[0] || "")}
              onError={props.handleErrorImg}
            />
            <S.InfoWrapper>
              <S.ItemName onClick={props.onClickGetItem(el._id)}>
                {el.name}
              </S.ItemName>
              <S.ItemIcon>{replacePrice(String(el.price))}</S.ItemIcon>
              <S.IconWrapper>
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <img
                    style={{ width: "16px", height: "16px" }}
                    src="/images/boards/list/like.png"
                  />
                  <div>{el.pickedCount}</div>
                </div>
                <div
                  style={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <img
                    style={{ width: "20px", height: "20px" }}
                    src="/images/boards/get/location.png"
                  />
                  <div>
                    {el.useditemAddress?.address
                      ? replaceAddr(el.useditemAddress?.address)
                      : "주소 없음"}
                  </div>
                </div>
              </S.IconWrapper>
            </S.InfoWrapper>
          </S.BestItemCard>
        ))}
      </S.BestWrapper>
      <S.SearchBarWrapper>
        <SearchBar
          setKeyWord={props.setKeyWord}
          onClickSearch={props.onClickSearch}
        />
      </S.SearchBarWrapper>
      <InfiniteScroll pageStart={0} loadMore={props.onLoad} hasMore={true}>
        <S.InfiniteScrollBody>
          <S.UsedItemsWrapper>
            {props.usedItems?.fetchUseditems.map((el) => (
              <S.ItemCardWrapper key={uuid()}>
                <S.ItemCard key={el._id}>
                  <S.ItemImg
                    src={changeUrl(el.images?.[0] || "")}
                    onError={props.handleErrorImg}
                  />
                  <S.InfoWrapper>
                    <S.ItemName onClick={props.onClickGetItem(el._id)}>
                      {el.name}
                    </S.ItemName>
                    <S.ItemIcon>{replacePrice(String(el.price))}</S.ItemIcon>
                    <S.IconWrapper>
                      <div
                        style={{
                          width: "40%",
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <img
                          style={{ width: "18px", height: "18px" }}
                          src="/images/boards/list/like.png"
                        />
                        <div>{el.pickedCount}</div>
                      </div>
                      <div
                        style={{
                          width: "70%",
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <img
                          style={{ width: "20px", height: "20px" }}
                          src="/images/boards/get/location.png"
                        />
                        <div>
                          {el.useditemAddress?.address
                            ? replaceAddr(el.useditemAddress?.address)
                            : "주소 없음"}
                        </div>
                      </div>
                    </S.IconWrapper>
                  </S.InfoWrapper>
                </S.ItemCard>
              </S.ItemCardWrapper>
            ))}
          </S.UsedItemsWrapper>
        </S.InfiniteScrollBody>
      </InfiniteScroll>
    </>
  );
}
