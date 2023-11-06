import { PROJECT_PATH } from './constants';

export function generateLink(
  page: number,
  pageSize: number,
  search: string = '',
  id: string = '',
): string {
  let newUrl =
    id.trim() !== ''
      ? `${PROJECT_PATH}/${id}?page=${page}&pageSize=${pageSize}`
      : `${PROJECT_PATH}?page=${page}&pageSize=${pageSize}`;

  if (search.trim() !== '') newUrl += `&search=${search}`;

  return newUrl;
}
