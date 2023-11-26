import Search from '@/components/Search/Search';
import { screen, fireEvent, render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { describe, expect, it } from 'vitest';
import { createMockRouter } from '../createMockRouter';

describe('Tests for the Search component', () => {
  it('Render input with search query', async () => {
    const router = createMockRouter({ query: { search: 'testValue' } });

    render(
      <RouterContext.Provider value={router}>
        <Search />
      </RouterContext.Provider>,
    );

    const searchInput: HTMLElement = screen.getByTestId('searchInput');
    expect(searchInput).toHaveValue('testValue');
  });

  it('Saves the entered value in state', async () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Search />
      </RouterContext.Provider>,
    );

    const searchInput: HTMLElement = screen.getByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput).toHaveValue('test');
  });

  it('Mocks the useRouter hook and saves the value in query', async () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Search />
      </RouterContext.Provider>,
    );

    const searchInput: HTMLElement = screen.getByTestId('searchInput');
    const searchBtn: HTMLElement = screen.getByTestId('searchBtn');

    fireEvent.change(searchInput, { target: { value: 'testSearchQuery' } });
    fireEvent.click(searchBtn);

    expect(router.push).toBeCalledWith({
      query: { page: 1, pageSize: 10, search: 'testSearchQuery' },
    });
  });
});
