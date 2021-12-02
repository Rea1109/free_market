import * as S from "./Navigation.styles";

interface INavigationUIProps {
  onClickHome: () => void;
  onClickStore: () => void;
  onClickBoard: () => void;
  onClickMypage: () => void;
}

export default function NavigationUI(props: INavigationUIProps) {
  return (
    <S.Navigation>
      <S.NavMenu onClick={props.onClickHome}>home</S.NavMenu>
      <S.NavMenu onClick={props.onClickStore}>store</S.NavMenu>
      <S.NavMenu onClick={props.onClickBoard}>board</S.NavMenu>
      <S.NavMenu onClick={props.onClickMypage}>my page</S.NavMenu>
    </S.Navigation>
  );
}
