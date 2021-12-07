import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
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
  userInfo?: {
    name?: string;
    email?: string;
    picture?: string;
  };
  setUserInfo?: Dispatch<SetStateAction<{}>>;
  isLogin?: boolean;
  setIsLogin?: Dispatch<SetStateAction<boolean>>;
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const GlobalContext = createContext<IGlobalContext>({});

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const globarState = {
    accessToken,
    setAccessToken,
    userInfo,
    setUserInfo,
    isLogin,
    setIsLogin,
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") || "";
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (accessToken) {
      setAccessToken(accessToken);
      setUserInfo(userInfo);
      setIsLogin((prev) => !prev);
    }
  }, []);

  const uploadLink = createUploadLink({
    uri: "http://backend04.codebootcamp.co.kr/graphql",
    headers: { authorization: `Bearer ${accessToken}` },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
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
