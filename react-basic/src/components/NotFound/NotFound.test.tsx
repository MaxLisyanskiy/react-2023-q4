import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorPage from './NotFound';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

describe('Tests for the 404 Page component', async () => {
  const router = createMemoryRouter([{ path: '/', element: <ErrorPage /> }], {
    initialEntries: ['/'],
  });

  it('Show 404 page when navigating to an invalid route', async () => {
    render(<RouterProvider router={router} />);
    const profileList = screen.getByTestId('errorMessage');
    expect(profileList).toBeInTheDocument();
  });
});
