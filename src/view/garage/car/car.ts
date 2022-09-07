import Control from '../../common/control';
import CarControl from './car-control';
import CarIcon from '../../common/car-icon';
import EngineControl from './engine-control';
import { ICarData, ICarHandlers } from '../../../types/types';

export default class Car extends Control {
  private engineControl: EngineControl | null = null;

  private carIcon: CarIcon | null = null;

  private animationId: number | null = null;

  private carName: Control | null = null;

  constructor(parrentNode: HTMLElement, private props: ICarData, private handlers: ICarHandlers) {
    super(parrentNode, { tagName: 'div', className: 'car' });
    this.render();
  }

  render = () => {
    this.children = [
      (this.carName = new Control(this.element, {
        tagName: 'p',
        className: 'car-name',
        content: `${this.props.name}`,
      })),
      new CarControl(this.element, {
        onSelectClick: this.handlers.onSelectClick,
        onRemoveClick: this.handlers.onRemoveClick,
      }),
      (this.engineControl = new EngineControl(this.element, {
        onStartClick: this.handlers.onStartClick,
        onStopClick: this.handlers.onStopClick,
      })),
      (this.carIcon = new CarIcon(this.element, { width: 100, color: `${this.props.color}` })),
      new Control(this.element, { tagName: 'div', className: 'road' }),
    ];
  };

  start = (duration: number) => {
    const { endPoint, oneOffset, car } = this.calculateAnimationData(duration);
    let currentPoint = car.offsetLeft;
    this.engineControl?.disableStartBtn();
    this.engineControl?.activeStopBtn();

    const run = () => {
      currentPoint += oneOffset;
      car.style.transform = `translateX(${currentPoint}px)`;
      if (currentPoint < endPoint) {
        this.animationId = requestAnimationFrame(run);
      } else {
        const carName = this.carName?.getElement().textContent;
        if (carName) {
          this.handlers.onFinishCar(duration, carName);
        } else {
          throw new Error();
        }
      }
    };
    run();
  };

  break = () => {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  };

  stop = () => {
    const carIcon = this.carIcon?.getElement();
    this.engineControl?.activeStartBtn();
    this.engineControl?.disableStopBtn();
    if (carIcon && this.animationId) {
      cancelAnimationFrame(this.animationId);
      carIcon.style.transform = `translateX(0%)`;
    }
  };

  calculateAnimationData = (duration: number) => {
    const car = this.carIcon?.getElement();
    if (car) {
      const endPoint = car.offsetWidth - 100;
      const currentPoint = car.offsetLeft;
      const frameCount = (duration / 1000) * 144;
      const oneOffset = (endPoint - currentPoint) / frameCount;
      return { endPoint, oneOffset, car };
    }
    throw new Error();
  };

  update = (name: string, color: string) => {
    const carName = this.carName?.getElement();
    if (carName) {
      carName.textContent = name;
    }
    this.carIcon?.update(color);
  };
}
