import { SIDE_WINDOW_WIDTH } from 'constants/view.const';
import useArrowLine from 'hooks/useArrowLine';
import useConnect from 'hooks/useConnect';
import { Table } from 'interfaces/network/table.interfaces';
import { ArrowLineType, DiagramToolType } from 'interfaces/view/diagram.interface';
import { arrowLinesState, tableState, toolModeState } from 'modules/diagramModule';
import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import ArrowLine from './ArrowLine';
import DraggableTable from './DraggableTable';

type Props = {
   isOpenSideWindow: boolean;
   tables: Table[];
};

function DraggableArea({ isOpenSideWindow, tables }: Props) {
   const [arrowLines, _] = useRecoilState(arrowLinesState);
   const [toolMode] = useRecoilState(toolModeState);
   const dragAreaRef = useRef<HTMLElement>(null);
   const [onClickTuple] = useConnect();
   const [selectedTable, setTable] = useRecoilState(tableState);
   const { updateArrowLinePosition } = useArrowLine();

   const onClickTable = (table: Table) => {
      const isEditMode = toolMode.type === DiagramToolType.EDIT;
      if (isEditMode) {
         const copiedTableObj = Object.assign({}, table);
         setTable(copiedTableObj);
      }
   };
   return (
      <DraggableAreaWrap
         isOpen={isOpenSideWindow}
         ref={dragAreaRef}
         onMouseMove={(e: React.MouseEvent) => {
            const draggableTables = tables.filter(t => t.isDraggable);
            const hasDraggingTables = draggableTables.length > 0;
            if (!hasDraggingTables) return;
            updateArrowLinePosition();
            // TODO: 드래그중인 컴포넌트가 있을 경우, 해당 마우스 변화를 리스닝하여 ArrowLine 위치를 변경
         }}
      >
         {tables.map((table: Table) => {
            return (
               <DraggableTable
                  key={table.id}
                  parentRef={dragAreaRef}
                  table={table}
                  onClick={onClickTable}
                  onClickTuple={onClickTuple}
                  isSelected={table.name === selectedTable?.name}
                  toolMode={toolMode}
               />
            );
         })}
         {arrowLines.map((line: ArrowLineType) => {
            const key = `${line.start}_${line.end}`;
            // const label = `${line.startEdgeType} : ${line.endEdgeType}`;
            return <ArrowLine key={key} start={line.start} end={line.end} />;
         })}
      </DraggableAreaWrap>
   );
}

export default DraggableArea;

const DraggableAreaWrap = styled.section<{ isOpen: boolean }>`
   background-color: white;
   width: calc(100vw - ${({ isOpen }) => (isOpen ? SIDE_WINDOW_WIDTH : '0')}px);
   height: 100vh;
   margin-left: ${({ isOpen }) => (isOpen ? SIDE_WINDOW_WIDTH : '0')}px;
`;
