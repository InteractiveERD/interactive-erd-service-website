import { DiagramToolType } from 'modules/diagramModule';
import { ReactNode } from 'react';

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
