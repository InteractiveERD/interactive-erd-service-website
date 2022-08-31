import { SMALL_HEADER_HEIGHT } from 'constants/view.const';
import useArrowLine from 'hooks/useArrowLine';
import { RelationType } from 'interfaces/view/diagram.interface';
import { sideWindowWidthState } from 'modules/diagramModule';
import React, { RefObject, useEffect, useState } from 'react';
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
   // x:  number;
};

type ClipSide = 'left' | 'right';

export function ArrowLine({
   start,
   end,
   //  areaRef,
   startEdgeType = RelationType.Single,
   endEdgeType = RelationType.Single,
   color = 'red',
   strokeWidth = 3,
   startIcon = '',
   endIcon = '',
}: // x,
Props) {
   const [sideWindowWidth, _] = useRecoilState(sideWindowWidthState);
   const [linePath, setLinePath] = useState('');
   const { updateArrowLinePosition } = useArrowLine();

   const getCurrentPosition = () => {
      const startEle: HTMLElement | null =
         typeof start === 'string' ? document.getElementById(start) : start.current;
      const endEle: HTMLElement | null =
         typeof end === 'string' ? document.getElementById(end) : end.current;

      if (!startEle || !endEle) return;

      const startRect = startEle?.getBoundingClientRect();
      const endRect = endEle?.getBoundingClientRect();

      const newStartRect = {
         leftSide: {
            x: startRect.left - sideWindowWidth,
            y: startRect.top - SMALL_HEADER_HEIGHT + startRect.height / 2,
         },
         rightSide: {
            x: startRect.left - sideWindowWidth + startRect.width,
            y: startRect.top - SMALL_HEADER_HEIGHT + startRect.height / 2,
         },
      };

      const newEndRect = {
         leftSide: {
            x: endRect.left - sideWindowWidth,
            y: endRect.top - SMALL_HEADER_HEIGHT + endRect.height / 2,
         },
         rightSide: {
            x: endRect.left - sideWindowWidth + endRect.width,
            y: endRect.top - SMALL_HEADER_HEIGHT + endRect.height / 2,
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
      let clipSide: ClipSide = 'left';

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
      }
      // 겹치는 케이스
      // 1. 왼쪽 집게
      else if (
         (startRect.leftSide.x <= endRect.leftSide.x &&
            startRect.rightSide.x < endRect.rightSide.x) ||
         (startRect.leftSide.x >= endRect.leftSide.x && startRect.rightSide.x > endRect.rightSide.x)
      ) {
         console.log('왼 집게');
         isClipShape = true;
         clipSide = 'left';
         x1 = startRect.leftSide.x;
         y1 = startRect.leftSide.y;
         x2 = endRect.leftSide.x;
         y2 = endRect.leftSide.y;
      }
      // 2. 오른쪽 집게
      else if (
         (startRect.rightSide.x <= endRect.rightSide.x &&
            startRect.leftSide.x < endRect.leftSide.x) ||
         (startRect.rightSide.x >= endRect.rightSide.x && startRect.leftSide.x > endRect.leftSide.x)
      ) {
         console.log('오른 집게');
         isClipShape = true;
         clipSide = 'right';
         x1 = startRect.rightSide.x;
         y1 = startRect.rightSide.y;
         x2 = endRect.rightSide.x;
         y2 = endRect.rightSide.y;
      }

      // const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      // const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
      const cx = (x1 + x2) / 2;
      // const cy = (y1 + y2) / 2;

      let path: string = '';
      if (isClipShape) {
         path = `
            M${x1} ${y1} 
            H${clipSide === 'left' ? x1 - 30 : cx + 30}
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
      return;
   };

   useEffect(() => {
      drawLine();
   }, [updateArrowLinePosition]);

   useXarrow();

   return (
      <ArrowLineWrap>
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
   border-radius: 50%;
`;
