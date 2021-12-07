import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_USED_ITEM } from "./UsedItemGet.queries";
import { useEffect } from "react";

declare const window: Window &
  typeof globalThis & {
    daum: any;
    kakao: any;
  };
export default function UsedItemGetUI() {
  const router = useRouter();

  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: {
      useditemId: router.query.usedItemId,
    },
  });

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(
        data?.fetchUseditem.useditemAddress?.lng,
        data?.fetchUseditem.useditemAddress?.lat
      ),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    // 마커가 표시될 위치입니다
    const markerPosition = new window.kakao.maps.LatLng(
      data?.fetchUseditem.useditemAddress?.lng,
      data?.fetchUseditem.useditemAddress?.lat
    );

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, [data]);

  console.log(data);

  return (
    <>
      <div>상품 상세 정보 페이지</div>
      <div> 상품명 : {data?.fetchUseditem.name}</div>
      <div> 가격 : {data?.fetchUseditem.price}</div>
      <div> 상품설명 : {data?.fetchUseditem.contents}</div>
      <div> 한줄소개 : {data?.fetchUseditem.remarks}</div>
      <div> 이미지 : {data?.fetchUseditem.images.map((el: any) => el)}</div>
      <div> 우편번호 : {data?.fetchUseditem.useditemAddress?.zipcode}</div>
      <div> 주소 : {data?.fetchUseditem.useditemAddress?.address}</div>
      <div> lat : {data?.fetchUseditem.useditemAddress?.lat}</div>
      <div> lng : {data?.fetchUseditem.useditemAddress?.lng}</div>
      <div> 아이디 : {data?.fetchUseditem._id}</div>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
      <button
        onClick={() => router.push(`/market/${data?.fetchUseditem._id}/edit`)}
      >
        수정하기
      </button>
    </>
  );
}
