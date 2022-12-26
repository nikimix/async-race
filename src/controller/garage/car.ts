import Model from '../../model/model';
import Car from '../../view/garage/car/car';
import { ICarData } from '../../types/types';
import obseravable from '../../utils/obseravable';

export default class CarController {
  private car: Car | null = null;

  private id: number;

  constructor(private parrentNode: HTMLElement, private props: ICarData, private model: Model) {
    this.id = props.id;
    this.render();
  }

  private render = () => {
    this.car = new Car(this.parrentNode, this.props, {
      onSelectClick: this.onSelectCar,
      onFinishCar: this.onFinishCar,
      onRemoveClick: this.onRemoveCar,
      onStartClick: this.onStartCar,
      onStopClick: this.onStopCar,
    });
  };

  onStartCar = () => {
    this.startCar();
  };

  private onStopCar = async () => {
    this.stopCar();
  };

  startCar = async (time?: number) => {
    if (!time) {
      const duration = await this.model.getTimeForCar(this.id);
      this.car?.start(duration);
    } else {
      this.car?.start(time);
    }
    const isBroken = await this.model.getStatusEngine(this.id);
    if (!isBroken) {
      this.car?.break();
    }
  };

  stopCar = async () => {
    const isStop = await this.model.getStopStatus(this.id);
    if (isStop) {
      this.car?.stop();
    }
    return isStop;
  };

  private onRemoveCar = () => {
    this.model.removeCar(this.id);
  };

  private onSelectCar = () => {
    this.model.setSelectedCar(this.id);
  };

  update = (name: string, color: string) => {
    if (this.car) {
      this.car.update(name, color);
    } else {
      throw new Error();
    }
  };

  private onFinishCar = (time: number, carName: string) => {
    if (this.model.isRace) {
      const seconds = +(time / 1000).toFixed(2);
      this.model.createWinner({ id: this.id, carName, time: seconds });
    }
  };

  destroy = () => {
    this.car?.destroy();
  };

  subscribe = () => {
    obseravable.add('stop-race', this.onStopCar);
  };
}
