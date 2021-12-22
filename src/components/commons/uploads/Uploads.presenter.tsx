import * as S from "./Uploads.styles";
import { changeUrl } from "../../../commons/libraries/utils";

export default function UploadsUI(props: any) {
  console.log(props.isEditImage);
  return (
    <>
      <S.UploadImageTitle>Attach Images</S.UploadImageTitle>
      {props.isEdit ? (
        <S.UploadImageWrapper>
          {props.isEditImage
            ? props.uploadImages.map((el: string, idx: number) => (
                <S.UploadImage
                  key={el}
                  src={changeUrl(el)}
                  onClick={props.deleteImageFile(el)}
                />
              ))
            : props.data?.fetchUseditem.images?.map(
                (el: string, idx: number) => (
                  <S.UploadImage
                    key={el}
                    src={changeUrl(el)}
                    onClick={props.deleteImageFile(el)}
                  />
                )
              )}
          {}
          <S.UploadIcon onClick={props.onClickAddImage}>
            upload image
          </S.UploadIcon>
        </S.UploadImageWrapper>
      ) : (
        <S.UploadImageWrapper>
          {props.uploadImages &&
            props.uploadImages.map((el: string, idx: number) => (
              <S.UploadImage
                key={el}
                src={changeUrl(el)}
                onClick={props.deleteImageFile(el)}
              />
            ))}

          <S.UploadIcon onClick={props.onClickAddImage}>
            upload image
          </S.UploadIcon>
        </S.UploadImageWrapper>
      )}

      <input
        hidden
        type="file"
        onChange={props.onChangeFile}
        ref={props.fileRef}
      />
    </>
  );
}
