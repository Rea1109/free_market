import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import UsedItemWriteUI from "./UsedItemWrite.presenter";
import { CREATE_USED_ITEM, UPDATE_USED_ITEM } from "./UsedItemWrite.qureies";
import { useRouter } from "next/router";
import { schema, editSchema } from "./UsedItemWrite.validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useState } from "react";
import { FormValues } from "./UsedItemWrite.types";

export default function UsedItemWrite(props: any) {
  console.log(props.data);
  const router = useRouter();

  const [images, setImages] = useState([]);
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
      resolver: props.isEdit ? yupResolver(editSchema) : yupResolver(schema),
    });

  const handleChange = (value: string) => {
    console.log(value);

    // register로 등록하지 않고, 강제로 값을 넣어주는 기능
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // onChange 됐는지 안됐는지 react-hook-form에 알려주는 기능!
    trigger("contents");
  };

  const onSubmitUsedItem = async (data: FormValues) => {
    try {
      const result = await createUsedItem({
        variables: {
          createUseditemInput: {
            name: data.name || props.data?.fetchUseditem.name,
            contents: data.contents,
            price: data.price || props.data?.fetchUseditem.price,
            remarks: data.remarks || props.data?.fetchUseditem.remarks,
            images,
            tags: [],
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
    const updateUseditemInput = {
      name: data.name,
      contents: data.contents,
      price: data.price,
      remarks: data.remarks,
    };
    try {
      const result = await updateUsedItem({
        variables: {
          useditemId: props.data.fetchUseditem._id,
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
    />
  );
}
