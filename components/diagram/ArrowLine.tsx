import { SMALL_HEADER_HEIGHT } from 'constants/view.const';
import { DraggableContext } from 'contexts/DraggableContext';
import useForceUpdate from 'hooks/common/useForceUpdate';
import useArrowLine from 'hooks/useArrowLine';
import { RelationType } from 'interfaces/view/diagram.interface';
import { sideWindowWidthState } from 'modules/diagramModule';
import React, { RefObject, useContext, useEffect, useState } from 'react';
import { useXarrow } from 'react-xarrows';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

type Props = {
   start: string | RefObject<HTMLElement>;
   end: string | RefObject<HTMLElement>;
   startEdgeType?: RelationType;
   endEdgeType?: RelationType;
   color?: string;
   strokeWidth?: number;
   startIcon?: string;
   endIcon?: string;
   // parentRef : RefObject<HTMLElement>;
   // x:  number;
};

type ClipSide = 'left' | 'right';

export function ArrowLine({
   start,
   end,
   startEdgeType = RelationType.Single,
   endEdgeType = RelationType.Single,
   color = 'red',
   strokeWidth = 3,
   startIcon = '',
   endIcon = '',
}: Props) {
   const [sideWindowWidth, _] = useRecoilState(sideWindowWidthState);
   const [linePath, setLinePath] = useState('');
   const [coordinate, setCoordinate] = useState({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      cx: 0,
      cy: 0,
   });

   const parentRef = useContext(DraggableContext);

   useEffect(() => {
      parentRef.current?.addEventListener('mousemove', drawLine);
      parentRef.current?.addEventListener('scroll', drawLine);
      parentRef.current?.removeEventListener('mouseup', drawLine);
      parentRef.current?.removeEventListener('mouseleave', drawLine);
   }, []);

   const getCurrentPosition = () => {
      const startEle: HTMLElement | null =
         typeof start === 'string' ? document.getElementById(start) : start.current;
      const endEle: HTMLElement | null =
         typeof end === 'string' ? document.getElementById(end) : end.current;

      if (!startEle || !endEle) return;

      const startRect = startEle?.getBoundingClientRect();// getBoundingClientRect는 document가 아닌 window기준이기 때문에 window의 스크롤 값을 계산필요(안그러면 스크롤시 문제 발생)
      const endRect = endEle?.getBoundingClientRect(); 

      const newStartRect = {
         leftSide: {
            x: startRect.left + window.scrollX - sideWindowWidth,
            y: startRect.top + window.scrollY - SMALL_HEADER_HEIGHT + startRect.height / 2,
         },
         rightSide: {
            x: startRect.left + window.scrollX - sideWindowWidth + startRect.width,
            y: startRect.top + window.scrollY - SMALL_HEADER_HEIGHT + startRect.height / 2,
         },
      };

      const newEndRect = {
         leftSide: {
            x: endRect.left + window.scrollX - sideWindowWidth,
            y: endRect.top + window.scrollY - SMALL_HEADER_HEIGHT + endRect.height / 2,
         },
         rightSide: {
            x: endRect.left + window.scrollX - sideWindowWidth + endRect.width,
            y: endRect.top + window.scrollY - SMALL_HEADER_HEIGHT + endRect.height / 2,
         },
      };

      return {
         start: newStartRect,
         end: newEndRect,
      };
   };

   const drawLine = () => {
      const position = getCurrentPosition();
      if (!position) return;

      const startRect = position.start;
      const endRect = position.end;
      // start coordinates
      let x1 = 0;
      let y1 = 0;

      // end coordinates
      let x2 = 0;
      let y2 = 0;

      // 집게('ㄷ') 모양(서로 같은 사이드에 있을 경우 arrowLine의 모양이 변경되어야함.)
      let isClipShape: boolean = false;

      // determine where start and end point will start to be drawn(left or right side)
      if (startRect.leftSide.x >= endRect.rightSide.x) {
         // 겹치지 않고 end컴포넌트(왼),start 컴포넌트(오른)
         x1 = startRect.leftSide.x;
         y1 = startRect.leftSide.y;
         x2 = endRect.rightSide.x;
         y2 = endRect.rightSide.y;
      } else if (startRect.rightSide.x <= endRect.leftSide.x) {
         // 겹치지 않고 start 컴포넌트(왼),end 컴포넌트(오른)
         x1 = startRect.rightSide.x;
         y1 = startRect.rightSide.y;
         x2 = endRect.leftSide.x;
         y2 = endRect.leftSide.y;
      } else {
         isClipShape = true;
         x1 = startRect.rightSide.x;
         y1 = startRect.rightSide.y;
         x2 = endRect.rightSide.x;
         y2 = endRect.rightSide.y;
      }

      // const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      // const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
      let cx: number = (x1 + x2) / 2;
      const cy: number = (y1 + y2) / 2;

      let path: string = '';
      if (isClipShape) {
         const rectWidth = endRect.rightSide.x - endRect.leftSide.x;
         path = `
            M${x1} ${y1} 
            H${(cx += rectWidth / 2)}
            V${y2}
            H${x2}`;
      } else {
         path = `
            M${x1} ${y1} 
            H${cx}
            V${y2}
            H${x2}`;
      }

      setLinePath(path);
      setCoordinate({
         x1: x1,
         y1: y1,
         x2: x2,
         y2: y2,
         cx: cx,
         cy: cy,
      });
      return;
   };

   useEffect(() => {
      drawLine();
   }, []);

   useXarrow();

   return (
      <ArrowLineWrap>
         <Dot
            color={'green'}
            style={{ transform: `translate(${coordinate.x1}px, ${coordinate.y1}px)` }}
         >
            Start
         </Dot>
         <Dot
            color={'blue'}
            style={{ transform: `translate(${coordinate.x2}px, ${coordinate.y2}px)` }}
         >
            End
         </Dot>
         <Dot
            color={'gray'}
            style={{ transform: `translate(${coordinate.cx}px, ${coordinate.cy}px)` }}
         >
            Middle
         </Dot>
         <Line>
            <path d={linePath} strokeWidth={strokeWidth} stroke={color} />
         </Line>
      </ArrowLineWrap>
   );
}

export default ArrowLine;

const ArrowLineWrap = styled.div`
   position: absolute;
   pointer-events: none;
`;

const Line = styled.svg`
   overflow: visible;

   > path {
      stroke-linejoin: round;
      stroke-linecap: round;
      fill: transparent;
   }
`;

const Dot = styled.div<{ color: string }>`
   position: absolute;
   width: 7px;
   height: 7px;
   background-color: ${({ color }) => color};
   color: ${({ color }) => color};
   border-radius: 50%;
`;
