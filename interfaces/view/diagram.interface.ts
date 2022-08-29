import { ReactNode, RefObject } from 'react';

export enum DiagramToolType {
   EDIT,
   DRAG,
   COMMENT,
}

export enum ArrowLineEdgeType {
   Single = "1",
   Mutiple = "n",
}

export interface Translate {
   x: number;
   y: number;
}

export interface DiagramToolIcon {
   mode: DiagramToolMode;
   children: ReactNode;
}

export interface DiagramToolMode {
   type: DiagramToolType;
   name: string;
}

export interface ArrowLine {
   start: string | RefObject<HTMLElement>;
   end: string | RefObject<HTMLElement>;
   startEdgeType: ArrowLineEdgeType;
   endEdgeType: ArrowLineEdgeType;
}
