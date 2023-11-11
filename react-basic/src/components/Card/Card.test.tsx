import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { cardTestProps } from '../../test/mock/cardMock';
import Card from './Card';

describe('Tests for the Card component', () => {
  it('Renders the relevant card data', () => {
    render(
      <BrowserRouter>
        <Card {...cardTestProps} />
      </BrowserRouter>,
    );
    expect(screen.getByText('Aggron')).toBeInTheDocument();
  });
});
