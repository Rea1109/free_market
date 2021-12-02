import styled from "@emotion/styled";
import { ReactChild } from "react";
import Header from "./header/Header.container";
import Footer from "./footer/Footer.container";
import Navigation from "./navigation/Navigation.container";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  padding: 0px 20px 0px 20px;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HIDDEN_HEADERS = ["/"];

interface ILayoutProps {
  children: ReactChild;
}

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  console.log(router);

  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);

  return (
    <Wrapper>
      {!isHiddenHeader && <Navigation />}
      <Header />
      <Body>{props.children}</Body>
      <Footer />
    </Wrapper>
  );
}
