import React from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { BOX_SHADOW, SIDE_WINDOW_WIDTH, SMALL_HEADER_HEIGHT } from 'constants/view.const';
import { useRecoilState } from 'recoil';
import { tableState } from 'modules/diagramModule';

type Props = {
   isOpen: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideWindow({ isOpen, setOpen }: Props) {
   const [selectedTable, setTable] = useRecoilState(tableState);

   const onClose = () => setOpen(false);
   return (
      <>
         {isOpen && (
            <SideWindowWrap>
               <CloseButton onClick={onClose}>
                  <IoMdClose size={25} />
               </CloseButton>

               <ControlPanel>
                  <Button>{'Create New Table'}</Button>
               </ControlPanel>

               {selectedTable && (
                  <TableWrap>
                     <TableName color={selectedTable!.color}>
                        {selectedTable?.name} AS {selectedTable.alias}
                     </TableName>
                     {selectedTable.tuples.map(tuple => {
                        return (
                           <TupleRow key={tuple.name}>
                              {tuple.name} {tuple.dataType}
                           </TupleRow>
                        );
                     })}
                  </TableWrap>
               )}
            </SideWindowWrap>
         )}
      </>
   );
}

export default SideWindow;

// common
const Text = styled.p``;
const Button = styled.button`
   cursor: pointer;
`;

//
const SideWindowWrap = styled.section`
   position: fixed;
   height: 200vh;
   left: 0;
   top: 0;
   bottom: 0;
   width: ${SIDE_WINDOW_WIDTH}px;
   background-color: black;
   box-shadow: ${BOX_SHADOW};
   z-index: 100;
   margin-top: ${SMALL_HEADER_HEIGHT}px;
   padding-top: 50px;
`;

const CloseButton = styled.div`
   position: absolute;
   top: 12px;
   right: 12px;
   cursor: pointer;
`;

const ControlPanel = styled.section`
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   padding : 0px 16px;

   ${Button} {
      width : 100%;
      border : none;
      font-size: 20px;
      border-radius: 6px;
      padding: 9px 12px;
      color : black;
      background-color: white;
      box-shadow: ${BOX_SHADOW};
   }
`;

const TableWrap = styled.div`
   width: 100%;
   padding: 16px;
`;
const TableName = styled.p<{ color: string | undefined }>`
   color: ${({ color }) => color};
`;
const TupleRow = styled.div``;
