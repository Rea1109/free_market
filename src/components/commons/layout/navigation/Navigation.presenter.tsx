import * as S from "./Navigation.styles";
import { INavigationUIProps } from "./Navigation.types";

export default function NavigationUI(props: INavigationUIProps) {
  return (
    <S.Navigation>
      <S.NavMenu onClick={props.onClickMove("/")}>home</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/market")}>store</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/boards")}>free board</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/user")}>my page</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/market/basket")}>
        basket
      </S.NavMenu>
    </S.Navigation>
  );
}
