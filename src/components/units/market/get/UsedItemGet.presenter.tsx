import GetMap from "../../../commons/address/get/GetMap.container";
import Dompurify from "dompurify";
import { changeUrl } from "../../../../commons/libraries/utils";

export default function UsedItemGetUI(props: any) {
  return (
    <>
      <div>상품 상세 정보 페이지</div>
      <div> 상품명 : {props.data?.fetchUseditem.name}</div>
      <div> 가격 : {props.data?.fetchUseditem.price}</div>
      {/* <div> 상품설명 : {props.data?.fetchUseditem.contents}</div> */}
      상품설명 :
      {process.browser ? (
        <div
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(
              props.data?.fetchUseditem.contents || ""
            ),
          }}
        ></div>
      ) : (
        <div />
      )}
      <div> 한줄소개 : {props.data?.fetchUseditem.remarks}</div>
      <div>
        이미지 :{" "}
        {props.data?.fetchUseditem.images.map((el: any) => changeUrl(el))}
      </div>
      <div>우편번호 : {props.data?.fetchUseditem.useditemAddress?.zipcode}</div>
      <div> 주소 : {props.data?.fetchUseditem.useditemAddress?.address}</div>
      <div> lat : {props.data?.fetchUseditem.useditemAddress?.lat}</div>
      <div> lng : {props.data?.fetchUseditem.useditemAddress?.lng}</div>
      <div> 아이디 : {props.data?.fetchUseditem._id}</div>
      <GetMap data={props.data} />
      <button onClick={props.onClickPurchase(props.data?.fetchUseditem._id)}>
        구매하기
      </button>
      <button onClick={props.onClickEdit(props.data?.fetchUseditem._id)}>
        수정하기
      </button>
      <button onClick={props.onClickBasket(props.data?.fetchUseditem)}>
        장바구니
      </button>
    </>
  );
}
