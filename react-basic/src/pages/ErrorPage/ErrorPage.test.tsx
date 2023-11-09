import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

describe('Renders error-page correctly', async () => {
  const router = createMemoryRouter([{ path: '/', element: <ErrorPage /> }], {
    initialEntries: ['/'],
  });

  it('Should render the Error page correctly', async () => {
    render(<RouterProvider router={router} />);
    const heading = await screen.queryByText('Oops!');
    expect(heading).not.toBeNull();
  });

  it('Should render 404 Page correctly', async () => {
    render(<RouterProvider router={router} />);
    const profileList = screen.getByTestId('errorMessage');
    expect(profileList).toBeInTheDocument();
  });
});
