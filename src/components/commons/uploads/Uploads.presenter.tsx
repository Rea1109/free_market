import { changeUrl } from "../../../commons/libraries/utils";

export default function UploadsUI(props: any) {
  return (
    <>
      {props.uploadImages &&
        props.uploadImages.map((el: string) => (
          <img
            key={el}
            src={changeUrl(el)}
            style={{ width: "60px", height: "60px" }}
          />
        ))}
      <div
        onClick={props.onClickAddImage}
        style={{ backgroundColor: "gray", width: "60px", height: "60px" }}
      ></div>
      <input
        hidden
        type="file"
        onChange={props.onChangeFile}
        ref={props.fileRef}
      />
    </>
  );
}
