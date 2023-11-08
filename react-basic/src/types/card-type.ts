export interface ICard {
  id: string;
  name: string;
  images: { small: string; large: string };
}

export interface IDetailedCard extends ICard {
  supertype: string;
  hp: string;
  rarity: string;
  flavorText: string;
}

export interface ICardsResponse {
  data: ICard[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}
