import { SIDE_WINDOW_WIDTH, SMALL_HEADER_HEIGHT } from 'constants/view.const';
import { Table } from 'interfaces/network/table.interfaces';
import { DiagramToolMode, DiagramToolType } from 'interfaces/view/diagram.interface';
import React, { RefObject, useCallback } from 'react';
import { useXarrow } from 'react-xarrows';

type Props = {
   table: Table;
   tableRef: RefObject<HTMLElement>;
   parentRef: RefObject<HTMLElement>;
   toolMode: DiagramToolMode;
};

function useDrag({ table, tableRef, parentRef, toolMode }: Props) {
   const isDragMode = toolMode.type === DiagramToolType.DRAG;

   const updateXarrow = useXarrow();

   const getCurrentPosition = useCallback(
      (el: HTMLElement) => {
         const transform = el.style.transform;
         const matrix = new WebKitCSSMatrix(transform);
         const x = matrix.m41;
         const y = matrix.m42;

         return {
            x: x,
            y: y,
         };
      },
      [toolMode],
   );

   const setInitialComponentPosition = useCallback(() => {
      const tableWrap = tableRef.current;
      if (!tableWrap) return;
      tableWrap.style.transform = `translateX(${table.positionX}px) translateY(${table.positionY}px)`;
   }, [toolMode]);

   // 컴포넌트의 중앙에 커서가 오도록
   const setComponentPositionCenter = useCallback(
      (ev: globalThis.MouseEvent) => {
         const tableWrap = tableRef.current;

         if (!tableWrap) return;
         const cursorX = ev.pageX - SIDE_WINDOW_WIDTH; // clientX는 화면전체 기준(현재 마진을 추가로 계산필요), pageX는 현 컴포넌트 기준(스크롤의 영향을 안받음)
         const cursorY = ev.pageY - SMALL_HEADER_HEIGHT;

         const newX = cursorX - tableWrap.offsetWidth / 2;
         const newY = cursorY - tableWrap.offsetHeight / 2;
         tableWrap.style.transform = `translateX(${newX}px) translateY(${newY}px)`;
         updateXarrow();
      },
      [toolMode],
   );

   const saveCurrentPosition = useCallback(() => {
      const tableWrap = tableRef.current;
      if (!tableWrap) return;
      const { x, y } = getCurrentPosition(tableWrap);
      table.positionX = x;
      table.positionY = y;
      // TODO: 변경된 position 디비 저장 로직(debounce or throttle 필요)
   }, [toolMode]);

   const onListenMouseMove = useCallback((ev: MouseEvent) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (table.isDraggable && isDragMode) {
         setComponentPositionCenter(ev);
         // TODO : 가장자리에 붙으면 움직임 정지
      }
   }, []);
   const onListenMouseDown = useCallback(
      (ev: any) => {
         if (isDragMode) {
            table.isDraggable = true;
            setComponentPositionCenter(ev);
            // parent에서 마우스이벤트를 관리해야 빠른 마우스 이동까지 커버 가능
            parentRef?.current?.addEventListener('mousemove', onListenMouseMove);
         }
      },
      [toolMode],
   );

   const onListenMouseUp = useCallback(
      (ev: any) => {
         if (isDragMode) {
            table.isDraggable = false;
            saveCurrentPosition();
            parentRef?.current?.removeEventListener('mousemove', onListenMouseMove);
         }
      },
      [toolMode],
   );

   return { setInitialComponentPosition, onListenMouseMove, onListenMouseUp, onListenMouseDown };
}

export default useDrag;
