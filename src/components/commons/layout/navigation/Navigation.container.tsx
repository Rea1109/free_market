import { useRouter } from "next/router";
import NavigationUI from "./Navigation.presenter";

export default function Navigation() {
  const router = useRouter();
  const onClickMove = (page: string) => () => {
    router.push(page);
  };
  // const onClickLogOut = () => {
  //   // Modal.success({ title: "see you soon" });
  //   localStorage.removeItem("userInfo");
  //   localStorage.removeItem("accessToken");
  //   location.reload();
  //   router.push("/");
  // };

  return <NavigationUI onClickMove={onClickMove} />;
}
