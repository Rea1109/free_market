import { useQuery, gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import {
  IMutation,
  IMutationCreatePointTransactionOfLoadingArgs,
  IQuery,
} from "../../../../commons/types/generated/types";
import GetUserUI from "./GetUser.presenter";
import { FETCH_USER_LOGGED_IN } from "./GetUser.queries";

const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      useditem {
        name
        price
        remarks
        contents
      }
    }
  }
`;

declare const window: Window &
  typeof globalThis & {
    IMP: any;
  };

export default function GetUser() {
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  console.log(data);

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
        // buyer_tel: "010-4242-4242",
        // buyer_addr: "서울특별시 강남구 신사동",
        // buyer_postcode: "01181",
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
  return <GetUserUI data={data} onClickPayMent={onClickPayMent} />;
}
