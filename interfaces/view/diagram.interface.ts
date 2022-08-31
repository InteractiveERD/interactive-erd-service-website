import { ReactNode, RefObject } from 'react';

export enum DiagramToolType {
   EDIT,
   DRAG,
   COMMENT,
}

export enum RelationType {
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

export interface ArrowLineType {
   start: string | RefObject<HTMLElement>;
   end: string | RefObject<HTMLElement>;
   startEdgeType: RelationType;
   endEdgeType: RelationType;
}


export interface PointInfo {
   x1: number;
   y1: number;
   x2: number;
   y2: number;
   cx: number;
   cy: number;
   length: number;
   angle: number;
}
