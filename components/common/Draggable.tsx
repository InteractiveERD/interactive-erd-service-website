import { Translate } from "interfaces/view/diagram.interface";
import React, {
  MouseEvent,
  ReactNode,
  RefObject,
  useState,
} from "react";
import styled from "styled-components";

type Props = {
  onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
  onPointerUp?: React.PointerEventHandler<HTMLDivElement>;
  onPointerMove?: React.PointerEventHandler<HTMLDivElement>;
  onDragMove?: React.PointerEventHandler<HTMLDivElement>;
  translate: Translate;
  areaRef: RefObject<HTMLElement>;
  childrenRef: RefObject<HTMLElement>;
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

function Draggable({
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onDragMove,
  areaRef,
  childrenRef,
  translate,
  children,
  style,
  className,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isGrabbed, setGrabbed] = useState(false);

  const areaWidth = areaRef.current?.offsetWidth || 0;
  const areaHeight = areaRef.current?.offsetHeight || 0;
  const componentWidth = childrenRef.current?.offsetWidth || 0;
  const componentHeight = childrenRef.current?.offsetHeight || 0;
  const isOverLeftTop = translate.x < 0 || translate.y < 0;
  const isOverRightBottom =
    (areaWidth > 0 ? translate.x + componentWidth > areaWidth : false) ||
    (areaHeight > 0 ? translate.y + componentHeight > areaHeight : false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setGrabbed(true);

    if (!onPointerDown) return;
    onPointerDown(e);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setGrabbed(false);
    if (!onPointerUp) return;
    onPointerUp(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
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
    if (!onPointerMove) return;
    onPointerMove(e);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    setGrabbed(false);
    setIsDragging(false);
  };

  return (
    <DraggableWrap
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      style={style}
      className={className}
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
