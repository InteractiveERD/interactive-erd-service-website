import { Table } from 'interfaces/network/table.interfaces';
import { ArrowLine, DiagramToolMode, DiagramToolType } from 'interfaces/view/diagram.interface';
import { atom, selector } from 'recoil';

export const DiagramTools: DiagramToolMode[] = [
   {
      type: DiagramToolType.EDIT,
      name: 'edit',
   },
   {
      type: DiagramToolType.DRAG,
      name: 'drag',
   },
   {
      type: DiagramToolType.COMMENT,
      name: 'comment',
   },
];

const toolModeState = atom<DiagramToolMode>({
   key: `toolModeState-${new Date()}`,
   default: DiagramTools[1],
});

const tableState = atom<Table | undefined>({
   key: `tableState-${new Date()}`,
   default: undefined,
});

const arrowLinesState = atom<ArrowLine[]>({
   key: `arrowLinesState-${new Date()}`,
   default: [],
});

export { toolModeState, tableState, arrowLinesState };
