import * as S from "./SearchAddr.styles";

export default function SearchAddrUI(props: any) {
  return (
    <S.MapWrapper>
      <S.AddressTitle>Location</S.AddressTitle>
      <S.Map id="map" />
      <S.AddrInfoWrapper>
        <S.ZipcodeBox
          type="text"
          placeholder="우편번호"
          value={props.zipcode}
          readOnly
        />
        <S.AddreessBox
          type="text"
          placeholder="주소"
          value={props.address}
          readOnly
        />
        <S.AddressDetailBox type="text" placeholder="상세 주소" />
        <S.SearchAddrBtn type="button" onClick={props.onClickSearchAddr}>
          주소 검색
        </S.SearchAddrBtn>
      </S.AddrInfoWrapper>
    </S.MapWrapper>
  );
}
