import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import UsedItemWriteUI from "./UsedItemWrite.presenter";
import { CREATE_USED_ITEM, UPDATE_USED_ITEM } from "./UsedItemWrite.qureies";
import { useRouter } from "next/router";
import { schema } from "./UsedItemWrite.validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useState } from "react";
import { FormValues, IUsedItemWriteProps } from "./UsedItemWrite.types";

export default function UsedItemWrite(props: IUsedItemWriteProps) {
  const router = useRouter();

  const [images, setImages] = useState([]);
  const [tags, setTags] = useState<string[]>();
  const [useditemAddress, setUseditemAddress] = useState({
    zipcode: "",
    address: "",
    addressDetail: "",
    lat: 0,
    lng: 0,
  });

  const [createUsedItem] = useMutation(CREATE_USED_ITEM);
  const [updateUsedItem] = useMutation(UPDATE_USED_ITEM);

  const { handleSubmit, register, setValue, trigger, formState, getValues } =
    useForm({
      mode: "onChange",
      resolver: yupResolver(schema),
    });

  const handleTag = (value: string[]) => {
    setTags(value);
  };

  const handleChange = (value: string) => {
    console.log(value);

    // register로 등록하지 않고, 강제로 값을 넣어주는 기능
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // onChange 됐는지 안됐는지 react-hook-form에 알려주는 기능!
    trigger("contents");
  };

  const onSubmitUsedItem = async (data: FormValues) => {
    console.log(images.length);
    if (images.length === 0) {
      alert("상품 사진을 최소 1장이라도 올려주세요");
      return;
    }
    try {
      const result = await createUsedItem({
        variables: {
          createUseditemInput: {
            name: data.name,
            contents: data.contents,
            price: data.price,
            remarks: data.remarks,
            images,
            tags,
            useditemAddress,
          },
        },
      });
      Modal.success({ title: "상품이 등록되었습니다." });
      router.push(`/market/${result.data.createUseditem._id}`);
    } catch (error) {
      error instanceof Error && Modal.error({ title: error.message });
    }
  };

  const onClickUpdate = async (data: FormValues) => {
    if (images.length === 0) {
      alert("상품 사진을 최소 1장이라도 올려주세요");
      return;
    }
    const updateUseditemInput = {
      name: data.name,
      contents: data.contents,
      price: data.price,
      remarks: data.remarks,
      images,
    };
    try {
      const result = await updateUsedItem({
        variables: {
          useditemId: props.data?.fetchUseditem._id,
          updateUseditemInput,
        },
      });
      Modal.success({ title: "상품이 수정되었습니다." });
      router.push(`/market/${result.data.updateUseditem._id}`);
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  return (
    <UsedItemWriteUI
      handleSubmit={handleSubmit}
      register={register}
      formState={formState}
      onSubmitUsedItem={onSubmitUsedItem}
      setImages={setImages}
      setUseditemAddress={setUseditemAddress}
      isEdit={props.isEdit}
      data={props.data}
      onClickUpdate={onClickUpdate}
      handleChange={handleChange}
      getValues={getValues}
      handleTag={handleTag}
    />
  );
}
