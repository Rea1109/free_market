export interface INavigationUIProps {
  onClickMove: (page: string) => () => void;
  isLogout?: boolean;
  onClickLogOut: () => void;
}
