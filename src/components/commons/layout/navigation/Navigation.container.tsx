import { useRouter } from "next/router";
import { useContext } from "react";
import { GlobalContext } from "../../../../../pages/_app";
import NavigationUI from "./Navigation.presenter";
import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export default function Navigation() {
  const router = useRouter();
  const [logoutUser] = useMutation(LOGOUT_USER);
  const { isLogout, setIsLogout } = useContext(GlobalContext);

  const onClickLogOut = () => {
    try {
      logoutUser();
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("basket");
      localStorage.removeItem("userInfo");
      setIsLogout?.(true);
      router.push("/");
    } catch (error) {
      error instanceof Error && Modal.error({ title: error.message });
    }
  };
  const onClickMove = (page: string) => () => {
    router.push(page);
  };

  return (
    <NavigationUI
      onClickMove={onClickMove}
      isLogout={isLogout}
      onClickLogOut={onClickLogOut}
    />
  );
}
