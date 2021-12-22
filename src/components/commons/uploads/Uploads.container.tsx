import UploadsUI from "./Uploads.presenter";
import { ChangeEvent, useState, useRef } from "react";
import { UPLOAD_FILE } from "./Uploads.queries";
import { useMutation } from "@apollo/client";
import { checkValidationImage } from "./Uploads.validation";

export default function Uploads(props: any) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [uploadImages, setUploadImages] = useState<string[]>([]);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [isEditImage, setIsEditImage] = useState(false);

  const onClickAddImage = () => {
    console.log(uploadImages.length);
    fileRef.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (props.isEdit) {
      if (!isEditImage) {
        if (props.data?.fetchUseditem.images.length === 3) {
          alert("최대 3개 등록 가능");
          return;
        }
      } else {
        if (uploadImages.length === 3) {
          alert("최대 3개 등록 가능");
          return;
        }
      }
      const file = checkValidationImage(event.target.files?.[0]);
      if (!file) return;

      const result = await uploadFile({
        variables: { file },
      });

      if (!isEditImage) {
        setUploadImages([
          ...props.data?.fetchUseditem.images,
          result.data.uploadFile.url,
        ]);
        props.setImages([
          ...props.data?.fetchUseditem.images,
          result.data.uploadFile.url,
        ]);
        console.log(result.data.uploadFile.url);
        setIsEditImage(true);
      } else {
        setUploadImages((prev) => [...prev, result.data.uploadFile.url]);
        props.setImages((prev: []) => [...prev, result.data.uploadFile.url]);
        console.log(result.data.uploadFile.url);
      }
    } else {
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
    }
  };

  const deleteImageFile = (el: any) => () => {
    if (props.isEdit) {
      if (isEditImage) {
        const temp = uploadImages.filter((prev) => prev !== el);
        setUploadImages([...temp]);
        props.setImages([...temp]);
        console.log(temp);
      } else {
        const temp = props.data?.fetchUseditem.images.filter(
          (prev: []) => prev !== el
        );
        setUploadImages([...temp]);
        props.setImages([...temp]);
        setIsEditImage(true);
      }
    } else {
      alert("이미지 삭제");
      const temp = uploadImages.filter((prev) => prev !== el);
      setUploadImages([...temp]);
      props.setImages([...temp]);
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
