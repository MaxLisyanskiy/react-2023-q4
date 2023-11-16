import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { API_CARD_SELECT, API_URL } from '../../utils/constants';
import { testOneCardDataMock } from './cardListMock';
import { detailedCardItemProps } from './detailedCardMock';

export const handlers = [
  http.get(`${API_URL}?page=1&pageSize=1&select=${API_CARD_SELECT}`, () => {
    return HttpResponse.json({ data: testOneCardDataMock });
  }),

  http.get(`${API_URL}/hgss4-1?select=${API_CARD_SELECT}`, () => {
    return HttpResponse.json({ detailedCardItemProps });
  }),
];

export const mockServer = setupServer(...handlers);
