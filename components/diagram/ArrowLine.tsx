import { SMALL_HEADER_HEIGHT } from 'constants/view.const';
import { RelationType } from 'interfaces/view/diagram.interface';
import { sideWindowWidthState } from 'modules/diagramModule';
import React, { RefObject, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
// import { getPositionByTransform } from 'utils/position.util';

type Props = {
   start: string | RefObject<HTMLElement>;
   end: string | RefObject<HTMLElement>;
   //  areaRef: RefObject<HTMLElement>;
   startEdgeType?: RelationType;
   endEdgeType?: RelationType;
   color?: string;
   strokeWidth?: number;
   startIcon?: string;
   endIcon?: string;
};

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
}: Props) {
   const [sideWindowWidth, _] = useRecoilState(sideWindowWidthState);
   //  const [pointInfo, setPointInfo] = useState<PointInfo>();
   const [linePath, setLinePath] = useState('');

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

      // determine where start and end point will start to be drawn(left or right side)
      if (startRect.leftSide.x >= endRect.rightSide.x) {
         x1 = startRect.leftSide.x;
         y1 = startRect.leftSide.y;
         if (startRect.leftSide.x <= endRect.leftSide.x) {
            x2 = endRect.leftSide.x;
            y2 = endRect.leftSide.y;
         } else {
            x2 = endRect.rightSide.x;
            y2 = endRect.rightSide.y;
         }
      } else {
         x1 = startRect.rightSide.x;
         y1 = startRect.rightSide.y;
         if (startRect.rightSide.x >= endRect.rightSide.x) {
            x2 = endRect.rightSide.x;
            y2 = endRect.rightSide.y;
         } else {
            x2 = endRect.leftSide.x;
            y2 = endRect.leftSide.y;
         }
      }

      // const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      // const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
      const cx = (x1 + x2) / 2;
      // const cy = (y1 + y2) / 2;

      let path: string = '';

      path = `
        M${x1} ${y1} 
        H${cx}
        V${y2}
        H${x2}`;
      setLinePath(path);
      return;
   };

   useEffect(() => {
      drawLine();
   }, []);

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
  position : absolute;
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
