import { IEngineControlHandlers } from '../../../types/types';
import Control from '../../common/control';

export default class EngineControl extends Control {
  private startBtn: Control | null = null;

  private stopBtn: Control | null = null;

  constructor(parrentNode: HTMLElement, private handlers: IEngineControlHandlers) {
    super(parrentNode, { tagName: 'div', className: 'car-control-container' });
    this.render();
  }

  render = () => {
    this.children = [
      (this.startBtn = new Control(this.element, { tagName: 'button', className: 'btn-start-car', content: 'Start' })),
      (this.stopBtn = new Control(this.element, {
        tagName: 'button',
        className: 'btn-stop-car',
        content: 'Stop',
        attribute: { name: 'disabled', value: '' },
      })),
    ];

    this.startBtn.getElement().addEventListener('click', this.handlers.onStartClick);
    this.stopBtn.getElement().addEventListener('click', this.handlers.onStopClick);
  };

  disableStartBtn = () => {
    this.startBtn?.getElement().setAttribute('disabled', '');
  };

  disableStopBtn = () => {
    this.stopBtn?.getElement().setAttribute('disabled', '');
  };

  activeStopBtn = () => {
    this.stopBtn?.getElement().removeAttribute('disabled');
  };

  activeStartBtn = () => {
    this.startBtn?.getElement().removeAttribute('disabled');
  };

  destroy = () => {
    this.startBtn?.getElement().removeEventListener('click', this.handlers.onStartClick);
    this.stopBtn?.getElement().removeEventListener('click', this.handlers.onStopClick);
    super.destroy();
  };
}
