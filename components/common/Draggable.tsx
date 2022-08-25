import { Translate } from 'interfaces/view/diagram.interface';
import React, { MouseEvent, ReactNode, RefObject, useEffect, useState } from 'react';
import styled from 'styled-components';

type Props = {
   onDragMove?: React.PointerEventHandler<HTMLDivElement>;
   translate: Translate;
   areaRef: RefObject<HTMLElement>;
   childrenRef: RefObject<HTMLElement>;
   children: ReactNode;
};

function Draggable({ onDragMove, areaRef, childrenRef, translate, children }: Props) {
   const [isDragging, setIsDragging] = useState(false);
   const [isGrabbed, setGrabbed] = useState(false);

   const handlePointerDown = (e: React.PointerEvent) => {
      setIsDragging(true);
      setGrabbed(true);
   };

   const handlePointerUp = (_: React.PointerEvent) => {
      setIsDragging(false);
      setGrabbed(false);
   };

   const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const areaWidth = areaRef.current?.offsetWidth || 0;
      const areaHeight = areaRef.current?.offsetHeight || 0;
      const componentWidth = childrenRef.current?.offsetWidth || 0;
      const componentHeight = childrenRef.current?.offsetHeight || 0;
      const isOverLeftTop = translate.x < 0 || translate.y < 0;
      const isOverRightBottom =
         (areaWidth > 0 ? translate.x + componentWidth > areaWidth : false) ||
         (areaHeight > 0 ? translate.y + componentHeight > areaHeight : false);

      const isOverDrag =
         (isOverLeftTop && (e.movementX < 0 || e.movementY < 0)) ||
         (isOverRightBottom && (e.movementX > 0 || e.movementY > 0));

      if (isOverDrag) {
         setIsDragging(false);
         setGrabbed(false);
      }

      const tryMoveReverseDirection =
         (isOverLeftTop && (e.movementX > 0 || e.movementY > 0)) ||
         (isOverRightBottom && (e.movementX < 0 || e.movementY < 0));
      if (tryMoveReverseDirection) {
         setIsDragging(true);
      }

      if (isDragging && isGrabbed) {
         if (!onDragMove) return;
         onDragMove(e);
      }
   };

   const handleMouseLeave = (_: React.MouseEvent) => {
      setGrabbed(false);
      setIsDragging(false);
   };

   return (
      <DraggableWrap
         onPointerDown={handlePointerDown}
         onPointerUp={handlePointerUp}
         onPointerMove={handlePointerMove}
         onMouseLeave={handleMouseLeave}
      >
         {children}
      </DraggableWrap>
   );
}

export default React.memo(Draggable);

const DraggableWrap = styled.div`
   cursor: grab;
   user-select: none;
   -moz-user-select: none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   -o-user-select: none;
`;
