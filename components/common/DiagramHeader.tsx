import { HeaderAvatar } from 'interfaces/view/header.interface';
import React from 'react';
import styled from 'styled-components';
import { Column, Row } from './styled-common-components';
import { FaRegHandPaper } from 'react-icons/fa';
import { BsCursor } from 'react-icons/bs';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { BOX_SHADOW, SMALL_HEADER_HEIGHT } from 'constants/view.const';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { DiagramTool, toolModeState } from 'modules/diagramModule';
import { DiagramToolIcon } from 'interfaces/view/diagram.interface';

function DiagramHeader() {
   const LOGO_NAME = 'InteractiveERD';

   const [toolMode, setToolMode] = useRecoilState(toolModeState);

   const handleToolMode = (name: DiagramTool) => setToolMode(name);

   return (
      <DiagramHeaderWrap>
         <LeftSideWrap>
            <LogoWrap>
               <LogoBox />
               <Text>{LOGO_NAME}</Text>
            </LogoWrap>

            <InteractiveTools>
               {TOOLS.map((tool: DiagramToolIcon) => {
                  return (
                     <ToolIcon
                        key={tool.name}
                        isSelected={toolMode === tool.name}
                        onClick={() => handleToolMode(tool.name)}
                     >
                        {tool.children}
                     </ToolIcon>
                  );
               })}
            </InteractiveTools>
         </LeftSideWrap>

         <RightSideWrap>
            <Collaborators>
               {MOCK_AVARARS.map((avatar: HeaderAvatar) => {
                  return (
                     <CircleAvatar
                        key={avatar.id}
                        src={avatar.imgPath || ''}
                        alt={avatar.name}
                        width={'30px'}
                        height={'30px'}
                     />
                  );
               })}
            </Collaborators>

            <Buttons>
               <Button>{'Share'}</Button>
            </Buttons>
         </RightSideWrap>
      </DiagramHeaderWrap>
   );
}

export default DiagramHeader;

const MOCK_AVARARS: HeaderAvatar[] = [
   {
      id: 0,
      name: 'Tom',
      imgPath:
         'https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png',
   },
   {
      id: 1,
      name: 'Julia',
      imgPath: 'https://pickaface.net/gallery/avatar/unr_sample_170130_2257_9qgawp.png',
   },
   {
      id: 2,
      name: 'Kurk',
      imgPath: 'https://pickaface.net/gallery/avatar/20151109_144853_2380_sample.png',
   },
];

const TOOLS: DiagramToolIcon[] = [
   {
      name: DiagramTool.EDIT,
      children: <BsCursor size={25} />,
   },
   {
      name: DiagramTool.DRAG,
      children: <FaRegHandPaper size={25} />,
   },
   {
      name: DiagramTool.COMMENT,
      children: <IoChatbubbleEllipsesOutline size={25} />,
   },
];

// common
const Text = styled.p``;
const Button = styled.button`
   cursor: pointer;
   border: none;
`;
const CircleAvatar = styled(Image)`
   border-radius: 50%;
`;

//
const DiagramHeaderWrap = styled.section`
   width: 100%;
   height: ${SMALL_HEADER_HEIGHT}px;
   background-color: white;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   z-index: 100;
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: 0px 16px;
   justify-content: space-between;
   box-shadow: ${BOX_SHADOW};
`;

const LeftSideWrap = styled(Row)`
   gap: 30px;
`;
const RightSideWrap = styled(Row)`
   gap: 30px;
`;

const LogoWrap = styled(Row)`
   cursor: pointer;
   ${Text} {
      font-size: 17px;
      font-weight: 800;
      color: black;
      margin-left: 9px;
   }
`;
const LogoBox = styled.div`
   cursor: pointer;
   width: 30px;
   height: 30px;
   background-color: black;
   border-radius: 8px;
`;
const InteractiveTools = styled(Row)`
   gap: 4px;
`;
const ToolIcon = styled(Column)<{ isSelected: boolean }>`
   align-items: center;
   justify-content: center;
   width: 35px;
   height: 35px;
   cursor: pointer;
   color: black;
   border-radius: 6px;
   background-color: ${({ isSelected }) => isSelected && 'navy'};
   color: ${({ isSelected }) => isSelected && 'white'};

   &:hover {
      background-color: navy;
      color: white;
      transition: all 0.2s;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
   }
`;

const Collaborators = styled(Row)`
   gap: 6px;
   ${CircleAvatar} {
      border: 1px solid gray;
      cursor: pointer;
      &:hover {
         border: 1.5px solid black;
         transition: all 0.3s;
      }
   }
`;
const Buttons = styled.div`
   ${Button} {
      border-radius: 6px;
      color: white;
      background-color: navy;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 700;
   }
`;
