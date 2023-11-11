import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { generateComponent, testCardsData } from '../../test/mock/cardListMock';

describe('Tests for the Card List component', () => {
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
