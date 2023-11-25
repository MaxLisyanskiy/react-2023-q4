import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import HomePage from '@/pages';
import { GSSPTestProps } from '../mocksData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../createMockRouter';

describe('Tests for the Home Page component', async () => {
  it('Render Home Page correctly', async () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { page: '1', pageSize: '10' } })}
      >
        <HomePage data={GSSPTestProps} />
      </RouterContext.Provider>,
    );

    expect(screen.getByText('Welcome to the Pokémon Home')).toBeInTheDocument();
    expect(screen.getByTestId('caracters')).toBeInTheDocument();
  });
});
