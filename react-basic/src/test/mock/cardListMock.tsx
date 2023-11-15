// import { BrowserRouter } from 'react-router-dom';
// import { CardsContext } from '../../context/cards-context';
// import { SearchContext } from '../../context/search-context';
// import { ICard } from '../../types/card-type';
// import { PAGE, PAGE_SIZE } from '../../utils/constants';
// import CardList, { CardListProps } from '../../components/CardList/CardList';

// export const testCardsData: ICard[] = [
//   {
//     id: '1',
//     name: 'Aargon',
//     images: {
//       small: 'https://images.pokemontcg.io/hgss4/1.png',
//       large: 'https://images.pokemontcg.io/hgss4/1.png',
//     },
//   },
// ];

// export const cardListTestProps: CardListProps = {
//   currentPage: PAGE,
//   currentPageSize: PAGE_SIZE,
//   onPageChange: () => {},
//   onPageSizeChange: () => {},
// };

// export function generateComponent(cards: ICard[] | []): JSX.Element {
//   return (
//     <BrowserRouter>
//       <CardList {...cardListTestProps} />
//     </BrowserRouter>
//   );
// }
