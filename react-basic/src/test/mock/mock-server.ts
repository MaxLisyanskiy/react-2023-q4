import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import {
  API_CARD_SELECT,
  API_DETAILED_CARD_SELECT,
  API_URL,
} from '../../utils/constants';
import { testOneCardDataMock } from './cardListMock';
import { detailedCardItemProps } from './detailedCardMock';

export const handlers = [
  http.get(`${API_URL}`, ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.set('page', '1');
    url.searchParams.set('pageSize', '1');
    url.searchParams.set('select', `${API_CARD_SELECT}`);

    return HttpResponse.json({ url, request, data: testOneCardDataMock });
  }),

  http.get(`${API_URL}/hgss4-1`, ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.set('select', `${API_DETAILED_CARD_SELECT}`);

    return HttpResponse.json({ url, request, data: detailedCardItemProps });
  }),
];

export const mockServer = setupServer(...handlers);
