import * as S from "./MarketList.styles";
import InfiniteScroll from "react-infinite-scroller";
import { IMarketListUIProps } from "./MarketList.types";

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
            <S.Info onClick={props.onClickGetItem(el._id)}>{el.name}</S.Info>
            <S.Info>{el.remarks}</S.Info>
            <S.Info>{el.contents}</S.Info>
            <S.Info>{el.price}</S.Info>
            <button onClick={props.onClickBasket(el)}>장바구니</button>
          </S.BestItemCard>
        ))}
      </S.BestWrapper>
      <S.SearchBar>search bar</S.SearchBar>
      <InfiniteScroll pageStart={0} loadMore={props.onLoad} hasMore={true}>
        <S.UsedItemsWrapper>
          {props.usedItems?.fetchUseditems.map((el) => (
            <S.ItemCardWrapper key={el._id}>
              <S.ItemCard>
                <S.Info>{el.images?.[0] || "노이미지"}</S.Info>
                <S.Info onClick={props.onClickGetItem(el._id)}>
                  {el.name}
                </S.Info>
                <S.Info>{el.remarks}</S.Info>
                <S.Info>{el.contents}</S.Info>
                <S.Info>{el.price}</S.Info>
                <S.Info>{el.useditemAddress?.address || "주소없음"}</S.Info>
                <button onClick={props.onClickBasket(el)}>장바구니</button>
              </S.ItemCard>
            </S.ItemCardWrapper>
          ))}
        </S.UsedItemsWrapper>
      </InfiniteScroll>

      <S.UpBtn onClick={() => window.scrollTo(0, 500)}>검색하기</S.UpBtn>
    </>
  );
}
