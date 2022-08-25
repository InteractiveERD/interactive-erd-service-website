import Draggable from 'components/common/Draggable';
import { BOX_SHADOW } from 'constants/view.const';
import { Table, TableTuple } from 'interfaces/network/table.interfaces';
import { Translate } from 'interfaces/view/diagram.interface';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type Props = {
   table: Table;
   areaRef: React.RefObject<HTMLElement>;
};

function DraggableTable({ table, areaRef }: Props) {
   const tableRef = useRef<HTMLTableElement>(null);
   const [translate, setTranslate] = useState<Translate>({
      x: table.positionX,
      y: table.positionY,
   });

   const onDragMove = (e: React.PointerEvent) => {
      setTranslate({
         x: translate.x + e.movementX,
         y: translate.y + e.movementY,
      });
   };

   const _style = {
      transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
   };

   return (
      <Draggable
         translate={translate}
         areaRef={areaRef}
         childrenRef={tableRef}
         onDragMove={onDragMove}
      >
         <TableWrap ref={tableRef} style={_style}>
            <TBody>
               <TableHeadWrap>
                  <TableHead>{table.name}</TableHead>
               </TableHeadWrap>

               {table.tuples.map((tuple: TableTuple) => {
                  return (
                     <TupleWrap key={tuple.name}>
                        <TupleName>{tuple.name}</TupleName>
                        <TupleType>{tuple.dataType}</TupleType>
                     </TupleWrap>
                  );
               })}
            </TBody>
         </TableWrap>
      </Draggable>
   );
}

export default React.memo(DraggableTable);

// common
const TBody = styled.tbody``;

const TableWrap = styled.table`
   position: absolute;
   background-color: white;
   border-radius: 6px;
   box-shadow: ${BOX_SHADOW};
   color: black;
   padding: 16px 6px;

   ${TBody} {
   }
`;

const TableHead = styled.th`
   text-align: center;
   font-size: 20px;
   font-weight: 700;
`;
const TupleName = styled.td`
   font-weight: 500;
`;
const TupleType = styled.td`
   color: gray;
`;

const TableHeadWrap = styled.tr``;
const TupleWrap = styled.tr``;
