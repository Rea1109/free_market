import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useState, ChangeEvent } from "react";
// import { GlobalContext } from "../../../../../pages/_app";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../../../commons/types/generated/types";
import LoginUI from "./Login.presenter";
import { LOGIN_USER } from "./Login.queries";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { accessToken, setAccessToken } = useContext(GlobalContext);

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const onChageEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChagePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClickLogin = async () => {
    try {
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });
      alert(result.data?.loginUser.accessToken);
    } catch (error) {
      error instanceof Error && Modal.error({ title: error.message });
    }
  };

  return (
    <LoginUI
      onChageEmail={onChageEmail}
      onChagePassword={onChagePassword}
      onClickLogin={onClickLogin}
    />
  );
}
