import { IWinnersPageHandlers, IWinnersProps, IWinnersTableData } from '../../types/types';
import CarIcon from '../common/car-icon';
import Control from '../common/control';
import Pagination from '../common/pagination';

export default class Winners extends Control {
  private pagination: Pagination | null = null;

  private winnersTable: Control | null = null;

  constructor(parrentNode: HTMLElement, private props: IWinnersProps, private handlers: IWinnersPageHandlers) {
    super(parrentNode, { tagName: 'div', className: 'winners' });
    this.render();
  }

  render = () => {
    this.children = [
      new Control(this.element, {
        tagName: 'p',
        className: 'total-winners',
        content: `WINNERS (${this.props.totalWinners})`,
      }),
      new Control(this.element, {
        tagName: 'p',
        className: 'page-number page-number--winners',
        content: `PAGE #${this.props.currentPage}`,
      }),
      (this.winnersTable = new Control(this.element, { tagName: 'table', className: 'wiiners-table' })),
      (this.pagination = new Pagination(this.element, {
        onNextClick: this.handlers.onNextPage,
        onPrevClick: this.handlers.onPrevPage,
      })),
    ];
    this.addTableContent();
    this.setPaginationState();
  };

  setPaginationState = () => {
    const { totalWinners, currentPage } = this.props;
    if (!(currentPage * 7 < totalWinners)) {
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

  addTableContent = () => {
    const table = this.winnersTable?.getElement();
    if (table) {
      this.addTableHeader(table);
      this.addWinners(table, this.props.tableData);
    }
  };

  addTableHeader = (parrentNode: HTMLElement) => {
    const tr = new Control(parrentNode, { tagName: 'tr', className: 'table-title' }).getElement();
    new Control(tr, { tagName: 'th', content: 'Number' });
    new Control(tr, { tagName: 'th', content: 'Car' });
    new Control(tr, { tagName: 'th', content: 'Name' });
    const wins = new Control(tr, { tagName: 'th' }).getElement();
    const bestTime = new Control(tr, { tagName: 'th' }).getElement();
    const bntWins = new Control(wins, {
      tagName: 'button',
      className: `btn-sort-wins btn-sort-wins--${this.props.flagWinsOrder.toLowerCase()}`,
      content: 'Wins',
    }).getElement();
    const btnBestTime = new Control(bestTime, {
      tagName: 'button',
      className: `btn-sort-time btn-sort-time--${this.props.flagTimeOrder.toLowerCase()}`,
      content: 'Best time',
    }).getElement();
    this.setTableHandlers(bntWins, btnBestTime);
  };

  setTableHandlers = (btnWins: HTMLElement, btnBestTime: HTMLElement) => {
    btnWins.addEventListener('click', this.handlers.onSortByWins);
    btnBestTime.addEventListener('click', this.handlers.onSortByTime);
  };

  addWinners(parrentNode: HTMLElement, data: IWinnersTableData[]) {
    data.forEach((e, i) => {
      const tr = new Control(parrentNode, { tagName: 'tr' }).getElement();
      new Control(tr, { tagName: 'td', content: `${i + 1}` });
      const tdIcon = new Control(tr, { tagName: 'td' }).getElement();
      new CarIcon(tdIcon, { width: 60, color: e.color });
      new Control(tr, { tagName: 'td', content: `${e.name}` });
      new Control(tr, { tagName: 'td', content: `${e.wins}` });
      new Control(tr, { tagName: 'td', content: `${e.time}` });
    });
  };
}
