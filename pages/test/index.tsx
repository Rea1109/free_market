import * as S from "./test.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TestPage() {
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
          <S.SliderImgDiv>
            <S.SliderImg src="/images/test/cup.jpg" alt="" />
          </S.SliderImgDiv>
          <S.SliderImgDiv>
            <S.SliderImg src="/images/test/iphone.png" alt="" />
          </S.SliderImgDiv>
          <S.SliderImgDiv>
            <S.SliderImg src="/images/test/lego.jpeg" alt="" />
          </S.SliderImgDiv>
          <S.SliderImgDiv>
            <S.SliderImg src="/images/test/toy.jpg" alt="" />
          </S.SliderImgDiv>
        </Slider>
      </S.SliderDiv>
      <S.ItemInfoWrapper>
        <S.ItemInfoContents>판매자</S.ItemInfoContents>
        <S.ItemInfoContents>등록일</S.ItemInfoContents>
        <S.ItemInfoContents>상품명</S.ItemInfoContents>
        <S.ItemInfoContents>상품 한줄 소개</S.ItemInfoContents>
        <S.ItemInfoContents>태그</S.ItemInfoContents>
        <S.ItemInfoContents>상품내용</S.ItemInfoContents>
        <S.ItemInfoContents>거래장소</S.ItemInfoContents>
        <S.Map>지도</S.Map>
      </S.ItemInfoWrapper>
    </S.Wrapper>
  );
}
