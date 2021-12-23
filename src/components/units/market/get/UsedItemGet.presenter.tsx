import * as S from "./UsedItemGet.styles";
import Slider from "react-slick";
import GetMap from "../../../commons/address/get/GetMap.container";
import Dompurify from "dompurify";
import { changeUrl } from "../../../../commons/libraries/utils";
import { UsedItemGetUIProps } from "./UsedItemGet.types";

export default function UsedItemGetUI(props: UsedItemGetUIProps) {
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
          {props.data?.fetchUseditem.images?.map((el: any) => (
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
        {process.browser ? (
          <S.ItemnContents
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(
                props.data?.fetchUseditem.contents || ""
              ),
            }}
          ></S.ItemnContents>
        ) : (
          <div />
        )}
        <S.ItemInfoContents>
          한줄소개 : {props.data?.fetchUseditem.remarks}
        </S.ItemInfoContents>
        <S.ItemInfoContents>
          태그 : {props.data?.fetchUseditem.tags}
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
            <button onClick={props.onClickEdit()}>수정하기</button>
            <button
              onClick={props.onClickDelete(props.data?.fetchUseditem._id)}
            >
              삭제하기
            </button>
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
            {props.isPick ? (
              <button
                onClick={props.onClickPick(props.data?.fetchUseditem._id)}
              >
                찜하기 취소
              </button>
            ) : (
              <button
                onClick={props.onClickPick(props.data?.fetchUseditem._id)}
              >
                찜하기
              </button>
            )}
          </>
        )}
      </S.ItemInfoWrapper>
    </S.Wrapper>
  );
}
