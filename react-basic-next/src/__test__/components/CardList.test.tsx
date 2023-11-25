import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GSSPTestProps } from '../mocksData';
import CardList from '@/components/CardList/CardList';

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
});

describe('Tests for the Card List component', () => {
  it('Renders the specified number of cards', async () => {
    render(<CardList data={GSSPTestProps.cards.items} />);

    const caracters: HTMLUListElement = screen.getByTestId(/caracters/i);
    expect(caracters.childNodes.length).toEqual(5);
  });

  it('Renders the empty section', async () => {
    render(<CardList data={[]} />);

    const cardListEmpty = screen.getByTestId(/cardListEmpty/i);
    expect(cardListEmpty).toBeInTheDocument();
  });
});
