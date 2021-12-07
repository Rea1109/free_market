import MarketListUI from "./MarketList.presenter";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchUseditemsArgs,
  IUseditem,
} from "../../../../commons/types/generated/types";
import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS, FETCH_USED_ITEMS_BEST } from "./MarketList.queries";

export default function MarketList() {
  const router = useRouter();
  const { data: usedItems, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditems">,
    IQueryFetchUseditemsArgs
  >(FETCH_USED_ITEMS, {
    variables: { isSoldout: false },
  });

  const { data: bestUsedItems } = useQuery<
    Pick<IQuery, "fetchUseditemsOfTheBest">
  >(FETCH_USED_ITEMS_BEST);

  const onLoad = () => {
    if (!usedItems) return;

    fetchMore({
      variables: { page: Math.ceil(usedItems.fetchUseditems.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditems)
          return { fetchUseditems: [...prev.fetchUseditems] };

        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult?.fetchUseditems,
          ],
        };
      },
    });
  };

  const onClickBasket = (el: IUseditem) => () => {
    const baskets = JSON.parse(localStorage.getItem("basket") || "[]");
    let isExists = false;
    baskets.forEach((basketEl: IUseditem) => {
      if (el._id === basketEl._id) isExists = true;
    });

    if (isExists) {
      alert("이미 담겨져 있습니다.");
      return;
    }

    const { __typename, ...newEl } = el;
    baskets.push(newEl);

    localStorage.setItem("basket", JSON.stringify(baskets));
  };

  console.log(usedItems);

  return (
    <MarketListUI
      bestUsedItems={bestUsedItems}
      usedItems={usedItems}
      onLoad={onLoad}
      onMoveMarketNew={() => router.push("/market/new")}
      onClickBasket={onClickBasket}
      onClickGetItem={(id) => () => {
        router.push(`/market/${id}`);
      }}
    />
  );
}
