import { PROJECT_PATH } from '../constants';

export function generateLink(
  page: string,
  pageSize: string,
  search: string = '',
  id: string = '',
): string {
  const newUrl =
    id.trim() !== ''
      ? `${PROJECT_PATH}/${id}?page=${page}&pageSize=${pageSize}`
      : `${PROJECT_PATH}?page=${page}&pageSize=${pageSize}`;

  if (search.trim() !== '') newUrl + `&search=${search}`;

  return newUrl;
}
