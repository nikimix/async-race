type ElementParams = {
  tagName: keyof HTMLElementTagNameMap;
  className?: string;
  content?: string;
  attribute?: { name: string; value: string } | { name: string; value: string }[];
  value?: string;
};

export default class Control<E extends HTMLElement = HTMLElement> {
  protected element: E;

  protected children: Control[] = [];

  constructor(parentNode: HTMLElement, elementParams: ElementParams, position: InsertPosition = 'beforeend') {
    const { tagName, className, content, attribute, value } = elementParams;
    const el = <E>document.createElement(tagName);
    if (className) {
      el.className = className;
    }
    if (content) {
      el.textContent = content;
    }
    if (Array.isArray(attribute)) {
      attribute.forEach((attr) => el.setAttribute(attr.name, attr.value));
    } else if (attribute) {
      el.setAttribute(attribute.name, attribute.value);
    }
    if (parentNode) {
      parentNode.insertAdjacentElement(position, el);
    }
    if (value && el instanceof HTMLInputElement) {
      el.value = `${value}`;
    }
    this.element = el;
  }

  getElement() {
    return this.element;
  }

  destroy(): void {
    this.children.forEach((ctrl) => ctrl.destroy());
    this.element.remove();
  }
}
