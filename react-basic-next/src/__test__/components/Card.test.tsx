import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '@/components/Card/Card';
import { CardTestProps } from '../mocksData';

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
});

describe('Tests for the Card component', () => {
  it('Renders the relevant card data', () => {
    render(<Card {...CardTestProps} />);
    expect(screen.getByText('Aggron')).toBeInTheDocument();
  });

  //   it('Opens a detailed card component and Calls API when clicking on a card', async () => {
  //     renderWithProviders(
  //       <BrowserRouter>
  //         <Card {...cardTestProps} />
  //       </BrowserRouter>,
  //     );

  //     const card = await screen.findByTestId('cardItem');
  //     if (card) fireEvent.click(card);

  //     expect(location.href).toContain('hgss4-1');
  //   });
});
