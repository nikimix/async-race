import { Pages } from '../types/types';
import obseravable from '../utils/obseravable';
import Control from './common/control';

export default class Page extends Control {
  private btnWinners: Control | null = null;

  private btnGarage: Control | null = null;

  constructor(parrentNode: HTMLElement, private handler: (page: Pages) => void) {
    super(parrentNode, { tagName: 'div', className: 'page' });
    this.render();
    this.subscribe();
  }

  private render = () => {
    const nav = new Control(this.element, { tagName: 'div', className: 'nav' }).getElement();
    this.btnGarage = new Control(nav, { tagName: 'button', className: 'btn-to-garage', content: 'Garage' });
    this.btnWinners = new Control(nav, { tagName: 'button', className: 'btn-to-winners', content: 'Winners' });

    this.btnGarage.getElement().addEventListener('click', this.onGarageClick);
    this.btnWinners.getElement().addEventListener('click', this.onWinnersClick);
  };

  subscribe = () => {
    obseravable.add('start-race', this.disableBtnWinners);
    obseravable.add('race-stopped', this.activeBtnWinners);
    obseravable.add('start-race', this.disableBtnGarage);
    obseravable.add('race-stopped', this.activeBtnGarage);
  };

  disableBtnWinners = () => {
    this.btnWinners?.getElement().setAttribute('disabled', '');
  };

  activeBtnWinners = () => {
    this.btnWinners?.getElement().removeAttribute('disabled');
  };

  disableBtnGarage = () => {
    this.btnGarage?.getElement().setAttribute('disabled', '');
  };

  activeBtnGarage = () => {
    this.btnGarage?.getElement().removeAttribute('disabled');
  };

  onGarageClick = () => {
    this.handler('garage');
  };

  onWinnersClick = () => {
    this.handler('winners');
  };
}
