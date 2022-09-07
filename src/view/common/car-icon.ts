import Control from './control';

export default class CarIcon extends Control {
  private icon: SVGSVGElement;

  constructor(parrentNode: HTMLElement, private props: { width: number; color: string }) {
    super(parrentNode, { tagName: 'div', className: 'car-icon' });
    this.element.style.display = 'flex';
    this.icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.icon.setAttribute('viewBox', '0 0 1290 545');
    this.icon.setAttribute('preserveAspectRatio', 'xMinYMax');
    this.icon.style.fill = props.color;
    this.icon.style.width = `${props.width}`;
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '../../../assets/img/car.svg#car');
    this.icon.append(use);
    this.element.append(this.icon);
  }

  update = (color: string) => {
    this.icon.style.fill = color;
  };
}
