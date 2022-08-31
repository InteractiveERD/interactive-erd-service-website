import { SIDE_WINDOW_WIDTH } from 'constants/view.const';
import { Table } from 'interfaces/network/table.interfaces';
import { ArrowLineType, DiagramToolMode, DiagramToolType } from 'interfaces/view/diagram.interface';
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

const arrowLinesState = atom<ArrowLineType[]>({
   key: `arrowLinesState-${new Date()}`,
   default: [],
});

const sideWindowWidthState = atom<number>({
   key: `sideWindowWidthState-${new Date()}`,
   default: SIDE_WINDOW_WIDTH,
});

export { toolModeState, tableState, arrowLinesState, sideWindowWidthState };
