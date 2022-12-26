import { EngineStatus, ICarData, ICarState, IGarageData, IWinnerData, SortOrder, SortType } from '../types/types';

export default class Api {
  private baseUrl = 'http://127.0.0.1:3000';

  getGarageData = async (page: number): Promise<IGarageData> => {
    const response = await fetch(`${this.baseUrl}/garage/?_page=${page}&_limit=7`, {
      method: 'GET',
    });
    if (response.ok) {
      const carsData: ICarData[] = await response.json();
      const totalCars = Number(response.headers.get('X-Total-Count'));
      return { carsData, totalCars };
    }
    throw new Error();
  };

  getAllCars = async (): Promise<ICarData[]> => {
    const response = await fetch(`${this.baseUrl}/garage`, {
      method: 'GET',
    });
    if (response.ok) {
      const carsData: ICarData[] = await response.json();
      return carsData;
    }
    throw new Error();
  };

  getWinnersData = async (page: number, sort: SortType, order: SortOrder) => {
    const response = await fetch(`${this.baseUrl}/winners/?_page=${page}&_limit=10&_sort=${sort}&_order=${order}`, {
      method: 'GET',
    });
    if (response.ok) {
      const winnersData = await response.json();
      const totalWinners = Number(response.headers.get('X-Total-Count'));
      return { winnersData, totalWinners };
    }
    throw new Error();
  };

  getAllWinners = async (): Promise<IWinnerData[]> => {
    const response = await fetch(`${this.baseUrl}/winners`, {
      method: 'GET',
    });
    if (response.ok) {
      const winnersData = await response.json();
      return winnersData;
    }
    throw new Error();
  };

  // getCar = async (id: number) => {
  //   const response = await fetch(`${this.baseUrl}/garage/?id=${id}`, {
  //     method: 'GET',
  //   });
  //   // const body = await response.json();
  // };

  createCar = async (carParams: ICarState): Promise<ICarData> => {
    const response = await fetch(`${this.baseUrl}/garage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carParams),
    });
    const body: ICarData = await response.json();
    return body;
  };

  deleteCar = async (id: number) => {
    await fetch(`${this.baseUrl}/garage/${id}`, {
      method: 'DELETE',
    });
  };

  updateCar = async (id: number, carParams: ICarState): Promise<ICarData> => {
    const response = await fetch(`${this.baseUrl}/garage/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carParams),
    });
    const body = await response.json();
    return body;
  };

  switchEngine = async (id: number, status: EngineStatus): Promise<number> => {
    const response = await fetch(`${this.baseUrl}/engine/?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    if (response.ok) {
      const params: { velocity: number; distance: number } = await response.json();
      const time = params.distance / params.velocity;
      return time;
    }
    throw new Error();
  };

  switchDriveMode = async (id: number, status: EngineStatus) => {
    const response = await fetch(`${this.baseUrl}/engine/?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    if (response.ok) {
      return response.ok;
    }
    throw new Error();
  };

  createWinner = async (data: IWinnerData): Promise<IWinnerData> => {
    const response = await fetch(`${this.baseUrl}/winners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const body = await response.json();
      return body;
    }
    throw new Error();
  };

  deleteWinner = async (id: number) => {
    const response = await fetch(`${this.baseUrl}/winners/${id}`, {
      method: 'DELETE',
    });
    const body = await response.json();
    return body;
  };

  updateWinner = async (data: IWinnerData): Promise<IWinnerData> => {
    const response = await fetch(`${this.baseUrl}/winners/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wins: data.wins, time: data.time }),
    });
    if (response.ok) {
      const body = await response.json();
      return body;
    }
    throw new Error();
  };

  getWinner = async (id: number): Promise<IWinnerData | false> => {
    try {
      const response = await fetch(`${this.baseUrl}/winners/${id}`, {
        method: 'GET',
      });
      if (response.ok) {
        const body = await response.json();
        return body;
      }
      throw new Error();
    } catch {
      return false;
    }
  };
}
