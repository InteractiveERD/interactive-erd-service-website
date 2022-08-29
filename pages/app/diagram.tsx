import DiagramLayout from 'components/common/DiagramLayout';
import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import SideWindow from 'components/diagram/SideWindow';
import { SIDE_WINDOW_WIDTH } from 'constants/view.const';
import DraggableTable from 'components/diagram/DraggableTable';
import { Table } from 'interfaces/network/table.interfaces';
import { GetStaticProps } from 'next';
import { useRecoilState } from 'recoil';
import { arrowLinesState, tableState, toolModeState } from 'modules/diagramModule';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { ArrowLine, ArrowLineEdgeType, DiagramToolType } from 'interfaces/view/diagram.interface';
import useConnect from 'hooks/useConnect';
import CustomColors from 'constants/colors';

function DiagramPage({ tables }: { tables: Table[] }) {
   // states
   const [isOpenSideWindow, setOpenSideWindow] = useState(true);
   const [selectedTable, setTable] = useRecoilState(tableState);
   const [arrowLines, _] = useRecoilState(arrowLinesState);
   const [toolMode] = useRecoilState(toolModeState);
   const dragAreaRef = useRef<HTMLElement>(null);
   const [onClickTuple] = useConnect();

   // handlers
   const onOpenSideWindow = () => setOpenSideWindow(true);
   const onClickTable = (table: Table) => {
      const isEditMode = toolMode.type === DiagramToolType.EDIT;
      if (isEditMode) {
         const copiedTableObj = Object.assign({}, table);
         setTable(copiedTableObj);
      }
   };

   return (
      <DiagramPageWrap>
         <SideOpenArrow onClick={onOpenSideWindow}>
            <IoIosArrowForward size={25} />
         </SideOpenArrow>
         <SideWindow isOpen={isOpenSideWindow} setOpen={setOpenSideWindow} />

         <Xwrapper>
            <DiagramArea isOpen={isOpenSideWindow} ref={dragAreaRef}>
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
               {arrowLines.map((line: ArrowLine) => {
                  const key = `${line.start}_${line.end}`;
                  // const label = `${line.startEdgeType} : ${line.endEdgeType}`
                  return (
                     <Xarrow
                        key={key}
                        start={line.start} //can be react ref
                        end={line.end} //or an id
                        path={'smooth'}
                        showHead={false}
                        showTail={false}
                        labels={{
                           start : line.startEdgeType,
                           end : line.endEdgeType,
                        }}
                        
                        lineColor={CustomColors.background2}
                        color={'navy'}
                        strokeWidth={2}
                        startAnchor={['left', 'right']}
                        endAnchor={['left', 'right']}
                     />
                  );
               })}
            </DiagramArea>
         </Xwrapper>
      </DiagramPageWrap>
   );
}

export default DiagramPage;

DiagramPage.getLayout = function getLayout(page: ReactElement) {
   return <DiagramLayout title={'DIAGRAM'}>{page}</DiagramLayout>;
};

export const getStaticProps: GetStaticProps = async context => {
   const tables: Table[] = MOCK_TABLES;
   return {
      props: {
         tables,
      },
   };
};

// mock data
const MOCK_TABLES: Table[] = [
   {
      id: 0,
      name: 'user',
      alias: 'u',
      color: '#fab1a0',
      isDraggable: false,
      tuples: [
         {
            name: 'ID',
            dataType: 'number',
         },
         {
            name: 'name',
            dataType: 'varchar',
         },
         {
            name: 'phone',
            dataType: 'varchar',
         },
      ],
      positionX: 0,
      positionY: 0,
   },
   {
      id: 1,
      name: 'product',
      alias: 'p',
      color: '#74b9ff',
      isDraggable: false,
      tuples: [
         {
            name: 'ID',
            dataType: 'number',
         },
         {
            name: 'name',
            dataType: 'varchar',
         },
         {
            name: 'price',
            dataType: 'number',
         },
      ],
      positionX: 500,
      positionY: 100,
   },
   {
      id: 2,
      name: 'user_has_product',
      alias: 'uhp',
      color: '#ffeaa7',
      isDraggable: false,
      tuples: [
         {
            name: 'ID',
            dataType: 'number',
         },
         {
            name: 'userId',
            dataType: 'number',
         },
         {
            name: 'productId',
            dataType: 'number',
         },
      ],
      positionX: 250,
      positionY: 70,
   },
   {
      id: 3,
      name: 'follow_user',
      alias: 'fu',
      color: '#fd79a8',
      isDraggable: false,
      tuples: [
         {
            name: 'ID',
            dataType: 'number',
         },
         {
            name: 'fromUserId',
            dataType: 'number',
         },
         {
            name: 'toUserId',
            dataType: 'number',
         },
      ],
      positionX: 500,
      positionY: 250,
   },
   {
      id: 4,
      name: 'product_option',
      alias: 'po',
      color: '#00b894',
      isDraggable: false,
      tuples: [
         {
            name: 'ID',
            dataType: 'number',
         },
         {
            name: 'name',
            dataType: 'varchar',
         },
         {
            name: 'addPrice',
            dataType: 'number',
         },
      ],
      positionX: 700,
      positionY: 500,
   },
];

// custom

const DiagramPageWrap = styled.div`
   width: 100vw;
   height: 100vh;
   background-color: white;
   overflow: hidden;
`;

const SideOpenArrow = styled.div`
   cursor: pointer;
   position: fixed;
   z-index: 98;
   top: 15%;
   left: 0px;
   background-color: white;
   border-top-right-radius: 6px;
   border-bottom-right-radius: 6px;
   padding: 12px 6px;
   color: black;
   box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);

   &:hover {
      transition: all 0.3s;
      padding-left: 20px;
   }
`;

const DiagramArea = styled.section<{ isOpen: boolean }>`
   background-color: white;
   width: calc(100vw - ${({ isOpen }) => (isOpen ? SIDE_WINDOW_WIDTH : '0')}px);
   height: 100vh;
   margin-left: ${({ isOpen }) => (isOpen ? SIDE_WINDOW_WIDTH : '0')}px;
`;
