import Model from '../../model/model';
import { ICarData } from '../../types/types';
import obseravable from '../../utils/obseravable';
import { onVictory } from '../../view/common/messages';
import Garage from '../../view/garage/garage';
import CarController from './car';

export default class GarageController {
  private garage: Garage | null = null;

  private cars: Map<number, CarController> = new Map();

  private currentPage = 0;

  constructor(private parrentNode: HTMLElement, private model: Model) {
    this.render();
    this.subscribe();
  }

  private subscribe = () => {
    obseravable.add('start-race', this.startRace);
    obseravable.add('stop-race', this.stopRace);
    obseravable.add('generate-cars', this.render);
    obseravable.add('remove-car', this.render);
    obseravable.add('create-car', this.createCar);
    obseravable.add('update-car', this.updateCar);
    obseravable.add('create-winner', this.showWinner);
  };

  private render = async () => {
    const data = await this.model.getGarageData();
    this.currentPage = data.currentPage;
    this.destroy();
    this.garage = new Garage(
      this.parrentNode,
      { currentPage: data.currentPage, totalCars: data.totalCars },
      { onNextPage: this.onNextPage, onPrevPage: this.onPrevPage },
    );
    this.renderCars(data.carsData);
  };

  update = () => {
    this.render();
  };

  private renderCars = (carsData: ICarData[]) => {
    const container = this.garage?.getGarageList();
    if (container) {
      carsData.forEach((carData) => this.cars.set(carData.id, new CarController(container, carData, this.model)));
    } else {
      throw new Error();
    }
  };

  private createCar = () => {
    this.render();
  };

  private onNextPage = () => {
    this.model.setCurrentGaragePage(this.currentPage + 1);
    this.render();
  };

  private onPrevPage = () => {
    this.model.setCurrentGaragePage(this.currentPage - 1);
    this.render();
  };

  private startRace = async () => {
    const durations = await this.model.getTimeForRace();
    obseravable.emit('race-starting');
    let counter = 0;
    this.cars.forEach((car) => {
      car.startCar(durations[counter]);
      counter += 1;
    });
  };

  private stopRace = async () => {
    Promise.all(Array.from(this.cars.values()).map((e) => e.stopCar())).then(() => obseravable.emit('race-stopped'));
  };

  private showWinner = () => {
    const winnerName = this.model.getWinnerName();
    onVictory(winnerName);
  };

  private updateCar = () => {
    const data = this.model.getUpdatedCar();
    this.cars.get(data.id)?.update(data.name, data.color);
  };

  destroy = () => {
    this.cars.forEach((e) => e.destroy());
    this.cars.clear();
    this.garage?.destroy();
  };
}
