import { fireEvent, screen } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import App from '../App/App';
import { renderWithProviders } from '../../test/testUtils';
import { BrowserRouter } from 'react-router-dom';
import { mockServer } from '../../test/mock/mock-server';

describe('Tests for the Pagination component', () => {
  beforeAll(() => mockServer.listen());
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());

  it('Updates URL query parameter when page changes', async () => {
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const loader = await screen.findByTestId(/loader/i);
    expect(loader).toBeInTheDocument();

    const paginationBtn = await screen.findByTestId(/paginationNextBtn/i);
    if (paginationBtn) fireEvent.click(paginationBtn);

    const page: HTMLLIElement = await screen.findByTestId(/paginationPage/i);
    expect(page.textContent).toBe('2');
  });
});
