import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { detailedCardItemProps } from '../../test/mock/detailedCardMock';
import DetailedCard from './DetailedCard';
import DetailedCardItem from './DetailedCardItem';

describe('Tests for the Detailed Card component', () => {
  beforeEach(() => {
    global.fetch = vi.fn() as typeof global.fetch;
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Render a loading indicator is displayed while fetching data', () => {
    (fetch as Mock).mockResolvedValue({ json: () => Promise.resolve({}) });
    render(
      <BrowserRouter>
        <DetailedCard />
      </BrowserRouter>,
    );
    const loader = screen.getByTestId('loader');
    expect(loader).not.toBe(null);
  });

  it('Render a detailed card component correctly displays the detailed card data', async () => {
    render(
      <BrowserRouter>
        <DetailedCardItem character={detailedCardItemProps} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      const cardImg = screen.getByTestId('detailedCardImg');
      const cardName = screen.getByTestId('detailedCardName');
      const cardDescr = screen.getByTestId('detailedCardDescr');

      expect(cardImg).toBeInTheDocument();
      expect(cardName).toBeInTheDocument();
      expect(cardDescr).toBeInTheDocument();
    });
  });
});
