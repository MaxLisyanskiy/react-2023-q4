import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import DetailedPage from '@/pages';
import { GSSPTestProps } from '../mocksData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../createMockRouter';

describe('Tests for the Detailed Page component', async () => {
  it('Render Detailed Page correctly', async () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({
          pathname: '/det1-1',
          query: { page: '1', pageSize: '10', detailed: 'det1-1' },
        })}
      >
        <DetailedPage data={GSSPTestProps} />
      </RouterContext.Provider>,
    );

    expect(screen.getByTestId('detailedCard')).toBeInTheDocument();
    expect(
      screen.getByText(
        'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
      ),
    ).toBeInTheDocument();
  });
});
