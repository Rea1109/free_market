import * as S from "./Navigation.styles";
import { INavigationUIProps } from "./Navigation.types";

export default function NavigationUI(props: INavigationUIProps) {
  return (
    <S.Navigation>
      <S.NavMenu onClick={props.onClickMove("/")}>Home</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/market")}>Market</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/boards")}>Free Board</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/user/get")}>My Page</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/market/basket")}>
        Basket
      </S.NavMenu>
      {!props.isLogout && (
        <S.NavMenu onClick={props.onClickLogOut}>
          <S.LogoutBtn>log out</S.LogoutBtn>
        </S.NavMenu>
      )}
    </S.Navigation>
  );
}
