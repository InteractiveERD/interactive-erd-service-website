import { SIDE_WINDOW_WIDTH, SMALL_HEADER_HEIGHT } from 'constants/view.const';
import { Table } from 'interfaces/network/table.interfaces';
import { DiagramToolMode, DiagramToolType } from 'interfaces/view/diagram.interface';
import { sideWindowWidthState } from 'modules/diagramModule';
import React, { RefObject, useCallback, useEffect } from 'react';
import { useXarrow } from 'react-xarrows';
import { useRecoilState } from 'recoil';
import { getPositionByTransform } from 'utils/position.util';

type Props = {
   table: Table;
   tableRef: RefObject<HTMLElement>;
   parentRef: RefObject<HTMLElement>;
   toolMode: DiagramToolMode;
};

function useDrag({ table, tableRef, parentRef, toolMode }: Props) {
   const isDragMode = toolMode.type === DiagramToolType.DRAG;
   const [sideWindowWidth, _] = useRecoilState(sideWindowWidthState);

   React.useLayoutEffect = React.useEffect; // useLayoutEffect warning message 때문에 작성(Xwrapper안에 useLayoutEffect가 존재)
   const updateXarrow = useXarrow();

   const getPosition = useCallback(getPositionByTransform, [toolMode]);

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
         const cursorX = ev.pageX - sideWindowWidth; // clientX는 화면전체 기준(현재 마진을 추가로 계산필요), pageX는 현 컴포넌트 기준(스크롤의 영향을 안받음)
         const cursorY = ev.pageY - SMALL_HEADER_HEIGHT;

         const newX = cursorX - tableWrap.offsetWidth / 2;
         const newY = cursorY - tableWrap.offsetHeight / 2;
         tableWrap.style.transform = `translateX(${newX}px) translateY(${newY}px)`;
         updateXarrow();
      },
      [toolMode, sideWindowWidth],
   );

   const saveCurrentPosition = useCallback(() => {
      const tableWrap = tableRef.current;
      if (!tableWrap) return;
      const { x, y } = getPosition(tableWrap);
      table.positionX = x;
      table.positionY = y;
      // TODO: 변경된 position 디비 저장 로직(debounce or throttle 필요)
   }, [toolMode]);

   const onListenMouseMove = useCallback(
      (ev: MouseEvent) => {
         if (table.isDraggable && isDragMode) {
            setComponentPositionCenter(ev);
            // TODO : 가장자리에 붙으면 움직임 정지
         }
      },
      [sideWindowWidth],
   );
   const onListenMouseDown = useCallback(
      (ev: any) => {
         if (isDragMode) {
            table.isDraggable = true;
            setComponentPositionCenter(ev);
            // parent에서 마우스이벤트를 관리해야 빠른 마우스 이동까지 커버 가능
            parentRef?.current?.addEventListener('mousemove', onListenMouseMove);
         }
      },
      [toolMode, sideWindowWidth],
   );

   const onListenMouseUp = useCallback(
      (ev: any) => {
         if (isDragMode) {
            table.isDraggable = false;
            saveCurrentPosition();
            parentRef?.current?.removeEventListener('mousemove', onListenMouseMove);
         }
      },
      [toolMode, sideWindowWidth],
   );

   return { setInitialComponentPosition, onListenMouseMove, onListenMouseUp, onListenMouseDown };
}

export default useDrag;
