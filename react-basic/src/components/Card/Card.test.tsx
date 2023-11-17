import { describe, it, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { cardTestProps } from '../../test/mock/cardMock';
import Card from './Card';
import { renderWithProviders } from '../../test/testUtils';

describe('Tests for the Card component', () => {
  it('Renders the relevant card data', () => {
    renderWithProviders(
      <BrowserRouter>
        <Card {...cardTestProps} />
      </BrowserRouter>,
    );
    expect(screen.getByText('Aggron')).toBeInTheDocument();
  });

  it('Opens a detailed card component and Calls API when clicking on a card', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Card {...cardTestProps} />
      </BrowserRouter>,
    );

    const card = await screen.findByTestId('cardItem');
    if (card) fireEvent.click(card);

    expect(location.href).toContain('hgss4-1');
  });
});
