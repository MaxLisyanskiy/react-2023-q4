import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { cardListTestProps, testCardsData } from '../../test/mockDataForTest';
import { CardsContext } from '../../context/cards-context';
import CardList from './CardList';
import { SearchContext } from '../../context/search-context';
import { ICard } from '../../types/card-type';

describe('Renders CardList correctly', () => {
  function generateComponent(cards: ICard[] | []): JSX.Element {
    return (
      <BrowserRouter>
        <SearchContext.Provider value={{ search: '', changeSearch: () => {} }}>
          <CardsContext.Provider value={{ cards, setCards: () => {} }}>
            <CardList {...cardListTestProps} />
          </CardsContext.Provider>
        </SearchContext.Provider>
      </BrowserRouter>
    );
  }

  it('Renders the specified number of cards', async () => {
    render(generateComponent(testCardsData));

    await waitFor(async () => {
      const cardItems = await screen.findAllByTestId('cardItem');
      expect(cardItems.length).toBe(1);
    });
  });

  it('Renders an appropriate message if no cards are present', async () => {
    render(generateComponent([]));

    await waitFor(async () => {
      const cardItems = await screen.findByTestId('cardsNotFound');
      expect(cardItems).toBeInTheDocument();
    });
  });
});
