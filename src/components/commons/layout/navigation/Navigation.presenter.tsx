import * as S from "./Navigation.styles";

interface INavigationUIProps {
  onClickMove: (page: string) => () => void;
  // onClickLogOut: () => void;
}

export default function NavigationUI(props: INavigationUIProps) {
  return (
    <S.Navigation>
      <S.NavMenu onClick={props.onClickMove("/")}>home</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/market")}>market</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/boards")}>board</S.NavMenu>
      <S.NavMenu onClick={props.onClickMove("/user")}>my page</S.NavMenu>
      {/* <S.LogoutImg
        onClick={props.onClickLogOut}
        src="/images/commons/logout.png"
      /> */}
    </S.Navigation>
  );
}
