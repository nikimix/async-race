import { ICarUpdaterHandlers } from '../../../types/types';
import { onEmptyFields } from '../../common/messages';
import obseravable from '../../../utils/obseravable';
import Control from '../../common/control';

export default class CarUpdater extends Control {
  private updateBtn: Control | null = null;

  private inputCarName: Control | null = null;

  private inputCarColor: Control | null = null;

  private state = { name: '', color: '#000' };

  constructor(parrentNode: HTMLElement, private handlers: ICarUpdaterHandlers) {
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
        attribute: [
          { name: 'type', value: 'text' },
          { name: 'disabled', value: '' },
        ],
        value: `${this.state.name}`,
      })),
      (this.inputCarColor = new Control(this.element, {
        tagName: 'input',
        className: 'input-car-color input',
        attribute: [
          { name: 'type', value: 'color' },
          { name: 'disabled', value: '' },
        ],
        value: `${this.state.color}`,
      })),
      (this.updateBtn = new Control(this.element, {
        tagName: 'button',
        className: 'btn-update',
        content: 'Update',
        attribute: { name: 'disabled', value: '' },
      })),
    ];

    this.updateBtn.getElement().addEventListener('click', this.onUpdateClick);
    this.inputCarName.getElement().addEventListener('change', this.onChangeName);
    this.inputCarColor.getElement().addEventListener('change', this.onChangeColor);
  };

  private subscribe = () => {
    obseravable.add('update-car', this.update);
    obseravable.add('select-car', this.activeUpdater);
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

  private onUpdateClick = () => {
    if (this.state.name) {
      this.handlers.onUpdateClick(this.state);
    } else {
      onEmptyFields();
    }
  };

  private activeUpdater = () => {
    this.children.forEach((e) => e.getElement().removeAttribute('disabled'));
  };

  private setLocalState = () => {
    const state = localStorage.getItem('updater-state');
    if (state) {
      this.state = JSON.parse(state);
    }
  };

  private updateLocalState = () => {
    localStorage.setItem('updater-state', JSON.stringify(this.state));
  };

  private update = () => {
    localStorage.removeItem('updater-state');
    this.state = { name: '', color: '#000' };
    this.children.forEach((e) => e.destroy());
    this.render();
  };

  destroy = () => {
    this.updateBtn?.getElement().removeEventListener('click', this.onUpdateClick);
    this.inputCarName?.getElement().removeEventListener('change', this.onChangeName);
    this.inputCarColor?.getElement().removeEventListener('change', this.onChangeColor);
    super.destroy();
  };
}
