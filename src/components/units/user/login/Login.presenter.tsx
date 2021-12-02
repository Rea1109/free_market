import * as S from "./Login.styles";
import { ILoginUIProps } from "./Login.types";

export default function LoginUI(props: ILoginUIProps) {
  return (
    <S.LoginMenuForm>
      <h3>Welcome</h3>
      <S.InputWrapper>
        <input type="text" onChange={props.onChageEmail} />
      </S.InputWrapper>
      <S.InputWrapper>
        <input type="password" onChange={props.onChagePassword} />
      </S.InputWrapper>
      <S.BtnWrapper>
        <div>
          <button onClick={props.onClickLogin}>sign in</button>
        </div>
        <div>
          <button>sign up</button>
        </div>
      </S.BtnWrapper>
    </S.LoginMenuForm>
  );
}
