import UsedItemGetUI from "./UsedItemGet.presenter";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  FETCH_USED_ITEM,
  CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  TOGGLE_USED_ITEM_PICK,
  FETCH_USER_LOGGED_IN,
  DELETE_USED_ITEM,
  FETCH_USED_ITEMS_IPICKED,
} from "./UsedItemGet.queries";
import { Modal } from "antd";
import {
  IQuery,
  IQueryFetchUseditemArgs,
  IQueryFetchUseditemsIPickedArgs,
  IUseditem,
} from "../../../../commons/types/generated/types";
import { useEffect, useState } from "react";
export default function UsedItemGet() {
  const router = useRouter();

  const [isPick, setIsPick] = useState(false);
  const [purchaseUsedItem] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
  );
  const [toggleUseditemPick] = useMutation(TOGGLE_USED_ITEM_PICK);
  const [deleteUsedItem] = useMutation(DELETE_USED_ITEM);
  const { data: userInfo } = useQuery(FETCH_USER_LOGGED_IN);

  const { data: pickItems, refetch: fetchPick } = useQuery<
    Pick<IQuery, "fetchUseditemsIPicked">,
    IQueryFetchUseditemsIPickedArgs
  >(FETCH_USED_ITEMS_IPICKED, { variables: { search: "", page: 1 } });

  useEffect(() => {
    const pickList = pickItems?.fetchUseditemsIPicked.map((el) => el._id);
    pickList?.includes(String(router.query.usedItemId))
      ? setIsPick(true)
      : setIsPick(false);
  }, [pickItems]);

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: {
      useditemId: String(router.query.usedItemId),
    },
  });

  const onClickPurchase = (itemId: any) => async () => {
    try {
      await purchaseUsedItem({
        variables: {
          useritemId: itemId,
        },
      });
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

  const onClickPick = (itemId: string) => async () => {
    try {
      const result = await toggleUseditemPick({
        variables: {
          useditemId: itemId,
        },
      });
      const toggleInfo = result.data?.toggleUseditemPick;
      if (toggleInfo === 1) {
        Modal.success({ content: "찜하기 완료" });
        setIsPick(true);
      } else {
        Modal.success({ content: "찜하기취소" });
        setIsPick(false);
      }
      fetchPick();
      refetch();
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  const onClickDelete = (id: string) => () => {
    try {
      deleteUsedItem({ variables: { useditemId: id } });
      Modal.success({ content: "상품 삭제가 완료 되었습니다." });
      router.push("/market");
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  return (
    <UsedItemGetUI
      data={data}
      pickItems={pickItems}
      userInfo={userInfo}
      isPick={isPick}
      onClickEdit={() => () =>
        router.push(`/market/${data?.fetchUseditem._id}/edit`)}
      onClickPurchase={onClickPurchase}
      onClickBasket={onClickBasket}
      onClickPick={onClickPick}
      onClickDelete={onClickDelete}
    />
  );
}
