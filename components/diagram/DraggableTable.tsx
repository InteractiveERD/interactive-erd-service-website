import { BOX_SHADOW, SIDE_WINDOW_WIDTH, SMALL_HEADER_HEIGHT } from 'constants/view.const';
import { Table, TableTuple } from 'interfaces/network/table.interfaces';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DiagramToolType } from 'modules/diagramModule';
import { DiagramToolMode } from 'interfaces/view/diagram.interface';
import CustomColors from 'constants/colors';
import { throttle } from 'lodash';

type Props = {
   table: Table;
   toolMode: DiagramToolMode;
   isSelected: boolean;
   onClick: (table: Table) => void;
};

function DraggableTable({ table, toolMode, isSelected, onClick }: Props) {
   const draggableRef = useRef<HTMLDivElement>(null);
   const tableRef = useRef<HTMLTableElement>(null);

   const isDragMode = toolMode.type === DiagramToolType.DRAG;
   const isEditMode = toolMode.type === DiagramToolType.EDIT;

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
      const cursorX = ev.pageX - SIDE_WINDOW_WIDTH; // clientX는 화면전체 기준(현재 마진을 추가로 계산필요)
      const cursorY = ev.pageY - SMALL_HEADER_HEIGHT;

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

   const saveCurrentPosition = () => {
      const tableWrap = tableRef.current;
      if (!tableWrap) return;
      const { x, y } = getCurrentPosition(tableWrap);
      table.positionX = x;
      table.positionY = y;
      // TODO: 변경된 position 디비 저장 로직(debounce or throttle 필요)
   };

   const onListenMouseUp = (ev: globalThis.MouseEvent) => {
      if (isDragMode) {
         table.isDraggable = false;
         saveCurrentPosition();
      }
   };
   const onListenMouseLeave = (ev: globalThis.MouseEvent) => {
      if (isDragMode) {
         saveCurrentPosition();
         if (table.isDraggable) {
            setComponentPositionCenter(ev);
         }
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
      draggableWrap?.addEventListener('mouseleave', onListenMouseLeave);
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
      <Draggable
         ref={draggableRef}
         onClick={() => onClick(table)}
         isSelected={isEditMode ? isSelected : true}
      >
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
                     <TupleWrap key={tuple.name} toolMode={toolMode}>
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

//
const Draggable = styled.div<{ isSelected: boolean }>`
   user-select: none;
   -moz-user-select: none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   -o-user-select: none;
   opacity: ${({ isSelected }) => (isSelected ? 1.0 : 0.3)};
`;

const TableWrap = styled.table<{ toolMode: DiagramToolMode }>`
   ${({ toolMode }) => toolMode.type === DiagramToolType.EDIT && `cursor : pointer;`}
   ${({ toolMode }) => toolMode.type === DiagramToolType.DRAG && `cursor : grab;`}
   ${({ toolMode }) => toolMode.type === DiagramToolType.COMMENT && `cursor : help;`}
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
   background-color: ${CustomColors.background1};
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
const TupleWrap = styled.tr<{ toolMode: DiagramToolMode }>`
   ${({ toolMode }) =>
      toolMode.type === DiagramToolType.EDIT &&
      `
      &:hover{
      background-color : ${CustomColors.background2};
      transition : all 0.2s;
   }
   `}
`;
const TableHeadRow = styled.tr``;
