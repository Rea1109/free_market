import { Modal } from "antd";
import axios from "axios";
import { KeyboardEvent, useState } from "react";

declare const window: Window &
  typeof globalThis & {
    daum: any;
    kakao: any;
  };

export default function TestPage() {
  // const [tags, setTags] = useState([]);
  const [content, setContent] = useState();

  const onKeyUpTest = (e: KeyboardEvent<HTMLInputElement>) => {
    // if (e.key === "Enter") console.log(e.target.value);
  };

  const onClickApi = async () => {
    const result = await axios.get(
      "http://openapi.seoul.go.kr:8088/75676d4b54776f6f3130397555666d4f/json/SeoulGilWalkCourse/1/30/강남서초한강길"
    );
    console.log(
      result.data.SeoulGilWalkCourse.row[0].X,
      result.data.SeoulGilWalkCourse.row[0].Y
    );
    setContent(result.data.SeoulGilWalkCourse.row[0].CONTENT);

    const coords = new window.kakao.maps.Coords(
      result.data.SeoulGilWalkCourse.row[0].Y,
      result.data.SeoulGilWalkCourse.row[0].X
    );

    console.log(coords.toString());

    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.4849270383011, 126.896538036905),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

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
  };

  const test = () => {
    Modal.success({ content: "test" });
  };

  return (
    <>
      <div>test page</div>
      <input type="text" onKeyPress={onKeyUpTest} />
      <button onClick={onClickApi}>open api</button>
      <textarea value={content}></textarea>
      <div style={{ width: "500px", height: "500px" }} id="map"></div>
      <button onClick={test}>modal test</button>
    </>
  );
}
