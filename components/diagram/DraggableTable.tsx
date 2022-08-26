import Draggable from 'components/common/Draggable';
import { BOX_SHADOW, SIDE_WINDOW_WIDTH, SMALL_HEADER_HEIGHT } from 'constants/view.const';
import { Table, TableTuple } from 'interfaces/network/table.interfaces';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { DiagramTool, toolModeState } from 'modules/diagramModule';

type Props = {
   table: Table;
};

function DraggableTable({ table }: Props) {
   const [toolMode] = useRecoilState(toolModeState);
   const draggableRef = useRef<HTMLDivElement>(null);
   const tableRef = useRef<HTMLTableElement>(null);

   const isDragMode = toolMode === DiagramTool.DRAG;
   const isEditMode = toolMode === DiagramTool.EDIT;

   const getCurrentPosition = (el: HTMLElement) => {
      const transform = el.style.transform;
      const matrix = new WebKitCSSMatrix(transform);
      const x = matrix.m41;
      const y = matrix.m42;

      return {
         x: x,
         y: y,
      };
   };

   // 컴포넌트의 중앙에 커서가 오도록
   const setComponentPositionCenter = (ev: globalThis.MouseEvent) => {
      const tableWrap = tableRef.current;

      if (!tableWrap) return;
      const cursorX = ev.clientX - SIDE_WINDOW_WIDTH; // clientX는 화면전체 기준(현재 마진을 추가로 계산필요)
      const cursorY = ev.clientY - SMALL_HEADER_HEIGHT;

      const newX = cursorX - tableWrap.offsetWidth / 2;
      const newY = cursorY - tableWrap.offsetHeight / 2;
      tableWrap.style.transform = `translateX(${newX}px) translateY(${newY}px)`;
   };

   const onListenMouseMove = (ev: globalThis.MouseEvent) => {
      if (table.isDraggable && isDragMode) {
         setComponentPositionCenter(ev);
      }
   };
   const onListenMouseDown = (ev: globalThis.MouseEvent) => {
      if (isDragMode) {
         table.isDraggable = true;
         setComponentPositionCenter(ev);
      }
   };

   const onListenMouseUp = (ev: globalThis.MouseEvent) => {
      if (isDragMode) {
         table.isDraggable = false;

         const tableWrap = tableRef.current;
         if (!tableWrap) return;
         const { x, y } = getCurrentPosition(tableWrap);
         table.positionX = x;
         table.positionY = y;
         // TODO: 변경된 position 디비 저장 로직
      }
   };

   const setMouseEventListeners = () => {
      const tableWrap = tableRef.current;
      const draggableWrap = draggableRef.current;

      if (tableWrap) {
         tableWrap.style.transform = `translateX(${table.positionX}px) translateY(${table.positionY}px)`;
      }

      draggableWrap?.addEventListener('mousemove', onListenMouseMove);
      draggableWrap?.addEventListener('mousedown', onListenMouseDown);
      draggableWrap?.addEventListener('mouseup', onListenMouseUp);
      draggableWrap?.addEventListener('mouseleave', onListenMouseUp);
   };

   const removeMouseEventListeners = () => {
      const draggableWrap = draggableRef.current;

      draggableWrap?.removeEventListener('mousemove', onListenMouseMove);
      draggableWrap?.removeEventListener('mousedown', onListenMouseDown);
      draggableWrap?.removeEventListener('mouseup', onListenMouseUp);
      draggableWrap?.removeEventListener('mouseleave', onListenMouseUp);
   };

   useEffect(() => {
      setMouseEventListeners();
      return () => {
         removeMouseEventListeners();
      };
   }, [toolMode]);

   return (
      <Draggable draggableRef={draggableRef}>
         <TableWrap ref={tableRef} toolMode={toolMode}>
            <TableHeadWrap>
               <TableHeadRow>
                  <TableColorSticker colSpan={2} bgColor={table.color} />
               </TableHeadRow>
               <TableHeadRow>
                  <TableHead colSpan={2}>{table.name}</TableHead>
               </TableHeadRow>
            </TableHeadWrap>

            <TBody>
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

const TableWrap = styled.table<{ toolMode: DiagramTool }>`
   ${({ toolMode }) => toolMode === DiagramTool.EDIT && `cursor : pointer;`}
   ${({ toolMode }) => toolMode === DiagramTool.DRAG && `cursor : grab;`}
   ${({ toolMode }) => toolMode === DiagramTool.COMMENT && `cursor : help;`}
   position: absolute;
   background-color: white;
   border-radius: 6px;
   box-shadow: ${BOX_SHADOW};
   color: black;
   padding: 0px;
   border-collapse: collapse;

   ${TBody} {
   }
`;

const TableHeadWrap = styled.thead`
   background-color: #f5f6fa;
`;

const TableColorSticker = styled.td<{ bgColor: string | undefined }>`
   background-color: ${({ bgColor }) => bgColor || 'white'};
   border-top-left-radius: 6px;
   border-top-right-radius: 6px;
   height: 4px;
   width: 100%;
`;

const TableHead = styled.th`
   text-align: center;
   font-size: 16px;
   font-weight: 700;
   padding: 12px 16px;
`;

const TupleName = styled.td`
   font-weight: 500;
   padding-left: 12px;
   padding-bottom: 6px;
`;
const TupleType = styled.td`
   color: lightgray;
   padding-right: 12px;
   padding-bottom: 6px;
   padding-left: 12px;
`;
const TupleWrap = styled.tr``;
const TableHeadRow = styled.tr``;
