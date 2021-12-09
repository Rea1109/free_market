import MarketListUI from "./MarketList.presenter";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "../../../../commons/types/generated/types";
import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS, FETCH_USED_ITEMS_BEST } from "./MarketList.queries";
import { SyntheticEvent } from "react";

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

  const handleErrorImg = (event: SyntheticEvent) => {
    event.target.src = "/images/commons/error-image.jpg";
  };

  return (
    <MarketListUI
      bestUsedItems={bestUsedItems}
      usedItems={usedItems}
      onLoad={onLoad}
      onMoveMarketNew={() => router.push("/market/new")}
      onClickGetItem={(id) => () => {
        router.push(`/market/${id}`);
      }}
      handleErrorImg={handleErrorImg}
    />
  );
}
