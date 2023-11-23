import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { renderWithProviders } from '../../test/testUtils';

describe('Renders App correctly', () => {
  it('Should render the component correctly', async () => {
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const h1 = screen.queryByText('Welcome to the Pokémon Home');
    expect(h1).not.toBeNull();
  });
});
