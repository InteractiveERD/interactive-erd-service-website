import Draggable from "components/common/Draggable";
import { BOX_SHADOW } from "constants/view.const";
import { Translate } from "interfaces/view/diagram.interface";
import React, { RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Props = {
  areaRef: RefObject<HTMLElement>;
};

function DraggableTable({ areaRef }: Props) {
  const tableRef = useRef<HTMLTableElement>(null);
  const [translate, setTranslate] = useState<Translate>({
    x: 0,
    y: 0,
  });

  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  };

  useEffect(() => {}, [translate]);

  return (
    <Draggable
      translate={translate}
      areaRef={areaRef}
      childrenRef={tableRef}
      onDragMove={onDragMove}
    >
      <Table
        ref={tableRef}
        style={{
          transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
        }}
      >
        <TBody>
          <tr>
            <th>{"User"}</th>
          </tr>
          <tr>
            <td>{"ID"}</td>
            <td>{"uint"}</td>
          </tr>
          <tr>
            <td>{"name"}</td>
            <td>{"varchar"}</td>
          </tr>
          <tr>
            <td>{"phone"}</td>
            <td>{"varchar"}</td>
          </tr>
          <tr>
            <td>{"createdAt"}</td>
            <td>{"timestamp"}</td>
          </tr>
        </TBody>
      </Table>
    </Draggable>
  );
}

export default React.memo(DraggableTable);

// common
const TBody = styled.tbody``;

const Table = styled.table<{
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  background-color: white;
  border-radius: 6px;
  box-shadow: ${BOX_SHADOW};
  color: black;
  padding: 16px 6px;

  ${TBody} {
  }
`;
