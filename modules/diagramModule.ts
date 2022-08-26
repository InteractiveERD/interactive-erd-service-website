import { atom, selector } from 'recoil';

export enum DiagramTool {
   EDIT,
   DRAG,
   COMMENT,
}

const toolModeState = atom<DiagramTool>({
   key: `toolModeState-${new Date()}`,
   default: DiagramTool.DRAG,
});

export { toolModeState };
