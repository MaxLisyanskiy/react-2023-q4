import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DetailedCardItemTestProps } from '../mocksData';
import DetailedCardItem from '@/components/DetailedCard/DetailedCardItem';

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
});

describe('Tests for the DetailedCardItem component', () => {
  it('Render a detailed card component correctly displays the detailed card data', () => {
    render(<DetailedCardItem character={DetailedCardItemTestProps} />);
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Pokémon')).toBeInTheDocument();
    expect(screen.getByText('Common')).toBeInTheDocument();
  });
});
