import { Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const withAuth = (Component) => (props) => {
  const router = useRouter();
  //   const { accessToken } = useContext(GlobalContext);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      Modal.warning({ title: "로그인이 필요한 페이지 입니다." });
      router.push("/");
    }
  }, []);

  return <Component {...props} />;
};
