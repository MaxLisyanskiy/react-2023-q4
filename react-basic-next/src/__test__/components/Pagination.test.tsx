import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../createMockRouter';
import Pagination from '@/components/Pagination/Pagination';

describe('Tests for the Pagination component', () => {
  it('Updates URL query parameter when page changes', async () => {
    const router = createMockRouter({ query: { page: '1', pageSize: '10' } });

    render(
      <RouterContext.Provider value={router}>
        <Pagination page={1} pageSize={10} totalCount={100} />
      </RouterContext.Provider>,
    );

    const paginationNextBtn = screen.getByTestId(/paginationNextBtn/i);
    if (paginationNextBtn) fireEvent.click(paginationNextBtn);

    expect(router.push).toBeCalledWith({
      query: { page: 2, pageSize: '10' },
    });
  });
});
