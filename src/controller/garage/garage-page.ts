import Model from '../../model/model';
import GarageController from './garage';
import GarageControlController from './garage-control';

export default class GaragePageController {
  private garageControl: GarageControlController | null = null;

  private garage: GarageController | null = null;

  constructor(private parrentNode: HTMLElement, private model: Model) {
    this.render();
  }

  private render = () => {
    this.garageControl = new GarageControlController(this.parrentNode, this.model);
    this.garage = new GarageController(this.parrentNode, this.model);
  };

  update = () => {
    this.garageControl?.update();
    this.garage?.update();
  };

  destroy = () => {
    this?.garageControl?.destroy();
    this?.garage?.destroy();
  };
}
