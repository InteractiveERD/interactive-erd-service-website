import { DiagramToolType } from 'modules/diagramModule';
import { ReactNode } from 'react';

export interface Translate {
   x: number;
   y: number;
}

export interface DiagramToolIcon {
   mode: DiagramTool;
   children: ReactNode;
}

export interface DiagramTool {
   type: DiagramToolType;
   name: string;
}
