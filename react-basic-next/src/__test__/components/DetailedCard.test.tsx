import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../createMockRouter';
import { GSSPTestProps } from '../mocksData';
import DetailedPage from '@/pages/[detailed]';
import DetailedCard from '@/components/DetailedCard/DetailedCard';

describe('Tests for the Detailed Card component', () => {
  const router = createMockRouter({
    pathname: '/det1-1',
    query: { page: '1', pageSize: '10', detailed: 'det1-1' },
  });

  it('Render a detailed card component correctly displays the detailed card data', async () => {
    render(
      <RouterContext.Provider value={router}>
        <DetailedCard data={GSSPTestProps.detailed} />
      </RouterContext.Provider>,
    );

    const detailedCard = screen.getByTestId('detailedCard');
    expect(detailedCard).toBeInTheDocument();

    const cardImg = screen.getByTestId(/detailedCardImg/i);
    const cardName = screen.getByTestId(/detailedCardName/i);
    const cardDescr = screen.getByTestId(/detailedCardDescr/i);

    expect(cardImg).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
    expect(cardDescr).toBeInTheDocument();
  });

  it('Renders the empty section', async () => {
    render(
      <RouterContext.Provider value={router}>
        <DetailedCard data={null} />
      </RouterContext.Provider>,
    );

    const cardListEmpty = screen.getByTestId(/detailedCardEmpty/i);
    expect(cardListEmpty).toBeInTheDocument();
  });

  it('Hides the component when clicking at the close button', async () => {
    render(
      <RouterContext.Provider value={router}>
        <DetailedPage data={GSSPTestProps} />
      </RouterContext.Provider>,
    );

    const detailedCloseBtn = screen.getByTestId(/closeDetailedBtn/i);

    fireEvent.click(detailedCloseBtn);

    expect(router.push).toBeCalledWith({
      pathname: '/',
      query: { page: '1', pageSize: '10' },
    });
  });
});
