import { useQuery, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationCreatePointTransactionOfLoadingArgs,
  IQuery,
  IQueryFetchUseditemsIPickedArgs,
} from "../../../../commons/types/generated/types";
import GetUserUI from "./GetUser.presenter";
import {
  FETCH_USER_LOGGED_IN,
  CREATE_POINT_TRANSACTION_OF_LOADING,
  FETCH_USED_ITEMS_IPICKED,
  FETCH_POINT_TRANSACTIONS_OF_BUYING,
  FETCH_POINT_TRANSACTIONS_OF_LOADING,
} from "./GetUser.queries";

declare const window: Window &
  typeof globalThis & {
    IMP: any;
  };

export default function GetUser() {
  const router = useRouter();

  const { data: purchaseList } = useQuery(FETCH_POINT_TRANSACTIONS_OF_BUYING, {
    variables: { search: "", page: 1 },
  });

  const { data: chargeList } = useQuery(FETCH_POINT_TRANSACTIONS_OF_LOADING, {
    variables: { search: "", page: 1 },
  });
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  const { data: pickedItems } = useQuery<
    Pick<IQuery, "fetchUseditemsIPicked">,
    IQueryFetchUseditemsIPickedArgs
  >(FETCH_USED_ITEMS_IPICKED, {
    variables: {
      search: "",
    },
  });

  const [chargePoint] = useMutation<
    Pick<IMutation, "createPointTransactionOfLoading">,
    IMutationCreatePointTransactionOfLoadingArgs
  >(CREATE_POINT_TRANSACTION_OF_LOADING);

  const onClickPayMent = () => {
    const IMP = window.IMP;
    IMP.init("imp49910675");
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card",
        name: "Market Point",
        amount: 100,
        buyer_email: data?.fetchUserLoggedIn.email,
        buyer_name: data?.fetchUserLoggedIn.name,
      },
      async function (rsp: any) {
        // callback
        if (rsp.success) {
          console.log(rsp);
          try {
            const result = await chargePoint({
              variables: {
                impUid: rsp.imp_uid,
              },
            });
            console.log(result);
            Modal.success({ content: "충전이 완료 되었습니다." });
            location.reload();
          } catch (error) {
            error instanceof Error && Modal.error({ content: error.message });
          }
        } else {
          Modal.error({ content: "충전에 실패했습니다." });
        }
      }
    );
  };

  return (
    <GetUserUI
      data={data}
      pickedItems={pickedItems}
      purchaseList={purchaseList}
      chargeList={chargeList}
      onClickPayMent={onClickPayMent}
      onClickMoveGetItem={(id: string) => () => router.push(`/market/${id}`)}
    />
  );
}
