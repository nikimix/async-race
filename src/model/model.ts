import Api from '../api/api';
import { ICarData, ICarState, IWinnerData, IWinnersTableData, SortOrder, SortType } from '../types/types';
import obseravable from '../utils/obseravable';

export default class Model {
  private updatedCar: ICarData | null = null;

  private winnerName = '';

  private selectedCar = 0;

  private currentGaragePage = 1;

  private currentWinnersPage = 1;

  private hasWinner = false;

  private winnersTableData: IWinnersTableData[] | null = null;

  private carsData: ICarData[] = [];

  isRace = false;

  private api: Api;

  constructor() {
    this.api = new Api();
  }

  getWinnersPageData = async (page = this.currentWinnersPage, sort: SortType = 'wins', order: SortOrder = 'ASC') => {
    const data = await this.api.getWinnersData(page, sort, order);
    this.winnersTableData = await this.generateDataForWinnerTable(data.winnersData);
    return {
      currentPage: this.currentWinnersPage,
      winnersTableData: this.winnersTableData,
      totalWinners: data.totalWinners,
    };
  };

  getGarageData = async () => {
    const data = await this.api.getGarageData(this.currentGaragePage);
    this.carsData = data.carsData;
    return { currentPage: this.currentGaragePage, carsData: data.carsData, totalCars: data.totalCars };
  };

  generateDataForWinnerTable = async (winnersData: IWinnerData[]) => {
    const cars = await this.api.getAllCars();
    return winnersData.reduce((acc: IWinnersTableData[], winner) => {
      const car = cars.find((carData) => carData.id === winner.id);
      if (car) {
        const winnerDataForTable = { time: winner.time, wins: winner.wins, name: car.name, color: car.color };
        acc.push(winnerDataForTable);
      }
      return acc;
    }, []);
  };

  setSelectedCar = (id: number) => {
    this.selectedCar = id;
    obseravable.emit('select-car');
  };

  removeCar = async (id: number) => {
    await this.api.deleteCar(id);
    this.removeWinner(id);
    obseravable.emit('remove-car');
  };

  removeWinner = async (id: number) => {
    const winner = (await this.api.getAllWinners()).find((e) => e.id === id);
    if (winner) {
      await this.api.deleteWinner(id);
    }
  };

  createCar = async (data: ICarState) => {
    const newCar = await this.api.createCar(data);
    this.carsData.push(newCar);
    obseravable.emit('create-car');
  };

  updateCar = async (data: ICarState) => {
    if (this.selectedCar) {
      this.updatedCar = await this.api.updateCar(this.selectedCar, data);
      obseravable.emit('update-car');
    }
  };

  getUpdatedCar = () => {
    if (this.updatedCar) {
      return this.updatedCar;
    }
    throw new Error();
  };

  getTimeForCar = async (id: number) => {
    const duration = await this.api.switchEngine(id, 'started');
    return duration;
  };

  getTimeForRace = async () => {
    const durations = await Promise.all(this.carsData.map((e) => this.getTimeForCar(e.id)));
    return durations;
  };

  getStatusEngine = async (id: number) => {
    const engineStatus = await this.api.switchDriveMode(id, 'drive');
    return engineStatus;
  };

  getStopStatus = async (id: number) => {
    const status = await this.api.switchEngine(id, 'stopped');
    return status;
  };

  createWinner = async (data: { id: number; carName: string; time: number }) => {
    if (this.hasWinner) {
      return;
    }
    this.hasWinner = true;
    this.winnerName = data.carName;
    const winner = (await this.api.getAllWinners()).find((e) => e.id === data.id);
    if (winner) {
      if (winner.time > data.time) {
        this.updateWinner({ id: data.id, time: data.time, wins: winner.wins + 1 });
      } else {
        this.updateWinner({ id: data.id, time: winner.time, wins: winner.wins + 1 });
      }
    } else {
      await this.api.createWinner({ id: data.id, time: data.time, wins: 1 });
    }
    obseravable.emit('create-winner');
  };

  updateWinner = async (data: IWinnerData) => {
    await this.api.updateWinner(data);
    obseravable.emit('update-winner');
  };

  getWinnerName = () => this.winnerName;

  setCurrentGaragePage = (value: number) => {
    this.currentGaragePage = value;
  };

  setCurrentWinnersPage = (value: number) => {
    this.currentWinnersPage = value;
  };

  switchRaceFlag = () => {
    this.isRace = !this.isRace;
    if (this.isRace) {
      this.hasWinner = false;
      obseravable.emit('start-race');
    } else {
      obseravable.emit('stop-race');
    }
  };

  generateCars = async (data: ICarState[]) => {
    Promise.all(data.map((e) => this.api.createCar(e))).then(() => obseravable.emit('generate-cars'));
  };
}
