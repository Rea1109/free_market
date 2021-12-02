import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import UsedItemWriteUI from "./UsedItemWrite.presenter";
import { CREATE_USED_ITEM } from "./UsedItemWrite.qureies";
import { useRouter } from "next/router";
import { schema } from "./UsedItemWrite.validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useState } from "react";
import { FormValues } from "./UsedItemWrite.types";

export default function UsedItemWrite() {
  const router = useRouter();

  const [images, setImages] = useState([]);

  const [createUsedItem] = useMutation(CREATE_USED_ITEM);

  const { handleSubmit, register, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmitUsedItem = async (data: FormValues) => {
    try {
      const result = await createUsedItem({
        variables: {
          createUseditemInput: {
            name: data.name,
            contents: data.contents,
            price: data.price,
            remarks: data.remarks,
            images,
            tags: [],
          },
        },
      });
      console.log(result.data.createUseditem);
      Modal.success({ title: "상품이 등록되었습니다." });
      router.push(`/market/${result.data.createUseditem._id}`);
    } catch (error) {
      error instanceof Error && Modal.error({ title: error.message });
    }
  };

  return (
    <UsedItemWriteUI
      handleSubmit={handleSubmit}
      register={register}
      formState={formState}
      onSubmitUsedItem={onSubmitUsedItem}
      setImages={setImages}
    />
  );
}
