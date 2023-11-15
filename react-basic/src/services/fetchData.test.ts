// import { afterEach, describe, expect, it, vi } from 'vitest';
// import {
//   API_URL,
//   API_CARD_SELECT,
//   API_DETAILED_CARD_SELECT,
// } from '../utils/constants';
// import { getAllCards, getDetailedCard } from './fetchData';

// const mockFetch = vi.fn();
// global.fetch = mockFetch;

// describe('getAllCards', () => {
//   afterEach(() => {
//     mockFetch.mockClear(); // Очищаем мок после каждого теста
//   });

//   it('should make a GET request to fetch cards', async () => {
//     const page = 1;
//     const pageSize = 10;
//     const searchQuery = '';

//     const expectedUrl = `${API_URL}?page=${page}&pageSize=${pageSize}&${API_CARD_SELECT}`;
//     const expectedResponse = { cards: [] };

//     // Мокируем ответ от сервера
//     mockFetch.mockResolvedValueOnce({
//       ok: true,
//       json: vi.fn().mockResolvedValueOnce(expectedResponse),
//     });

//     const result = await getAllCards(page, pageSize, searchQuery);

//     // Проверяем, что fetch был вызван с ожидаемыми параметрами
//     expect(mockFetch).toHaveBeenCalledWith(expectedUrl);

//     // Проверяем, что функция возвращает ожидаемый результат
//     expect(result).toEqual(expectedResponse);
//   });

//   it('should make a GET request with search query', async () => {
//     const page = 1;
//     const pageSize = 10;
//     const searchQuery = 'example';

//     const expectedUrl = `${API_URL}?q=name:${searchQuery}&page=${page}&pageSize=${pageSize}&${API_CARD_SELECT}`;
//     const expectedResponse = { cards: [] };

//     // Мокируем ответ от сервера
//     mockFetch.mockResolvedValueOnce({
//       ok: true,
//       json: vi.fn().mockResolvedValueOnce(expectedResponse),
//     });

//     const result = await getAllCards(page, pageSize, searchQuery);

//     // Проверяем, что fetch был вызван с ожидаемыми параметрами
//     expect(mockFetch).toHaveBeenCalledWith(expectedUrl);

//     // Проверяем, что функция возвращает ожидаемый результат
//     expect(result).toEqual(expectedResponse);
//   });

//   it('should throw an error if response is not ok', async () => {
//     const page = 1;
//     const pageSize = 10;
//     const searchQuery = '';

//     const expectedUrl = `${API_URL}?page=${page}&pageSize=${pageSize}&${API_CARD_SELECT}`;
//     const expectedError = new Error('Some error message');

//     // Мокируем ответ от сервера с ошибкой
//     mockFetch.mockResolvedValueOnce({
//       ok: false,
//       json: vi.fn().mockResolvedValueOnce({ message: 'Some error message' }),
//     });

//     await expect(getAllCards(page, pageSize, searchQuery)).rejects.toThrowError(
//       expectedError,
//     );

//     // Проверяем, что fetch был вызван с ожидаемыми параметрами
//     expect(mockFetch).toHaveBeenCalledWith(expectedUrl);
//   });
// });

// describe('getDetailedCard', () => {
//   afterEach(() => {
//     mockFetch.mockClear();
//   });

//   it('should make a GET request to fetch detailed-card', async () => {
//     const id = 'det1-1';

//     const expectedUrl = `${API_URL}/${id}?${API_DETAILED_CARD_SELECT}`;
//     const expectedResponse = { data: {} };

//     mockFetch.mockResolvedValueOnce({
//       ok: true,
//       json: vi.fn().mockResolvedValueOnce(expectedResponse),
//     });

//     const result = await getDetailedCard(id);

//     expect(mockFetch).toHaveBeenCalledWith(expectedUrl);

//     expect(result).toEqual(expectedResponse);
//   });
// });
