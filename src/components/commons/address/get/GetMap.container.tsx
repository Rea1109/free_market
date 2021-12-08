import GetMapUI from "./GetMap.presenter";
import { useEffect } from "react";

declare const window: Window &
  typeof globalThis & {
    daum: any;
    kakao: any;
  };

export default function GetMap(props: any) {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(
        props.data?.fetchUseditem.useditemAddress?.lng,
        props.data?.fetchUseditem.useditemAddress?.lat
      ),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    // 마커가 표시될 위치입니다
    const markerPosition = new window.kakao.maps.LatLng(
      props.data?.fetchUseditem.useditemAddress?.lng,
      props.data?.fetchUseditem.useditemAddress?.lat
    );

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  });

  return <GetMapUI />;
}
