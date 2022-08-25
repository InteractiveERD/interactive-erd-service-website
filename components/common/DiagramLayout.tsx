import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import DiagramHeader from "./DiagramHeader";
import { SMALL_HEADER_HEIGHT } from "constants/view.const";

type Props = {
  children: ReactNode;
  title: string;
};

function DiagramLayout({ children, title = "다이어그램 페이지" }: Props) {
  return (
    <LayoutWrap>
      <Head>
        <title>{title}</title>
        {/* meta data */}
      </Head>

      <DiagramHeader/>

      <Body>
        {children}
      </Body>

    </LayoutWrap>
  );
}

export default DiagramLayout;

const LayoutWrap = styled.div``;
const Body = styled.div`
  min-height: 100vh;
  margin-top : ${SMALL_HEADER_HEIGHT}px;
`;
