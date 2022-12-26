import PageController from './controller/page';
import Model from './model/model';

export default class App {
  constructor(private root: HTMLElement) {}

  init = () => {
    const model = new Model();
    new PageController(this.root, model).render();
  };
}
