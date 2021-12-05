import * as S from "./Uploads.styles";
import { changeUrl } from "../../../commons/libraries/utils";

export default function UploadsUI(props: any) {
  return (
    <>
      <S.UploadImageTitle>Attach Images</S.UploadImageTitle>
      <S.UploadImageWrapper>
        {props.uploadImages &&
          props.uploadImages.map((el: string, idx: number) => (
            <>
              <S.UploadImage key={el} src={changeUrl(el)} />
            </>
          ))}

        <S.UploadIcon onClick={props.onClickAddImage}>
          upload image
        </S.UploadIcon>
      </S.UploadImageWrapper>

      <input
        hidden
        type="file"
        onChange={props.onChangeFile}
        ref={props.fileRef}
      />
    </>
  );
}
