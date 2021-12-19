import * as S from "./Navigation.styles";
import { INavigationUIProps } from "./Navigation.types";

export default function NavigationUI(props: INavigationUIProps) {
  return (
    <S.Navigation>
      <S.NavMenu onClick={props.onClickMove("/")}>home</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/market")}>store</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/boards")}>free board</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/user/get")}>my page</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/market/basket")}>
        basket
      </S.NavMenu>
      {!props.isLogout && (
        <S.NavMenu onClick={props.onClickLogOut}>
          <button>log out</button>
        </S.NavMenu>
      )}
    </S.Navigation>
  );
}
