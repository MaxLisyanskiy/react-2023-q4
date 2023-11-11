import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { BrowserRouter } from 'react-router-dom';
import App from '../App/App';

describe('Tests for the Pagination component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });

  it('Renders Pagination component correctly', async () => {
    await waitFor(() => {
      const pagination = screen.getByTestId('pagination');
      console.log(pagination);
      expect(pagination).toBeInTheDocument();
    });
  });

  it('Updates URL query parameter when page changes', async () => {
    await waitFor(() => {
      const paginationBtn = screen.getByTestId('paginationNextBtn');
      fireEvent.click(paginationBtn);
    });

    await waitFor(() => {
      expect(location.href).toContain('page=2');
      expect(location.href).not.toContain('page=1');
    });
  });
});
