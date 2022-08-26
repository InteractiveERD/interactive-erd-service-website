export interface Table {
  id: number;
  name: string;
  alias : string;
  tuples: TableTuple[];
  color? : string;
  positionX : number;
  positionY : number;
  isDraggable :boolean;
}

export interface TableTuple {
  idx?: number;
  name: string;
  dataType: string;
}
