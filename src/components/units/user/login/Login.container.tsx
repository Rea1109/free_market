import { useMutation, useApolloClient } from "@apollo/client";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../../../commons/types/generated/types";
import LoginUI from "./Login.presenter";
import { LOGIN_USER, FETCH_USER_LOGGED_IN, LOGOUT_USER } from "./Login.queries";
import * as yup from "yup";
import { useContext } from "react";
import { GlobalContext } from "../../../../../pages/_app";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  email: yup.string().email("check email").required("check email"),
  password: yup.string().required("check passowrd"),
});

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const client = useApolloClient();

  const { setAccessToken, setUserInfo, userInfo } = useContext(GlobalContext);

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const [logoutUser] = useMutation(LOGOUT_USER);

  const { handleSubmit, register, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onClickLogin = async (data: FormValues) => {
    try {
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      const accessToken = result.data?.loginUser.accessToken;
      localStorage.setItem("refreshToken", "true");
      setAccessToken?.(accessToken || "");

      const resultUserInfo = await client.query({
        query: FETCH_USER_LOGGED_IN,
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify(resultUserInfo.data.fetchUserLoggedIn) || ""
      );
      setUserInfo?.(resultUserInfo.data.fetchUserLoggedIn);
      Modal.success({
        title: `Hi ${resultUserInfo.data.fetchUserLoggedIn.name} !`,
      });

      const baskets = JSON.parse(localStorage.getItem("basket") || "[]");
      if (baskets.length) {
        const result = confirm(
          "장바구니에 담으신 상품이 있습니다. 장바구니 페이지로 이동할까요?"
        );
        if (result) router.push("/market/basket");
      }
    } catch (error) {
      error instanceof Error && Modal.error({ title: error.message });
    }
  };

  const onClickLogOut = async () => {
    Modal.success({ title: "see you soon" });
    // const result = await logoutUser();
    // console.log(result);
    logoutUser();
    localStorage.removeItem("userInfo");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("basket");
    location.reload();
  };

  const onMoveSignUp = () => {
    alert("회원가입 페이지 이동");
  };

  return (
    <LoginUI
      loginUser={loginUser}
      handleSubmit={handleSubmit}
      onClickLogin={onClickLogin}
      register={register}
      formState={formState}
      userInfo={userInfo}
      onClickLogOut={onClickLogOut}
      onMoveSignUp={onMoveSignUp}
    />
  );
}
