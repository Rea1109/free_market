import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("상품명을 입력해주세요."),
  contents: yup.string().required("상품 상세설명을 입력해주세요."),
  price: yup
    .number()
    .min(100, "가격은 100원 이상만 등록 가능합니다.")
    .required(""),
  remarks: yup.string().required("한줄 소개를 적어주세요."),
});

export const editSchema = yup.object().shape({
  name: yup.string(),
  contents: yup.string(),
  price: yup.number().min(100, "가격은 100원 이상만 등록 가능합니다."),
  remarks: yup.string(),
});
