import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { cardTestProps } from '../../test/mock/cardMock';
import userEvent from '@testing-library/user-event';
import Card from './Card';

describe('Tests for the Card component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Renders the relevant card data', () => {
    render(
      <BrowserRouter>
        <Card {...cardTestProps} />
      </BrowserRouter>,
    );
    expect(screen.getByText('Aggron')).toBeInTheDocument();
  });

  it('Opens a detailed card component and Calls API when clicking on a card', async () => {
    render(
      <BrowserRouter>
        <Card {...cardTestProps} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      const user = userEvent.setup();

      const card = screen.getByTestId('cardItem');
      user.click(card);
    });

    await waitFor(() => {
      expect(location.href).toContain('hgss4-1');
    });
  });
});
