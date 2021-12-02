import { useMutation, useApolloClient } from "@apollo/client";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../../../commons/types/generated/types";
import LoginUI from "./Login.presenter";
import { LOGIN_USER, FETCH_USER_LOGGED_IN } from "./Login.queries";
import * as yup from "yup";
import { useContext } from "react";
import { GlobalContext } from "../../../../../pages/_app";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Modal } from "antd";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const client = useApolloClient();

  const { setAccessToken, setUserInfo, setIsLogin, isLogin, userInfo } =
    useContext(GlobalContext);

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

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
      localStorage.setItem("accessToken", accessToken || "");
      setAccessToken?.(accessToken || "");
      setIsLogin?.(true);

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
      router.push("/");
    } catch (error) {
      error instanceof Error && Modal.error({ title: error.message });
    }
  };

  const onClickLogOut = () => {
    // Modal.success({ title: "see you soon" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");
    location.reload();
  };

  return (
    <LoginUI
      loginUser={loginUser}
      handleSubmit={handleSubmit}
      onClickLogin={onClickLogin}
      register={register}
      formState={formState}
      isLogin={isLogin}
      userInfo={userInfo}
      onClickLogOut={onClickLogOut}
    />
  );
}
