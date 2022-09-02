import { BOX_SHADOW } from 'constants/view.const';
import { Table, TableTuple } from 'interfaces/network/table.interfaces';
import React, { RefObject, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DiagramToolMode, DiagramToolType } from 'interfaces/view/diagram.interface';
import CustomColors from 'constants/colors';
import useDrag from 'hooks/useDrag';
import { DraggableContext } from 'contexts/DraggableContext';

type Props = {
   table: Table;
   toolMode: DiagramToolMode;
   // parentRef: RefObject<HTMLElement>;
   isSelected: boolean;
   onClickTuple : (edgeId : string) =>void;
   onClick: (table: Table) => void;
};

function DraggableTable({ table, toolMode, isSelected, onClick, onClickTuple }: Props) {
   const tableRef = useRef<HTMLTableElement>(null);
   const parentRef = useContext(DraggableContext)

   const isDragMode = toolMode.type === DiagramToolType.DRAG;
   const isEditMode = toolMode.type === DiagramToolType.EDIT;

   const { setInitialComponentPosition, onListenMouseMove, onListenMouseUp, onListenMouseDown } =
      useDrag({ table, tableRef, parentRef, toolMode });

   useEffect(() => {
      setInitialComponentPosition();
   }, []);

   useEffect(() => {
      return () => {
         if (isDragMode) {
            parentRef.current?.removeEventListener('mousemove', onListenMouseMove);
         }
      };
   }, [toolMode]);

   return (
      <Draggable
         onMouseUp={onListenMouseUp}
         onMouseDown={onListenMouseDown}
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
                  const id: string = `table-${table.name}-tuple-${tuple.name}`;
                  return (
                     <TupleWrap id={id} key={tuple.name} toolMode={toolMode} onClick={() => onClickTuple(id)}>
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
