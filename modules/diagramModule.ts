import { Table } from 'interfaces/network/table.interfaces';
import { DiagramToolMode } from 'interfaces/view/diagram.interface';
import { atom, selector } from 'recoil';

export enum DiagramToolType {
   EDIT,
   DRAG,
   COMMENT,
}

export const DiagramTools  : DiagramToolMode[] = [
   {
      type : DiagramToolType.EDIT,
      name : "edit",
   },
   {
      type : DiagramToolType.DRAG,
      name : "drag",
   },
   {
      type : DiagramToolType.COMMENT,
      name : "comment",
   },
]

const toolModeState = atom<DiagramToolMode>({
   key: `toolModeState-${new Date()}`,
   default: DiagramTools[1],
});

const tableState = atom<Table | undefined>({
   key: `tableState-${new Date()}`,
   default: undefined,
});

export { toolModeState, tableState };
