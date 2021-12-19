import * as S from "./Login.styles";
// import { ILoginUIProps } from "./Login.types";

export default function LoginUI(props: any) {
  return (
    <S.LoginMenuForm onSubmit={props.handleSubmit(props.onClickLogin)}>
      <S.LoginTitle>Welcome</S.LoginTitle>
      <S.InputWrapper>
        <S.InputBox
          type="text"
          {...props.register("email")}
          placeholder="Email"
        />
        <S.ErrorText>{props.formState.errors.email?.message}</S.ErrorText>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputBox
          type="password"
          {...props.register("password")}
          placeholder="Passowrd"
        />
        <S.ErrorText>{props.formState.errors.password?.message}</S.ErrorText>
      </S.InputWrapper>
      <S.BtnWrapper>
        <div>
          <S.SumbitBtn type="submit">sign in</S.SumbitBtn>
        </div>
        <div>
          <S.ClickBtn onClick={props.onMoveSignUp} type="button">
            sign up
          </S.ClickBtn>
        </div>
      </S.BtnWrapper>
    </S.LoginMenuForm>
  );
}
