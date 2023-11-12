import { ICardsResponse, IDetailedCardResponse } from '../types/card-type';
import {
  API_URL,
  API_CARD_SELECT,
  API_DETAILED_CARD_SELECT,
} from '../utils/constants';

export const getAllCards = async (
  page: number,
  pageSize: number,
  searchQuery: string,
): Promise<ICardsResponse> => {
  const url =
    searchQuery.trim() !== ''
      ? `${API_URL}?q=name:${searchQuery}&page=${page}&pageSize=${pageSize}&${API_CARD_SELECT}`
      : `${API_URL}?page=${page}&pageSize=${pageSize}&${API_CARD_SELECT}`;

  const response = await fetch(url);

  if (response.ok) {
    const responseCards: ICardsResponse = await response.json();
    return responseCards;
  }

  const responseError: Error = await response.json();
  throw new Error(responseError.message);
};

export const getDetailedCard = async (
  id: string,
): Promise<IDetailedCardResponse> => {
  const url = `${API_URL}/${id}?${API_DETAILED_CARD_SELECT}`;

  const response = await fetch(url);

  if (response.ok) {
    const responseCard: IDetailedCardResponse = await response.json();
    return responseCard;
  }

  const responseError: Error = await response.json();
  throw new Error(responseError.message);
};
