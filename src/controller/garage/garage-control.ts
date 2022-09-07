import Model from '../../model/model';
import { ICarState } from '../../types/types';
import generateCarsData from '../../utils/generateCarsData';
import GarageControl from '../../view/garage/garage-control/garage-cotrol';

export default class GarageControlController {
  private garageControl: GarageControl | null = null;

  constructor(private parrentNode: HTMLElement, private model: Model) {
    this.render();
  }

  private render = () => {
    this.garageControl = new GarageControl(this.parrentNode, {
      onCreateClick: this.onCreateCar,
      onGenerateClick: this.onGenerateCars,
      onStartClick: this.onStartRace,
      onStopClick: this.onStopRace,
      onUpdateClick: this.onUpdateCar,
    });
  };

  update = () => {
    this.render();
  };

  private onCreateCar = (state: ICarState) => {
    this.model.createCar(state);
  };

  private onUpdateCar = (state: ICarState) => {
    this.model.updateCar(state);
  };

  private onStartRace = () => {
    this.model.switchRaceFlag();
  };

  private onStopRace = () => {
    this.model.switchRaceFlag();
  };

  private onGenerateCars = () => {
    const data: ICarState[] = generateCarsData();
    this.model.generateCars(data);
  };

  destroy = () => {
    this.garageControl?.destroy();
  };
}
