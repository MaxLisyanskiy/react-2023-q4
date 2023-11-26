import { describe, it, expect, beforeAll, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import mockRouter from 'next-router-mock';
import NotFoundPage from '@/pages/404';

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
});

describe('Tests for the 404 Page component', async () => {
  it('Render 404 Page correctly', async () => {
    render(<NotFoundPage />);

    const notFoundTitle = await screen.findByTestId('notFoundTitle');
    expect(notFoundTitle).toBeDefined();
    expect(notFoundTitle.innerHTML).toEqual('Oops! 404');
  });

  it('Mocks the useRouter hook and back to main page', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(mockRouter.asPath).toEqual('/?page=1&pageSize=10');
  });
});
