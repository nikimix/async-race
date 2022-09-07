import { IGarageControlHanlers } from '../../../types/types';
import Control from '../../common/control';
import CarBuilder from './car-builder';
import CarUpdater from './car-updater';
import RaceControl from './race-control';
import obseravable from '../../../utils/obseravable';

export default class GarageControl extends Control {
  private btnGenerateCars: Control | null = null;

  constructor(parrentNode: HTMLElement, private handlers: IGarageControlHanlers) {
    super(parrentNode, { tagName: 'div', className: 'garage-control' });
    this.render();
    this.subscribe();
  }

  render = () => {
    this.children = [
      new CarBuilder(this.element, {
        onCreateClick: this.handlers.onCreateClick,
      }),
      new CarUpdater(this.element, {
        onUpdateClick: this.handlers.onUpdateClick,
      }),
      new RaceControl(this.element, {
        onStartClick: this.handlers.onStartClick,
        onStopClick: this.handlers.onStopClick,
      }),
      (this.btnGenerateCars = new Control(this.element, {
        tagName: 'button',
        className: 'btn-generate-cars',
        content: 'Generate cars',
      })),
    ];

    this.btnGenerateCars.getElement().addEventListener('click', this.handlers.onGenerateClick);
  };

  subscribe = () => {
    obseravable.add('start-race', this.disableBtnGenerata);
    obseravable.add('race-stopped', this.activeBtnGenerata);
  };

  disableBtnGenerata = () => {
    this.btnGenerateCars?.getElement().setAttribute('disabled', '');
  };

  activeBtnGenerata = () => {
    this.btnGenerateCars?.getElement().removeAttribute('disabled');
  };

  destroy = () => {
    this.btnGenerateCars?.getElement().removeEventListener('click', this.handlers.onGenerateClick);
    super.destroy();
  };
}
