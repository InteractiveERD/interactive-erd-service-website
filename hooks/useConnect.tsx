import { ArrowLine, ArrowLineEdgeType, DiagramToolType } from 'interfaces/view/diagram.interface';
import { arrowLinesState, toolModeState } from 'modules/diagramModule';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

function useConnect() {
   const [startEdge, setStartEdge] = useState<string>('');
   const [endEdge, setEndEdge] = useState<string>('');
   const [line, setLine] = useState<ArrowLine | undefined>();
   const [arrowLines, setArrowLines] = useRecoilState(arrowLinesState);
   const [toolMode, _] = useRecoilState(toolModeState);
   const isEditMode = toolMode.type === DiagramToolType.EDIT;

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
        if(isDiffId && isDiffTable){
            setEndEdge(edgeId);
        }else{
            // TODO : 경고 알럿
        }
         return;
      }
   };

   useEffect(() => {
      console.log('init hooks');
   }, []);

   useEffect(() => {
      if (startEdge) {
         console.log(`startEdge : ${startEdge}`);
      } else {
         console.log('startEdge 지워짐');
      }
   }, [startEdge]);

   useEffect(() => {
      if (endEdge) {
         console.log(`endEdge : ${endEdge}`);
         const newLine: ArrowLine = {
            start: startEdge,
            end: endEdge,
            startEdgeType: ArrowLineEdgeType.Single,
            endEdgeType: ArrowLineEdgeType.Single,
         };
         setLine(newLine);
         setStartEdge('');
         setEndEdge('');
      }
   }, [endEdge]);

   useEffect(() => {
      if (line) {
         console.log(`line : ${JSON.stringify(line)}`);
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
