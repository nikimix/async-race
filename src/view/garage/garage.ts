import { IGarageProps, IPageHandlers } from '../../types/types';
import Control from '../common/control';
import Pagination from '../common/pagination';

export default class Garage extends Control {
  private garageList: Control | null = null;

  private pagination: Pagination | null = null;

  private totalCars: Control | null = null;

  constructor(parrentNode: HTMLElement, private props: IGarageProps, private handlers: IPageHandlers) {
    super(parrentNode, { tagName: 'div', className: 'garage' });
    this.render();
  }

  render = () => {
    this.children = [
      (this.totalCars = new Control(this.element, {
        tagName: 'p',
        className: 'total-cars',
        content: `GARAGE (${this.props.totalCars})`,
      })),
      new Control(this.element, {
        tagName: 'p',
        className: 'page-number',
        content: `PAGE #${this.props.currentPage}`,
      }),
      (this.garageList = new Control(this.element, { tagName: 'div', className: 'garage-list' })),
      (this.pagination = new Pagination(this.element, {
        onNextClick: this.handlers.onNextPage,
        onPrevClick: this.handlers.onPrevPage,
      })),
    ];
    this.setPaginationState();
  };

  private setPaginationState = () => {
    const { totalCars, currentPage } = this.props;
    if (!(currentPage * 7 < totalCars)) {
      this.pagination?.disableNextBtn();
    } else {
      this.pagination?.activeNextBtn();
    }
    if (currentPage === 1) {
      this.pagination?.disablePrevBtn();
    } else {
      this.pagination?.activePrevBtn();
    }
  };

  getGarageList = () => {
    return this.garageList?.getElement();
  };
}
