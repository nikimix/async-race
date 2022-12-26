import { ICarControlHandlers } from '../../../types/types';
import obseravable from '../../../utils/obseravable';
import Control from '../../common/control';

export default class CarControl extends Control {
  private selectBtn: Control | null = null;

  private removeBtn: Control | null = null;

  constructor(parrentNode: HTMLElement, private handlers: ICarControlHandlers) {
    super(parrentNode, { tagName: 'div', className: 'car-control-container' });
    this.render();
    this.subscribe();
  }

  render = () => {
    this.children = [
      (this.selectBtn = new Control(this.element, { tagName: 'button', className: 'btn-select', content: 'Select' })),
      (this.removeBtn = new Control(this.element, { tagName: 'button', className: 'btn-remove', content: 'Remove' })),
    ];
    this.selectBtn?.getElement().addEventListener('click', this.handlers.onSelectClick);
    this.removeBtn?.getElement().addEventListener('click', this.handlers.onRemoveClick);
  };

  subscribe = () => {
    obseravable.add('start-race', this.disableSelectBtn);
    obseravable.add('start-race', this.disableRemoveBtn);
    obseravable.add('race-stopped', this.activeRemoveBtn);
    obseravable.add('race-stopped', this.activeSelectBtn);
  };

  disableSelectBtn = () => {
    this.selectBtn?.getElement().setAttribute('disabled', '');
  };

  disableRemoveBtn = () => {
    this.removeBtn?.getElement().setAttribute('disabled', '');
  };

  activeSelectBtn = () => {
    this.selectBtn?.getElement().removeAttribute('disabled');
  };

  activeRemoveBtn = () => {
    this.removeBtn?.getElement().removeAttribute('disabled');
  };

  destroy = () => {
    this.selectBtn?.getElement().removeEventListener('click', this.handlers.onSelectClick);
    this.removeBtn?.getElement().removeEventListener('click', this.handlers.onRemoveClick);
    super.destroy();
  };
}
