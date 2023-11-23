import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import DetailedCard from './DetailedCard';
import { mockServer } from '../../test/mock/mock-server';
import { renderWithProviders } from '../../test/testUtils';
import App from '../App/App';

describe('Tests for the Detailed Card component', () => {
  beforeAll(() => mockServer.listen());
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());

  it('Render a loading indicator is displayed while fetching data', () => {
    renderWithProviders(
      <BrowserRouter>
        <DetailedCard />
      </BrowserRouter>,
    );
    const loader = screen.getByTestId(/loader/i);
    expect(loader).toBeInTheDocument();
  });

  it('Render a detailed card component correctly displays the detailed card data', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              path="/react-2023-q4/react-basic/:id"
              element={<DetailedCard />}
            />
          </Route>
        </Routes>
      </BrowserRouter>,
    );

    const loader = await screen.findByTestId(/loader/i);
    expect(loader).toBeInTheDocument();

    const cardItem = await screen.findByTestId(/cardItem/i);

    fireEvent.click(cardItem);

    const detailedCard = await screen.findByTestId(/detailedCard/i);
    expect(detailedCard).toBeInTheDocument();

    const cardImg = await screen.findByTestId(/detailedCardImg/i);
    const cardName = await screen.findByTestId(/detailedCardName/i);
    const cardDescr = await screen.findByTestId(/detailedCardDescr/i);

    expect(cardImg).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
    expect(cardDescr).toBeInTheDocument();
  });

  it('Hides the component when clicking at the close button', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              path="/react-2023-q4/react-basic/:id"
              element={<DetailedCard />}
            />
          </Route>
        </Routes>
      </BrowserRouter>,
    );

    const detailedCloseBtn = await screen.findByTestId(/closeDetailedBtn/i);

    fireEvent.click(detailedCloseBtn);

    await waitFor(() => {
      const descriptionElement = screen.queryByTestId(/detailedCard/i);
      expect(descriptionElement).toBeNull();
    });
  });
});
