import { CardProps } from '../components/Card/Card';
import { CardListProps } from '../components/CardList/CardList';
import { ICard } from '../types/card-type';
import { PAGE, PAGE_SIZE } from '../utils/constants';

export const cardTestProps: CardProps = {
  id: '1',
  image: 'https://images.pokemontcg.io/hgss4/1.png',
  name: 'Aggron',
  currentPage: PAGE,
  currentPageSize: PAGE_SIZE,
};

export const cardListTestProps: CardListProps = {
  currentPage: PAGE,
  currentPageSize: PAGE_SIZE,
  onPageChange: () => {},
  onPageSizeChange: () => {},
};

export const testCardsData: ICard[] = [
  {
    id: '1',
    name: 'Aargon',
    images: {
      small: 'https://images.pokemontcg.io/hgss4/1.png',
      large: 'https://images.pokemontcg.io/hgss4/1.png',
    },
  },
];
