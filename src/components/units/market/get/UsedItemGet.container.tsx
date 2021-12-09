import UsedItemGetUI from "./UsedItemGet.presenter";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  FETCH_USED_ITEM,
  CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
} from "./UsedItemGet.queries";
import { Modal } from "antd";
import { IUseditem } from "../../../../commons/types/generated/types";

export default function UsedItemGet() {
  const router = useRouter();

  const [purchaseUsedItem] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
  );

  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: {
      useditemId: router.query.usedItemId,
    },
  });

  const onClickPurchase = (itemId: any) => async () => {
    try {
      const result = await purchaseUsedItem({
        variables: {
          useritemId: itemId,
        },
      });
      console.log(result);
      Modal.success({ content: "구매가 완료되었습니다." });
      router.push("/user/get");
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
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
    alert("장바구니에 담았습니다.");
  };

  return (
    <UsedItemGetUI
      data={data}
      onClickEdit={() => () =>
        router.push(`/market/${data?.fetchUseditem._id}/edit`)}
      onClickPurchase={onClickPurchase}
      onClickBasket={onClickBasket}
    />
  );
}
