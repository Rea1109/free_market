import * as S from "./UsedItemGet.styles";
import Slider from "react-slick";
import GetMap from "../../../commons/address/get/GetMap.container";
import Dompurify from "dompurify";
import { changeUrl } from "../../../../commons/libraries/utils";

export default function UsedItemGetUI(props: any) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <S.Wrapper>
      <S.SliderDiv>
        <Slider {...settings}>
          {props.data?.fetchUseditem.images.map((el: any) => (
            <S.SliderImgDiv key={el}>
              <S.SliderImg src={changeUrl(el)} />
            </S.SliderImgDiv>
          ))}
        </Slider>
      </S.SliderDiv>
      <S.ItemInfoWrapper>
        <S.ItemInfoContents>
          상품명 : {props.data?.fetchUseditem.name}
        </S.ItemInfoContents>
        <S.ItemInfoContents>
          가격 : {props.data?.fetchUseditem.price}
        </S.ItemInfoContents>
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
        <S.ItemInfoContents>
          한줄소개 : {props.data?.fetchUseditem.remarks}
        </S.ItemInfoContents>
        <S.ItemInfoContents>
          찜하기 수 : {props.data?.fetchUseditem.pickedCount}
        </S.ItemInfoContents>
        {props.data?.fetchUseditem.useditemAddress?.lat ? (
          <GetMap data={props.data} />
        ) : (
          <div style={{ width: "500px", height: "500px" }}>좌표값 없음</div>
        )}
        {props.data?.fetchUseditem.seller?._id ===
        props.userInfo?.fetchUserLoggedIn._id ? (
          <>
            <button onClick={props.onClickEdit(props.data?.fetchUseditem._id)}>
              수정하기
            </button>
            <button>삭제하기</button>
          </>
        ) : (
          <>
            <button
              onClick={props.onClickPurchase(props.data?.fetchUseditem._id)}
            >
              구매하기
            </button>
            <button onClick={props.onClickBasket(props.data?.fetchUseditem)}>
              장바구니
            </button>
            <button onClick={props.onClickPick(props.data?.fetchUseditem._id)}>
              찜하기
            </button>
          </>
        )}
      </S.ItemInfoWrapper>
    </S.Wrapper>
  );
}
