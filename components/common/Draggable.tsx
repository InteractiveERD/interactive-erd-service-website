import { Table } from 'interfaces/network/table.interfaces';
import { Translate } from 'interfaces/view/diagram.interface';
import React, { ReactNode, RefObject } from 'react';
import styled from 'styled-components';

type Props = {
   children: ReactNode;
   draggableRef: RefObject<HTMLDivElement>;
};

function Draggable({ children, draggableRef }: Props) {
   return <DraggableWrap ref={draggableRef}>{children}</DraggableWrap>;
}

export default React.memo(Draggable);

const DraggableWrap = styled.div`
   user-select: none;
   -moz-user-select: none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   -o-user-select: none;
`;
