import { useRouter } from "next/router";
import SearchAddr from "../../../commons/address/search/SearchAddr.container";
import Uploads from "../../../commons/uploads/Uploads.container";
import * as S from "./UsedItemWrite.styles";
import { Select } from "antd";

export default function UsedItemWriteUI(props: any) {
  const router = useRouter();
  const children = ["a", "b", "c"];
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <>
      <S.WriteUsedItemForm
        onSubmit={
          props.isEdit
            ? props.handleSubmit(props.onClickUpdate)
            : props.handleSubmit(props.onSubmitUsedItem)
        }
      >
        <S.FormLeft>
          <S.FormLeftBody>
            <S.FormLeftTitle>Product Info</S.FormLeftTitle>
            <S.InfoWrapper>
              <S.InfoInputBox
                label="Product Name"
                defaultValue={props.isEdit && props.data?.fetchUseditem.name}
                {...props.register("name")}
                type="text"
              />
              <S.ErrorText>{props.formState.errors.name?.message}</S.ErrorText>
            </S.InfoWrapper>

            <S.InfoWrapper>
              <S.InfoInputBox
                label="Price"
                defaultValue={props.isEdit && props.data?.fetchUseditem.price}
                type="number"
                {...props.register("price")}
              />
              <S.ErrorText>{props.formState.errors.price?.message}</S.ErrorText>
            </S.InfoWrapper>
            <S.InfoWrapper>
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Tags Mode"
                onChange={handleChange}
              >
                {children}
              </Select>
            </S.InfoWrapper>
            <S.InfoWrapper>
              <S.InfoInputBox
                label="Product Remarks"
                defaultValue={props.isEdit && props.data?.fetchUseditem.remarks}
                type="text"
                {...props.register("remarks")}
              />
              <S.ErrorText>
                {props.formState.errors.remarks?.message}
              </S.ErrorText>
            </S.InfoWrapper>
            <S.InfoWrapper>
              <S.ContentsInputBox
                defaultValue={
                  props.isEdit && props.data?.fetchUseditem.contents
                }
                type="text"
                {...props.register("contents")}
              />
              <S.ErrorText>
                {props.formState.errors.contents?.message}
              </S.ErrorText>
            </S.InfoWrapper>
          </S.FormLeftBody>
        </S.FormLeft>

        <S.FormRight>
          <S.MapForm>
            <SearchAddr setUseditemAddress={props.setUseditemAddress} />
          </S.MapForm>
          <S.ImageForm>
            <Uploads
              setImages={props.setImages}
              data={props.data}
              isEdit={props.isEdit}
            />
          </S.ImageForm>
          <S.BtnBottom>
            <S.SumbmitBtn>
              {props.isEdit ? "수정하기" : "등록하기"}
            </S.SumbmitBtn>
            <S.ClickBtn type="button" onClick={() => router.push("/market")}>
              취소하기
            </S.ClickBtn>
          </S.BtnBottom>
        </S.FormRight>
      </S.WriteUsedItemForm>
    </>
  );
}
