import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import "antd/dist/antd.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import { createUploadLink } from "apollo-upload-client";
import Layout from "../src/components/commons/layout";
import Head from "next/head";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  useState,
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
} from "react";
import { getAccessToken } from "../src/commons/libraries/getAccessToken";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjiEA_JOFU42yK7G5IBezP9cYMG89QKg8",
  authDomain: "codecamp-rea.firebaseapp.com",
  projectId: "codecamp-rea",
  storageBucket: "codecamp-rea.appspot.com",
  messagingSenderId: "1027507244334",
  appId: "1:1027507244334:web:ec3269b3a4deae10087ebf",
};

interface IGlobalContext {
  accessToken?: string;
  setAccessToken?: Dispatch<SetStateAction<string>>;
  isLogout?: boolean;
  setIsLogout?: Dispatch<SetStateAction<boolean>>;
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const GlobalContext = createContext<IGlobalContext>({});

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState("");
  const [isLogout, setIsLogout] = useState(true);
  const globarState = {
    accessToken,
    setAccessToken,
    isLogout,
    setIsLogout,
  };

  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      getAccessToken(setAccessToken);
      setIsLogout(false);
    }
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // 1. 토크만료 에러를 캐치
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // 3. 기존에 실패한 요청 다시 재요청하기 , operation 안에는 만료된 토큰도 들어있어서 그 부분을 바꿔줘야 함
          operation.setContext({
            headers: {
              ...operation.getContext().headers,
              authorization: `Bearer ${getAccessToken(setAccessToken)}`, // 2. refreshToken 으로 accessToken 재발급 받기 => restoreAccessToken`,
            },
          });

          return forward(operation);
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backend04.codebootcamp.co.kr/graphql",
    headers: { authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  // ApolloClient 셋팅
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
    cache: new InMemoryCache(),
  });

  return (
    <GlobalContext.Provider value={globarState}>
      <ApolloProvider client={client}>
        <Global styles={globalStyles} />
        <Head>
          <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
          <script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}`}
          ></script>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </GlobalContext.Provider>
  );
}

export default MyApp;
