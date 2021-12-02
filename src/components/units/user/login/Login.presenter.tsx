import * as S from "./Login.styles";
// import { ILoginUIProps } from "./Login.types";

export default function LoginUI(props: any) {
  console.log(props.userInfo);
  return (
    <S.LoginMenuForm onSubmit={props.handleSubmit(props.onClickLogin)}>
      {props.isLogin ? (
        <S.LogedWrapper>
          <S.Profile></S.Profile>
          <S.ProfileInfoWrapper>
            <S.UserName>{props.userInfo.name}</S.UserName>
            <S.UserEmail>{props.userInfo.email}</S.UserEmail>
          </S.ProfileInfoWrapper>
          <S.LogoutImg
            onClick={props.onClickLogOut}
            src="/images/commons/logout.png"
          />
        </S.LogedWrapper>
      ) : (
        <>
          <h3>Welcome</h3>
          <S.InputWrapper>
            <input type="text" {...props.register("email")} />
            <div>{props.formState.errors.email?.message}</div>
          </S.InputWrapper>
          <S.InputWrapper>
            <input type="password" {...props.register("password")} />
            <div>{props.formState.errors.password?.message}</div>
          </S.InputWrapper>
          <S.BtnWrapper>
            <div>
              <button>sign in</button>
            </div>
            <div>
              <button type="button">sign up</button>
            </div>
          </S.BtnWrapper>
        </>
      )}
    </S.LoginMenuForm>
  );
}
