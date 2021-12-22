import Head from "next/head";
import { Fragment } from "react";
import * as S from "./GetUser.styles";
import { v4 as uuid } from "uuid";
import { getDate } from "../../../../commons/libraries/utils";

export default function GetUserUI(props: any) {
  console.log(props.purchaseList);
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>
      <div>
        <span> 이름 : {props.data?.fetchUserLoggedIn.name}</span> <br />
        <span> 이메일 : {props.data?.fetchUserLoggedIn.email}</span> <br />
        <span> 포인트 : {props.data?.fetchUserLoggedIn.userPoint.amount}</span>
        <br />
      </div>
      <S.PickDiv>
        <h3>찜한 상품</h3>
        {props.pickedItems?.fetchUseditemsIPicked.length !== 0
          ? props.pickedItems?.fetchUseditemsIPicked.map((item: any) => (
              <Fragment key={item._id}>
                <span>{item.name}</span>
                <span> {item.price}</span>
                <button onClick={props.onClickMoveGetItem(item._id)}>
                  상품 보러가기
                </button>
              </Fragment>
            ))
          : "찜 한 상품 없음"}
      </S.PickDiv>
      <S.ListWrapper>
        <S.PurchaseListDiv>
          {props.purchaseList?.fetchPointTransactionsOfBuying.length !== 0 ? (
            <>
              <h3>구매 목록</h3>
              {props.purchaseList?.fetchPointTransactionsOfBuying?.map(
                (el: any) => (
                  <S.ListDiv key={uuid()}>
                    <h4>날짜 : {getDate(el.createdAt)}</h4>
                    <h4> 사용금액 : {el.amount} </h4>
                    <h4> 잔액 : {el.balance} </h4>
                    <h4> 구매 상품 : {el.useditem.name} </h4>
                  </S.ListDiv>
                )
              )}
            </>
          ) : (
            <>
              <h3>구매 목록 없음</h3>
            </>
          )}
        </S.PurchaseListDiv>

        <S.ChargeListDiv>
          {props.chargeList?.fetchPointTransactionsOfLoading.length !== 0 ? (
            <>
              <h3>충전 목록</h3>
              {props.chargeList?.fetchPointTransactionsOfLoading?.map(
                (el: any) => (
                  <S.ListDiv key={uuid()}>
                    <h4>날짜 : {getDate(el.createdAt)}</h4>
                    <h4> 충전금액 : {el.amount} </h4>
                    <h4> 잔액 : {el.balance} </h4>
                  </S.ListDiv>
                )
              )}
            </>
          ) : (
            <>
              <h3>충전 목록 없음</h3>
            </>
          )}
        </S.ChargeListDiv>
      </S.ListWrapper>

      <button onClick={props.onClickPayMent}>충전하기</button>
    </>
  );
}
