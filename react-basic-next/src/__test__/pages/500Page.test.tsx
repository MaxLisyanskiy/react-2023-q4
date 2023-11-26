import { describe, it, expect, beforeAll, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import mockRouter from 'next-router-mock';
import ErrorPage500 from '@/components/Error/ErrorPage500';

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
});

describe('Tests for the 500 Page component', async () => {
  it('Render 500 Page correctly', async () => {
    render(<ErrorPage500 />);

    const notFoundTitle = await screen.findByTestId('500Title');
    expect(notFoundTitle).toBeDefined();
    expect(notFoundTitle.innerHTML).toEqual('Oops! 500');
  });

  it('Mocks the useRouter hook and back to main page', () => {
    render(<ErrorPage500 />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(mockRouter.asPath).toEqual('/?page=1&pageSize=10');
  });
});
