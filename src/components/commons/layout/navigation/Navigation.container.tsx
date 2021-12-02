import { Modal } from "antd";
import { useRouter } from "next/router";
import NavigationUI from "./Navigation.presenter";

export default function Navigation() {
  const router = useRouter();
  return (
    <NavigationUI
      onClickHome={() => router.push("/")}
      onClickStore={() => Modal.warning({ title: "준비중 입니다." })}
      onClickBoard={() => router.push("/boards")}
      onClickMypage={() => Modal.warning({ title: "준비중 입니다." })}
    />
  );
}
