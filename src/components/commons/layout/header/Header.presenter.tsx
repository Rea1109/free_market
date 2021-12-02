import * as S from "./Header.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

export default function HeaderUI() {
  return (
    <S.Header>
      <Slider {...settings}>
        <S.SliderDiv>
          <S.SliderItem src="/images/commons/header-bg(1).png" />
        </S.SliderDiv>
        <S.SliderDiv>
          <S.SliderItem src="/images/commons/header-bg(2).png" />
        </S.SliderDiv>
        <S.SliderDiv>
          <S.SliderItem src="/images/commons/header-bg(3).png" />
        </S.SliderDiv>
        <S.SliderDiv>
          <S.SliderItem src="/images/commons/header-bg(4).png" />
        </S.SliderDiv>
        <S.SliderDiv>
          <S.SliderItem src="/images/commons/header-bg(5).png" />
        </S.SliderDiv>
        <S.SliderDiv>
          <S.SliderItem src="/images/commons/header-bg(6).png" />
        </S.SliderDiv>
      </Slider>
    </S.Header>
  );
}
