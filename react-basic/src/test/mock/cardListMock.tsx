import { BrowserRouter } from 'react-router-dom';
import { ICard } from '../../types/card-type';
import { PAGE, PAGE_SIZE } from '../../utils/constants';
import CardList, { CardListProps } from '../../components/CardList/CardList';

export const cardListTestProps: CardListProps = {
  currentPage: PAGE,
  currentPageSize: PAGE_SIZE,
  onPageChange: () => {},
  onPageSizeChange: () => {},
};

export function generateComponent(): JSX.Element {
  return (
    <BrowserRouter>
      <CardList {...cardListTestProps} />
    </BrowserRouter>
  );
}

export const testOneCardDataMock: ICard[] = [
  {
    id: 'hgss4-1',
    name: 'Aargon',
    images: {
      small: 'https://images.pokemontcg.io/hgss4/1.png',
      large: 'https://images.pokemontcg.io/hgss4/1.png',
    },
  },
];

export const testFiveCardDataMock: ICard[] = [
  {
    id: 'hgss4-1',
    name: 'Aggron',
    images: {
      small: 'https://images.pokemontcg.io/hgss4/1.png',
      large: 'https://images.pokemontcg.io/hgss4/1_hires.png',
    },
  },
  {
    id: 'xy5-1',
    name: 'Weedle',
    images: {
      small: 'https://images.pokemontcg.io/xy5/1.png',
      large: 'https://images.pokemontcg.io/xy5/1_hires.png',
    },
  },
  {
    id: 'pl1-1',
    name: 'Ampharos',
    images: {
      small: 'https://images.pokemontcg.io/pl1/1.png',
      large: 'https://images.pokemontcg.io/pl1/1_hires.png',
    },
  },
  {
    id: 'dp3-1',
    name: 'Ampharos',
    images: {
      small: 'https://images.pokemontcg.io/dp3/1.png',
      large: 'https://images.pokemontcg.io/dp3/1_hires.png',
    },
  },
  {
    id: 'det1-1',
    name: 'Bulbasaur',
    images: {
      small: 'https://images.pokemontcg.io/det1/1.png',
      large: 'https://images.pokemontcg.io/det1/1_hires.png',
    },
  },
];
