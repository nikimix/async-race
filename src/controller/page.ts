import Model from '../model/model';
import Page from '../view/page';
import GaragePageController from './garage/garage-page';
import WinnersPageController from './winners/winners-page';
import { Pages } from '../types/types';

export default class PageController {
  private currentPage: Pages = 'garage';

  private pageContainer?: HTMLElement;

  private garage?: GaragePageController;

  private winners?: WinnersPageController;

  constructor(private parrentNode: HTMLElement, private model: Model) {}

  render = async () => {
    this.pageContainer = new Page(this.parrentNode, this.goToPage).getElement();
    this.garage = new GaragePageController(this.pageContainer, this.model);
    this.winners = new WinnersPageController(this.pageContainer, this.model);
    await this.winners.render();
    this.winners.destroy();
  };

  renderPage = (page: Pages) => {
    this.winners?.destroy();
    this.garage?.destroy();
    if (page === 'garage' && this.pageContainer) {
      this.garage?.update();
      this.currentPage = 'garage';
    } else if (this.pageContainer) {
      this.winners?.update();
      this.currentPage = 'winners';
    }
  };

  goToPage = (page: Pages) => {
    if (page === 'garage') {
      this.renderPage('garage');
    } else {
      this.renderPage('winners');
    }
  };
}
