export interface Table {
  id: number;
  name: string;
  alias : string;
  tuples: TableTuple[];
  positionX : number;
  positionY : number;
}

export interface TableTuple {
  idx?: number;
  name: string;
  dataType: string;
}
