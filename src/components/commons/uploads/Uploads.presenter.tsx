import * as S from "./Uploads.styles";
import { changeUrl } from "../../../commons/libraries/utils";

export default function UploadsUI(props: any) {
  return (
    <>
      {props.uploadImages &&
        props.uploadImages.map((el: string, idx: number) => (
          <S.UploadImageWrapper key={el}>
            <S.UploadImage src={changeUrl(el)} />
            <S.DeleteIcon
              onClick={props.onClickDelete(idx)}
              src="/images/commons/logout.png"
            />
          </S.UploadImageWrapper>
        ))}
      <S.UploadIcon onClick={props.onClickAddImage}></S.UploadIcon>

      <input
        hidden
        type="file"
        onChange={props.onChangeFile}
        ref={props.fileRef}
      />
    </>
  );
}
