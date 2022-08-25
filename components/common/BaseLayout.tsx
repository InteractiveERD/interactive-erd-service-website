import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "components/common/Header";
import Footer from "components/common/Footer";

type Props = {
  children: ReactNode;
  title: string;
};

function BaseLayout({ children, title = "기본 페이지" }: Props) {
  return (
    <LayoutWrap>
      <Head>
        <title>{title}</title>
        {/* meta data */}
      </Head>

      <Header />

      <Body>
        <InnerBody>{children}</InnerBody>
      </Body>

      <Footer />
    </LayoutWrap>
  );
}

export default BaseLayout;

const LayoutWrap = styled.div``;
const Body = styled.div`
  min-height: 100vh;
`;
const InnerBody = styled.div`
  margin : 0px auto;
  max-width: 1080px;
`;
