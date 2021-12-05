import { useEffect, useState } from "react";
import * as S from "./SearchAddr.styles";
import Head from "next/head";

declare const window: Window &
  typeof globalThis & {
    daum: any;
    kakao: any;
  };

export default function SearchAddrUI(props: any) {
  const [MyGeocoder, setMyGeocoder] = useState<any>(null);
  const [MyMap, setMyMap] = useState<any>(null);
  const [MyMarkerT, setMyMarker] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");

  function onClickSearchAddr() {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        const addr = data.address; // 최종 주소 변수
        const zonecode = data.zonecode;

        // 주소 정보를 해당 필드에 넣는다.
        setAddress(addr);
        // 우편코드
        setZipcode(zonecode);
        // props.setUseditemAddress((prev: any) => ({
        //   ...prev,
        //   zipcode,
        //   address,
        // }));
        // 주소로 상세 정보를 검색
        MyGeocoder.addressSearch(
          data.address,
          function (results: any, status: any) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.daum.maps.services.Status.OK) {
              const result = results[0]; // 첫번째 결과의 값을 활용

              // 해당 주소에 대한 좌표를 받아서
              const coords = new window.daum.maps.LatLng(result.y, result.x);
              console.log(result.y, result.x); // 좌표값 확인
              props.setUseditemAddress((prev: any) => ({
                ...prev,
                zipcode: zonecode,
                address: addr,
                lat: Number(result.x),
                lng: Number(result.y),
              }));
              // 지도를 보여준다.
              MyMap.relayout();
              // 지도 중심을 변경한다.
              MyMap.setCenter(coords);
              // 마커를 결과값으로 받은 위치로 옮긴다.
              MyMarkerT.setPosition(coords);
            }
          }
        );
      },
    }).open();
  }

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.4849270383011, 126.896538036905),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    setMyMap(map);

    const geocoder = new window.daum.maps.services.Geocoder();
    setMyGeocoder(geocoder);

    // 마커가 표시될 위치입니다
    const markerPosition = new window.kakao.maps.LatLng(
      37.4849270383011,
      126.896538036905
    );

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    setMyMarker(marker);
  }, []);

  return (
    <>
      <Head>
        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=7b7bd68bba98dd72e7204e4be68eaab0&libraries=services"
        ></script>
      </Head>
      <S.AddressTitle>Search Address</S.AddressTitle>
      <S.Map id="map" />
      <S.AddrInfoWrapper>
        <S.AddressInputBox
          type="text"
          placeholder="주소"
          value={address}
          readOnly
        />
        <S.AddressInputBox
          type="text"
          placeholder="우편번호"
          value={zipcode}
          readOnly
        />
        <S.SearchAddrBtn type="button" onClick={onClickSearchAddr}>
          주소 검색
        </S.SearchAddrBtn>
      </S.AddrInfoWrapper>
    </>
  );
}
