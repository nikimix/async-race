import { ICarBuilderHandlers } from '../../../types/types';
import { onEmptyFields } from '../../common/messages';
import obseravable from '../../../utils/obseravable';
import Control from '../../common/control';

export default class CarBuilder extends Control {
  private updateBtn: Control | null = null;

  private inputCarName: Control | null = null;

  private inputCarColor: Control | null = null;

  private state = { name: '', color: '#000' };

  constructor(parrentNode: HTMLElement, private handlers: ICarBuilderHandlers) {
    super(parrentNode, { tagName: 'div', className: 'car-updater' });
    this.setLocalState();
    this.render();
    this.subscribe();
  }

  private render = () => {
    this.children = [
      (this.inputCarName = new Control(this.element, {
        tagName: 'input',
        className: 'input-car-name input',
        attribute: { name: 'type', value: 'text' },
        value: `${this.state.name}`,
      })),
      (this.inputCarColor = new Control(this.element, {
        tagName: 'input',
        className: 'input-car-color input',
        attribute: { name: 'type', value: 'color' },
        value: `${this.state.color}`,
      })),
      (this.updateBtn = new Control(this.element, {
        tagName: 'button',
        className: 'btn-create',
        content: 'Create',
      })),
    ];

    this.updateBtn.getElement().addEventListener('click', this.onCreateClick);
    this.inputCarName.getElement().addEventListener('change', this.onChangeName);
    this.inputCarColor.getElement().addEventListener('change', this.onChangeColor);
  };

  private subscribe = () => {
    obseravable.add('create-car', this.update);
    obseravable.add('start-race', this.disableBuilder);
    obseravable.add('race-stopped', this.activeBuilder);
  };

  private activeBuilder = () => {
    this.children.forEach((e) => e.getElement().removeAttribute('disabled'));
  };

  private disableBuilder = () => {
    this.children.forEach((e) => e.getElement().setAttribute('disabled', ''));
  };

  private onChangeColor = (evt: Event) => {
    const { target } = evt;
    if (target instanceof HTMLInputElement) {
      this.state.color = target.value;
      this.updateLocalState();
    }
  };

  private onChangeName = (evt: Event) => {
    const { target } = evt;
    if (target instanceof HTMLInputElement) {
      this.state.name = target.value;
      this.updateLocalState();
    }
  };

  private onCreateClick = () => {
    if (this.state.name) {
      this.handlers.onCreateClick(this.state);
    } else {
      onEmptyFields();
    }
  };

  private setLocalState = () => {
    const state = localStorage.getItem('builder-state');
    if (state) {
      this.state = JSON.parse(state);
    }
  };

  private updateLocalState = () => {
    localStorage.setItem('builder-state', JSON.stringify(this.state));
  };

  private update = () => {
    localStorage.removeItem('builder-state');
    this.state = { name: '', color: '#000' };
    this.children.forEach((e) => e.destroy());
    this.render();
  };

  destroy = () => {
    this.updateBtn?.getElement().removeEventListener('click', this.onCreateClick);
    this.inputCarName?.getElement().removeEventListener('change', this.onChangeName);
    this.inputCarColor?.getElement().removeEventListener('change', this.onChangeColor);
    super.destroy();
  };
}
