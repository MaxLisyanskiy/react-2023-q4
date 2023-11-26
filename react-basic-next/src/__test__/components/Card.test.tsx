import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CardTestProps } from '../mocksData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../createMockRouter';
import Card from '@/components/Card/Card';

describe('Tests for the Card component', () => {
  it('Renders the relevant card data', () => {
    vi.mock('next/router', () => require('next-router-mock'));

    render(<Card {...CardTestProps} />);
    expect(screen.getByText('Aggron')).toBeInTheDocument();
  });

  it('Opens a detailed card component', async () => {
    const router = createMockRouter({
      pathname: '/',
      query: { page: '1', pageSize: '10' },
    });

    render(
      <RouterContext.Provider value={router}>
        <Card {...CardTestProps} />
      </RouterContext.Provider>,
    );
    expect(screen.getByText('Aggron')).toBeInTheDocument();

    const card: HTMLAnchorElement = screen.getByRole('link');

    expect(card.href).toContain('hgss4-1');

    fireEvent.click(card);

    expect(router.push).toBeCalled();
  });
});
