import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Card from './Card';
import { cardTestProps } from '../../test/mockDataForTest';

describe('Renders Card correctly', () => {
  it('Should render the component correctly', () => {
    render(
      <BrowserRouter>
        <Card {...cardTestProps} />
      </BrowserRouter>,
    );
    expect(screen.getByText('Aggron')).toBeInTheDocument();
  });
});
