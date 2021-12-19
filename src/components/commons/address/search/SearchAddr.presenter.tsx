import * as S from "./SearchAddr.styles";

export default function SearchAddrUI(props: any) {
  return (
    <S.MapWrapper>
      <S.AddressTitle>Location</S.AddressTitle>
      <S.Map id="map" />
      <S.AddrInfoWrapper>
        <S.ZipcodeBox
          type="text"
          placeholder="code"
          value={props.zipcode}
          readOnly
        />
        <S.AddreessBox
          type="text"
          placeholder="address"
          value={props.address}
          readOnly
        />
        <S.AddressDetailBox
          type="text"
          onChange={props.onChangeAddressDetail}
        />
        <S.SearchAddrBtn type="button" onClick={props.onClickSearchAddr}>
          검색
        </S.SearchAddrBtn>
      </S.AddrInfoWrapper>
    </S.MapWrapper>
  );
}
