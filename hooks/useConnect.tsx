import { Table } from 'interfaces/network/table.interfaces';
import { ArrowLineType, RelationType, DiagramToolType } from 'interfaces/view/diagram.interface';
import { arrowLinesState, toolModeState } from 'modules/diagramModule';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

function useConnect() {
   const [startEdge, setStartEdge] = useState<string>('');
   const [endEdge, setEndEdge] = useState<string>('');
   const [line, setLine] = useState<ArrowLineType | undefined>();
   const [arrowLines, setArrowLines] = useRecoilState(arrowLinesState);
   const [toolMode, _] = useRecoilState(toolModeState);
   const isEditMode = toolMode.type === DiagramToolType.EDIT;
   // TODO : 중간에 해제하고 싶을 때 기능 추가필요

   const onClickTuple = (edgeId: string) => {
      if (!isEditMode) return;

      const { table: startTable } = decomposeEdgeId(startEdge);
      const { table: endTable } = decomposeEdgeId(edgeId);
      const isDiffId = startEdge !== edgeId;
      const isDiffTable = startTable !== endTable;

      // 시작점 클릭
      if (!startEdge) {
         setStartEdge(edgeId);
         return;
      } else {
         // 끝점 클릭
         if (isDiffId && isDiffTable) {
            setEndEdge(edgeId);
         } else {
            // TODO : 경고 알럿(같은 id거나 같은 테이블 내에선 관계 생성 불가 메세지)
         }
         return;
      }
   };

   useEffect(() => {
      if (endEdge) {
         const newLine: ArrowLineType = {
            start: startEdge,
            end: endEdge,
            startEdgeType: RelationType.Single,
            endEdgeType: RelationType.Single,
         };
         setLine(newLine);
         setStartEdge('');
         setEndEdge('');
      }
   }, [endEdge]);

   useEffect(() => {
      if (line) {
         setArrowLines([...arrowLines, line]);
         setLine(undefined);
      }
   }, [line]);

   return [onClickTuple];
}

export default useConnect;

export const decomposeEdgeId = (edgeId: string) => {
   const splitted: string[] = edgeId.split('-');
   const isWellFormatted = splitted.length === 4;
   if (isWellFormatted) {
      const tableName = splitted[1];
      const tupleName = splitted[3];

      return {
         table: tableName,
         tuple: tupleName,
      };
   } else {
      return {
         table: '',
         tuple: '',
      };
   }
};

export const getTupleFromEdgeId = (edgeId: string) => {};
