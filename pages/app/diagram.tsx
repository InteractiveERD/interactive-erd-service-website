import DiagramLayout from 'components/common/DiagramLayout';
import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import SideWindow from 'components/diagram/SideWindow';
import { SIDE_WINDOW_WIDTH } from 'constants/view.const';
import DraggableTable from 'components/diagram/DraggableTable';
import { Table } from 'interfaces/network/table.interfaces';
import { GetServerSideProps } from 'next';
import { useRecoilState } from 'recoil';
import { DiagramToolType, tableState, toolModeState } from 'modules/diagramModule';

function DiagramPage({ tables }: { tables: Table[] }) {
   // states
   const [isOpenSideWindow, setOpenSideWindow] = useState(true);
   const [selectedTable, setTable] = useRecoilState(tableState);
   const [toolMode] = useRecoilState(toolModeState);
   const dragAreaRef = useRef<HTMLElement>(null);

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

         <DiagramArea isOpen={isOpenSideWindow} ref={dragAreaRef}>
            {tables.map((table: Table) => {
               return (
                  <DraggableTable
                     key={table.id}
                     parentRef={dragAreaRef}
                     table={table}
                     onClick={onClickTable}
                     isSelected={table.name === selectedTable?.name}
                     toolMode={toolMode}
                  />
               );
            })}
         </DiagramArea>
      </DiagramPageWrap>
   );
}

export default DiagramPage;

DiagramPage.getLayout = function getLayout(page: ReactElement) {
   return <DiagramLayout title={'DIAGRAM'}>{page}</DiagramLayout>;
};

export const getServerSideProps: GetServerSideProps = async context => {
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
   z-index: 100;
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
