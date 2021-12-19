import UploadsUI from "./Uploads.presenter";
import { ChangeEvent, useState, useRef } from "react";
import { UPLOAD_FILE } from "./Uploads.queries";
import { useMutation } from "@apollo/client";
import { checkValidationImage } from "./Uploads.validation";

export default function Uploads(props: any) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [isEditImage, setIsEditImage] = useState(false);
  const [uploadImages, setUploadImages] = useState<string[]>([]);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickAddImage = () => {
    console.log(uploadImages.length);
    fileRef.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(uploadImages.length);
    console.log(uploadImages);

    if (!isEditImage) {
      if (props.data?.fetchUseditem.images.length > 2) {
        alert("최대 3개 등록 가능");
        return;
      }
    }

    if (isEditImage) {
      if (uploadImages.length > 2) {
        alert("최대 3개 등록 가능");
        return;
      }
    }

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

  const deleteImageFile = (el: any) => () => {
    console.log(el);
    setUploadImages([...props.data?.fetchUseditem.images]);

    if (isEditImage) {
      const temp = uploadImages.filter((prev) => {
        return prev !== el;
      });
      setUploadImages(temp);
      console.log(temp);
    } else {
      const temp = props.data?.fetchUseditem.images.filter((prev: any) => {
        return prev !== el;
      });
      setUploadImages(temp);
      setIsEditImage(true);
      console.log(temp);
    }
  };

  return (
    <UploadsUI
      onChangeFile={onChangeFile}
      uploadImages={uploadImages}
      onClickAddImage={onClickAddImage}
      fileRef={fileRef}
      isEdit={props.isEdit}
      data={props.data}
      deleteImageFile={deleteImageFile}
      isEditImage={isEditImage}
    />
  );
}
