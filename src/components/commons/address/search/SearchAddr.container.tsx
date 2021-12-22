import SearchAddrUI from "./SearchAddr.presenter";
import { ChangeEvent, useEffect, useState } from "react";

declare const window: Window &
  typeof globalThis & {
    daum: any;
    kakao: any;
  };

export default function SearchAddr(props: any) {
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

  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    props.setUseditemAddress((prev: any) => ({
      ...prev,
      addressDetail: event.target.value,
    }));
  };

  return (
    <SearchAddrUI
      zipcode={zipcode}
      address={address}
      onClickSearchAddr={onClickSearchAddr}
      onChangeAddressDetail={onChangeAddressDetail}
    />
  );
}
