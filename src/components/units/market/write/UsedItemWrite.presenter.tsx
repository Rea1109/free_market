import Uploads from "../../../commons/uploads/Uploads.container";
import * as S from "./UsedItemWrite.styles";

export default function UsedItemWriteUI(props: any) {
  return (
    <S.WriteUsedItemForm onSubmit={props.handleSubmit(props.onSubmitUsedItem)}>
      <S.FormHeadr>상품 등록 페이지</S.FormHeadr>

      <S.FormBody>
        상품이름 <input type="text" {...props.register("name")} /> <br />
        <div>{props.formState.errors.name?.message}</div>
        상품내용 <input type="text" {...props.register("contents")} /> <br />
        <div>{props.formState.errors.contents?.message}</div>
        가격
        <input type="number" {...props.register("price")} /> <br />
        <div>{props.formState.errors.price?.message}</div>
        한줄소개
        <input type="text" {...props.register("remarks")} /> <br />
        <div>{props.formState.errors.remarks?.message}</div>
        <Uploads setImages={props.setImages} />
      </S.FormBody>
      <S.FormFooter>
        <button>상품 등록하기</button>
      </S.FormFooter>
    </S.WriteUsedItemForm>
  );
}
