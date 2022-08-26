import { DiagramTool } from "modules/diagramModule";
import { ReactNode } from "react";

export interface Translate {
    x : number;
    y : number;
}

export interface DiagramToolIcon {
    name : DiagramTool;
    children : ReactNode;
}