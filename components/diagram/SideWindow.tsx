import React from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import {
   BOX_SHADOW,
   SIDE_WINDOW_WIDTH,
   SMALL_HEADER_HEIGHT,
   STRONG_BOX_SHADOW,
} from 'constants/view.const';
import { useRecoilState } from 'recoil';
import { sideWindowWidthState, tableState } from 'modules/diagramModule';
import { BsTable } from 'react-icons/bs';
import { Column, Row } from 'components/common/styled-common-components';
import CustomColors from 'constants/colors';
import { FcAddColumn } from 'react-icons/fc';

type Props = {
   isOpen: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideWindow({ isOpen, setOpen }: Props) {
   const [selectedTable, setTable] = useRecoilState(tableState);
   const [sideWindowWidth, setSideWindowWidth] = useRecoilState(sideWindowWidthState);

   const onClose = () => {
      setOpen(false);
      setSideWindowWidth(0);
   };
   return (
      <>
         {isOpen && (
            <SideWindowWrap>
               <CloseButton onClick={onClose}>
                  <IoMdClose size={25} />
               </CloseButton>

               <Panel>
                  <Title>{'Controllers'}</Title>

                  <ControlBtnWrap>
                     <BsTable size={20} />
                     <Text>{'New Table'}</Text>
                  </ControlBtnWrap>
               </Panel>

               <Panel>
                  <Title>{'Table Editor'}</Title>

                  {selectedTable && (
                     <>
                        <TableWrap>
                           <TableName color={selectedTable!.color}>
                              {selectedTable?.name} AS {selectedTable.alias}
                           </TableName>
                           <TupleRowsWrap>
                              {selectedTable.tuples.map(tuple => {
                                 return (
                                    <TupleRow key={tuple.name}>
                                       {tuple.name} {tuple.dataType}
                                    </TupleRow>
                                 );
                              })}
                           </TupleRowsWrap>
                        </TableWrap>
                        <ColumnAddButton>
                           <Row>
                              <FcAddColumn size={18} />
                              {'New Column'}
                           </Row>
                        </ColumnAddButton>
                     </>
                  )}
               </Panel>
            </SideWindowWrap>
         )}
      </>
   );
}

export default SideWindow;

// common
const Text = styled.p``;
const Title = styled.p``;
const Button = styled.button`
   cursor: pointer;
`;

//
const SideWindowWrap = styled.section`
   box-sizing: border-box;
   color: black;
   position: fixed;
   height: 200vh;
   left: 0;
   top: 0;
   bottom: 0;
   width: ${SIDE_WINDOW_WIDTH}px;
   background-color: white;
   box-shadow: ${STRONG_BOX_SHADOW};
   z-index: 99;
   margin-top: ${SMALL_HEADER_HEIGHT}px;
   padding-top: 50px;
`;

const CloseButton = styled.div`
   position: absolute;
   top: 12px;
   right: 12px;
   cursor: pointer;
`;

const ControlBtnWrap = styled(Row)`
   padding: 8px;
   border-radius: 6px;
   cursor: pointer;
   user-select: none;
   -moz-user-select: none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   -o-user-select: none;

   &:hover {
      transition: all 0.3s;
      background-color: ${CustomColors.background1};
   }

   ${Text} {
      font-size: 16px;
      font-weight: 500;
      padding: 0px 12px;
      margin: 0px;
   }
`;
const Panel = styled.section`
   display: flex;
   flex-direction: column;
   justify-content: center;
   margin: 12px 16px;
   padding-bottom: 20px;
   border-bottom: 0.5px solid ${CustomColors.background2};

   ${Title} {
      font-size: 20px;
      font-weight: 700;
   }
`;

const TableWrap = styled.div`
   position: relative;
   padding: 12px;
   border-radius: 12px;
   box-shadow: ${BOX_SHADOW};
   background-color: white;
   z-index: 2;
`;
const ColumnAddButton = styled.div`
   position: relative;
   border-bottom-left-radius: 12px;
   border-bottom-right-radius: 12px;
   box-shadow: ${BOX_SHADOW};
   height: 30px;
   margin-top: -10px;
   width: 100%;
   z-index: 1;

   ${Row} {
      user-select: none;
      justify-content: center;
      font-size: 12px;
      font-weight: 500;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      text-align: center;
      margin: 0px;
      margin-top: auto;
      gap: 4px;
   }
   cursor: pointer;
   &:hover {
      transition: all 0.2s;
      height: 45px;
      background-color: ${CustomColors.background1};

      ${Row} {
         bottom: 8px;
      }
   }
`;

const TableName = styled.p<{ color: string | undefined }>`
   color: ${({ color }) => color};
   margin: 0px;
   padding: 6px 0px;
`;

const TupleRowsWrap = styled.div``;
const TupleRow = styled.div``;
