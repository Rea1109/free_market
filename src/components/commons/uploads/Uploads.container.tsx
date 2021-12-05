import UploadsUI from "./Uploads.presenter";
import { ChangeEvent, useState, useRef } from "react";
import { UPLOAD_FILE } from "./Uploads.queries";
import { useMutation } from "@apollo/client";
import { checkValidationImage } from "./Uploads.validation";

export default function Uploads(props: any) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [uploadImages, setUploadImages] = useState<string[]>([]);

  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickAddImage = () => {
    fileRef.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (uploadImages.length > 2) {
      alert("최대 3개 등록 가능");
      return;
    }
    const file = checkValidationImage(event.target.files?.[0]);
    if (!file) return;
    const result = await uploadFile({
      variables: { file },
    });
    setUploadImages((prev) => [...prev, result.data.uploadFile.url]);
    props.setImages((prev: []) => [...prev, result.data.uploadFile.url]);
  };

  const onClickDelete = (idx: number) => () => {
    alert("삭제");
    console.log(uploadImages[idx]);
    console.log(uploadImages);
  };
  return (
    <UploadsUI
      onChangeFile={onChangeFile}
      uploadImages={uploadImages}
      onClickAddImage={onClickAddImage}
      fileRef={fileRef}
      onClickDelete={onClickDelete}
    />
  );
}
