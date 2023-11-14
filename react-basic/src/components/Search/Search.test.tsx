// TODO: change search-context to search in the redux store

// import { render, screen, fireEvent } from '@testing-library/react';
// import { describe, expect, it } from 'vitest';
// import { SearchMock } from '../../test/mock/searchMock';

// describe('Tests for the Search component', () => {
//   it('Saves the entered value to the local storage', async () => {
//     render(SearchMock(''));

//     const searchInput: HTMLElement = screen.getByTestId('searchInput');
//     const searchBtn: HTMLElement = screen.getByTestId('searchBtn');

//     fireEvent.change(searchInput, { target: { value: 'test' } });
//     fireEvent.click(searchBtn);

//     const ls = localStorage.getItem('rss_react_basic');

//     expect(ls).toBe('test');
//   });

//   it('Check that the component retrieves the value from the local storage upon mounting', async () => {
//     const ls = localStorage.getItem('rss_react_basic');
//     expect(ls).toBe('test');

//     render(SearchMock(ls || ''));

//     const searchInput = screen.getByTestId('searchInput') as HTMLInputElement;
//     expect(searchInput.value).toBe(ls);
//   });
// });
