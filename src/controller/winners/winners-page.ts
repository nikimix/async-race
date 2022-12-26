import Model from '../../model/model';
import { SortOrder, SortType } from '../../types/types';
import Winners from '../../view/winners/winners';

export default class WinnersPageController {
  private winners: Winners | null = null;

  private currentPage = 0;

  private totalWinners = 0;

  private flagWinsOrder: SortOrder = 'ASC';

  private flagTimeOrder: SortOrder = 'ASC';

  constructor(private parrentNode: HTMLElement, private model: Model) {}

  render = async (page = this.currentPage, type: SortType = 'time', oder: SortOrder = 'ASC') => {
    const data = await this.model.getWinnersPageData(page, type, oder);
    this.winners?.destroy();
    this.currentPage = data.currentPage;
    this.totalWinners = data.totalWinners;

    this.winners = new Winners(
      this.parrentNode,
      {
        currentPage: data.currentPage,
        totalWinners: data.totalWinners,
        tableData: data.winnersTableData,
        flagTimeOrder: this.flagTimeOrder,
        flagWinsOrder: this.flagWinsOrder,
      },
      {
        onNextPage: this.onNextPage,
        onPrevPage: this.onPrevPage,
        onSortByTime: this.onSortByTime,
        onSortByWins: this.onSortByWins,
      },
    );
  };

  update = () => {
    this.render();
  };

  private onNextPage = () => {
    this.model.setCurrentWinnersPage(this.currentPage + 1);
    this.render();
  };

  private onPrevPage = () => {
    this.model.setCurrentWinnersPage(this.currentPage - 1);
    this.render();
  };

  onSortByWins = async () => {
    this.render(this.currentPage, 'wins', this.flagWinsOrder);
    if (this.flagWinsOrder === 'DESC') {
      this.flagWinsOrder = 'ASC';
    } else {
      this.flagWinsOrder = 'DESC';
    }
  };

  onSortByTime = () => {
    this.render(this.currentPage, 'time', this.flagTimeOrder);
    if (this.flagTimeOrder === 'DESC') {
      this.flagTimeOrder = 'ASC';
    } else {
      this.flagTimeOrder = 'DESC';
    }
  };

  destroy = () => {
    this.winners?.destroy();
  };
}
