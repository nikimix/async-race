import { IRaceControlHandlers } from '../../../types/types';
import obseravable from '../../../utils/obseravable';
import Control from '../../common/control';

export default class RaceControl extends Control {
  private startBtn: Control | null = null;

  private stopBtn: Control | null = null;

  constructor(parrentNode: HTMLElement, private handlers: IRaceControlHandlers) {
    super(parrentNode, { tagName: 'div', className: 'race-control' });
    this.render();
    this.subscribe();
  }

  private render = () => {
    this.children = [
      (this.startBtn = new Control(this.element, {
        tagName: 'button',
        className: 'btn-start-race',
        content: 'Start race',
      })),
      (this.stopBtn = new Control(this.element, {
        tagName: 'button',
        className: 'btn-stop-race',
        content: 'Stop race',
        attribute: { name: 'disabled', value: '' },
      })),
    ];
    this.startBtn.getElement().addEventListener('click', this.handlers.onStartClick);
    this.stopBtn.getElement().addEventListener('click', this.handlers.onStopClick);
  };

  private activeStartBtn = () => {
    this.startBtn?.getElement().removeAttribute('disabled');
  };

  private disableStartBtn = () => {
    this.startBtn?.getElement().setAttribute('disabled', '');
  };

  private activeStopBtn = () => {
    this.stopBtn?.getElement().removeAttribute('disabled');
  };

  private disableStopBtn = () => {
    this.stopBtn?.getElement().setAttribute('disabled', '');
  };

  private subscribe = () => {
    obseravable.add('start-race', this.disableStartBtn);
    obseravable.add('race-starting', this.activeStopBtn);

    obseravable.add('race-stopped', this.activeStartBtn);
    obseravable.add('race-stopped', this.disableStopBtn);
  };

  destroy = () => {
    this.startBtn?.getElement().removeEventListener('click', this.handlers.onStartClick);
    this.stopBtn?.getElement().removeEventListener('click', this.handlers.onStopClick);
    super.destroy();
  };
}
