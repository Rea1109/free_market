import Uploads from "../../../commons/uploads/Uploads.container";
import * as S from "./UsedItemWrite.styles";

export default function UsedItemWriteUI(props: any) {
  return (
    <S.WriteUsedItemForm onSubmit={props.handleSubmit(props.onSubmitUsedItem)}>
      <S.FormLeft>
        <S.FormLeftHeader>
          <S.InfoInputBox1 type="text" {...props.register("name")} />
          <div>{props.formState.errors.name?.message}</div>
          <S.InfoInputBox1 type="number" {...props.register("price")} />
          <div>{props.formState.errors.price?.message}</div>
        </S.FormLeftHeader>
        <S.FormInputBody>
          <S.InfoInputBox1 type="text" />
          <S.InfoInputBox1 type="text" {...props.register("remarks")} />
          <div>{props.formState.errors.remarks?.message}</div>
          <S.InfoInputBox2 type="text" {...props.register("contents")} />
          <div>{props.formState.errors.contents?.message}</div>
        </S.FormInputBody>
      </S.FormLeft>

      <S.FormRight>
        <S.ImageForm>
          <Uploads setImages={props.setImages} />
        </S.ImageForm>
        <S.MapForm></S.MapForm>
        <S.BtnBottom>
          <button>등록하기</button>
          <button type="reset">취소하기</button>
        </S.BtnBottom>
      </S.FormRight>
    </S.WriteUsedItemForm>
  );
}
