import * as S from "./MarketList.styles";
import InfiniteScroll from "react-infinite-scroller";
import { IMarketListUIProps } from "./MarketList.types";
import { changeUrl } from "../../../../commons/libraries/utils";

export default function MarketListUI(props: IMarketListUIProps) {
  return (
    <>
      <S.ListHeader>
        <h3>Best Of The Items</h3>
        <S.AddBtn onClick={props.onMoveMarketNew}>상품 등록하기</S.AddBtn>
      </S.ListHeader>
      <S.BestWrapper>
        {props.bestUsedItems?.fetchUseditemsOfTheBest.map((el) => (
          <S.BestItemCard key={el._id}>
            <S.ItemImg
              src={changeUrl(el.images?.[0] || "")}
              onError={props.handleErrorImg}
            />
            <S.Info onClick={props.onClickGetItem(el._id)}>{el.name}</S.Info>
            <S.Info>₩ {el.price}</S.Info>
            <S.BasketIcon
              src="/images/market/cart.png"
              onClick={props.onClickBasket(el)}
            />
          </S.BestItemCard>
        ))}
      </S.BestWrapper>
      <S.SearchBar>search bar</S.SearchBar>
      <InfiniteScroll pageStart={0} loadMore={props.onLoad} hasMore={true}>
        <S.UsedItemsWrapper>
          {props.usedItems?.fetchUseditems.map((el) => (
            <S.ItemCardWrapper key={el._id}>
              <S.ItemCard>
                <S.ItemImg
                  src={changeUrl(el.images?.[0] || "")}
                  onError={props.handleErrorImg}
                />
                <S.Info onClick={props.onClickGetItem(el._id)}>
                  {el.name}
                </S.Info>
                <S.Info>₩ {el.price}</S.Info>
                <S.BasketIcon
                  src="/images/market/cart.png"
                  onClick={props.onClickBasket(el)}
                />
              </S.ItemCard>
            </S.ItemCardWrapper>
          ))}
        </S.UsedItemsWrapper>
      </InfiniteScroll>
    </>
  );
}
