import { screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { searchSlice } from '../../store/reducers/SearchSlice';
import { setupStore } from '../../store/store';
import { renderWithProviders } from '../../test/testUtils';
import Search from './Search';

describe('Tests for the Search component', () => {
  it('Saves the entered value to the local storage', async () => {
    renderWithProviders(<Search onChangeSearch={() => {}} />);

    const searchInput: HTMLElement = screen.getByTestId('searchInput');
    const searchBtn: HTMLElement = screen.getByTestId('searchBtn');

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchBtn);

    const ls = localStorage.getItem('rss_react_basic');

    expect(ls).toBe('test');
  });

  it('Saves value and display it when calls dispatch', async () => {
    const store = setupStore();
    const { changeSearch } = searchSlice.actions;
    store.dispatch(changeSearch('test'));

    renderWithProviders(<Search onChangeSearch={() => {}} />, { store });

    expect(screen.getByTestId('searchInput')).toHaveValue('test');
  });
});
