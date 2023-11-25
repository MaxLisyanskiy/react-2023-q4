import { describe, it, expect, vi, beforeAll } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import ErrorBtn from '@/components/Error/ErrorBtn';

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
});

describe('Tests for the Error components', async () => {
  it('Render the ErrorBtn', async () => {
    render(
      <ErrorBoundary>
        <ErrorBtn />
      </ErrorBoundary>,
    );

    const errorBtn = await screen.findByTestId(/errorBtn/i);
    expect(errorBtn).toBeInTheDocument();

    console.error = vi.fn();

    fireEvent.click(errorBtn);

    expect(console.error).toHaveBeenCalled();
  });
});
