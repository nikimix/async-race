import { IPaginationHandlers } from '../../types/types';
import obseravable from '../../utils/obseravable';
import Control from './control';

export default class Pagination extends Control {
  private prevBtn: Control | null = null;

  private nextBtn: Control | null = null;

  constructor(parrentNode: HTMLElement, private handlers: IPaginationHandlers) {
    super(parrentNode, { tagName: 'div', className: 'pagination-container' });
    this.render();
    this.subscribe();
  }

  render = () => {
    this.children = [
      (this.prevBtn = new Control(this.element, {
        tagName: 'button',
        className: 'btn-prev',
        content: 'prev',
        attribute: { name: 'disabled', value: '' },
      })),
      (this.nextBtn = new Control(this.element, { tagName: 'button', className: 'btn-next', content: 'next' })),
    ];
    this.prevBtn.getElement().addEventListener('click', this.handlers.onPrevClick);
    this.nextBtn.getElement().addEventListener('click', this.handlers.onNextClick);
  };

  subscribe = () => {
    obseravable.add('start-race', this.disableNextBtn);
    obseravable.add('start-race', this.disablePrevBtn);
    obseravable.add('race-stopped', this.activeNextBtn);
    obseravable.add('race-stopped', this.activePrevBtn);
  };

  activePrevBtn = () => {
    this.prevBtn?.getElement().removeAttribute('disabled');
  };

  disablePrevBtn = () => {
    this.prevBtn?.getElement().setAttribute('disabled', '');
  };

  activeNextBtn = () => {
    this.nextBtn?.getElement().removeAttribute('disabled');
  };

  disableNextBtn = () => {
    this.nextBtn?.getElement().setAttribute('disabled', '');
  };

  destroy = () => {
    this.prevBtn?.getElement().removeEventListener('click', this.handlers.onPrevClick);
    this.nextBtn?.getElement().removeEventListener('click', this.handlers.onNextClick);
    super.destroy();
  };
}
