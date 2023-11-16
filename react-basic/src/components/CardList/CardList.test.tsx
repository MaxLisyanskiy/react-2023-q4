import { describe, it, expect, afterEach, beforeAll, afterAll } from 'vitest';
import { screen } from '@testing-library/react';
import { mockServer } from '../../test/mock/mock-server';
import { renderWithProviders } from '../../test/testUtils';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from '../../store/store';
import { pageSlice } from '../../store/reducers/PageSlice';
import CardList from './CardList';
import {
  generateComponent,
  testFiveCardDataMock,
} from '../../test/mock/cardListMock';

describe('Tests for the Card List component', () => {
  beforeAll(() => mockServer.listen());
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());

  it('Renders the specified number of cards', async () => {
    const cardListTestProps = {
      currentPage: 1,
      currentPageSize: 1,
      onPageChange: () => {},
      onPageSizeChange: () => {},
    };

    renderWithProviders(
      <BrowserRouter>
        <CardList {...cardListTestProps} />
      </BrowserRouter>,
    );

    const loader = await screen.findByTestId(/loader/i);
    expect(loader).toBeInTheDocument();

    const caracters: HTMLUListElement = await screen.findByTestId(/caracters/i);
    expect(caracters.childNodes.length).toEqual(1);
  });

  it('Saves the required amount items per page in store', async () => {
    const store = setupStore();
    const { changeItems } = pageSlice.actions;

    renderWithProviders(generateComponent(), { store });

    expect(store.getState().pageReducer.items.length).toEqual(0);

    await screen.findByTestId(/loader/i);

    await store.dispatch(changeItems(testFiveCardDataMock));

    expect(store.getState().pageReducer.items.length).toEqual(5);
  });
});
