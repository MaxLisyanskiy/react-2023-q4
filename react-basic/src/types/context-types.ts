import { ICard } from './card-type';

export type ProviderProps = {
  children: string | JSX.Element | JSX.Element[];
};

export type SearchContextType = {
  search: string;
  changeSearch: (search: string) => void;
};

export type CardsContextType = {
  cards: ICard[] | [];
  setCards: (cards: ICard[] | []) => void;
};
