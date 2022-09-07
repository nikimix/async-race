export type CarEventTypes = 'start' | 'stop' | 'remove' | 'select' | 'win';

export type EngineStatus = 'started' | 'stopped' | 'drive';

export type GarageManagerEventTypes = 'create' | 'update' | 'start' | 'stop' | 'generate';

export interface IWinnerData {
  id: number;
  wins: number;
  time: number;
}

export interface ICarData {
  id: number;
  name: string;
  color: string;
}

export interface IWinnersTableData {
  wins: number;
  time: number;
  name: string;
  color: string;
}

export interface IGarageData {
  carsData: ICarData[];
  totalCars: number;
}

export interface IEngineControlHandlers {
  onStartClick: () => void;
  onStopClick: () => void;
}

export interface ICarControlHandlers {
  onSelectClick: () => void;
  onRemoveClick: () => void;
}

export interface ICarHandlers {
  onRemoveClick: () => void;
  onSelectClick: () => void;
  onStartClick: () => void;
  onFinishCar: (time: number, carName: string) => void;
  onStopClick: () => void;
}

export interface ICarBuilderHandlers {
  onCreateClick: (state: ICarState) => void;
}

export interface ICarUpdaterHandlers {
  onUpdateClick: (state: ICarState) => void;
}

export interface ICarState {
  name: string;
  color: string;
}

export interface IRaceControlHandlers {
  onStartClick: () => void;
  onStopClick: () => void;
}

export interface IPageHandlers {
  onNextPage: () => void;
  onPrevPage: () => void;
}

export interface IWinnersPageHandlers extends IPageHandlers {
  onSortByWins: () => void;
  onSortByTime: () => void;
}

export interface IPaginationHandlers {
  onPrevClick: () => void;
  onNextClick: () => void;
}

export interface IGarageProps {
  totalCars: number;
  currentPage: number;
}
export interface IWinnersProps {
  totalWinners: number;
  currentPage: number;
  tableData: IWinnersTableData[];
  flagWinsOrder: SortOrder;
  flagTimeOrder: SortOrder;
}

export interface IGarageControlHanlers extends IRaceControlHandlers, ICarUpdaterHandlers, ICarBuilderHandlers {
  onGenerateClick: () => void;
}
export interface IWinnersTableHandlers {
  onWinsClick: () => void;
  onBestTimeClick: () => void;
}
export type Pages = 'garage' | 'winners';

export type EmitTypes =
  | 'update-car'
  | 'create-car'
  | 'create-winner'
  | 'update-winner'
  | 'select-car'
  | 'start-race'
  | 'stop-race'
  | 'generate-cars'
  | 'remove-car'
  | 'race-starting'
  | 'race-stopped';

export type SortType = 'id' | 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';
