import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('Renders App correctly', async () => {
  it('Should render the component correctly', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const h1 = await screen.queryByText('Welcome to the Pokémon Home');

    expect(h1).not.toBeNull();
  });
});
