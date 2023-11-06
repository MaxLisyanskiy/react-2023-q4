import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Tests
describe('Renders main page correctly', async () => {
  it('Should render the page correctly', async () => {
    // Setup
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const h1 = await screen.queryByText('Welcome to the Pokémon Home');

    // Expectations
    expect(h1).not.toBeNull();
  });
});
