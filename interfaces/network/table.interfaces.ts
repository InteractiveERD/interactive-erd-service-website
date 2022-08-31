import { RelationType } from "interfaces/view/diagram.interface";

export interface Table {
   id: number;
   name: string;
   alias: string;
   tuples: TableTuple[];
   color?: string;
   positionX: number;
   positionY: number;
   isDraggable: boolean;
}

export interface TableTuple {
   id?: number;
   idx? : number;
   name: string;
   dataType: string;
   refs? : TupleRef[] | TupleRef | undefined;
}

export interface TupleRef {
   dstTable: string;
   dstTuple: string;
   selfRelationType : RelationType;
   dstRelationType : RelationType;
}
