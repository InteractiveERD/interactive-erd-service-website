import React from "react";
import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListView = styled(Column)<{ height: number }>`
  height: ${({ height }) => height || "300px"};
  overflow-y: scroll;
`;

export const HorizListView = styled(Row)<{ width: number }>`
  width: ${({ width }) => width || "300px"};
  overflow-y: scroll;
`;
