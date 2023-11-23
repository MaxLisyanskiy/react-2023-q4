import { PROJECT_PATH } from './constants';

export function generateLink(
  page: number,
  pageSize: number,
  id: string = '',
): string {
  const newUrl =
    id.trim() !== ''
      ? `${PROJECT_PATH}/${id}?page=${page}&pageSize=${pageSize}`
      : `${PROJECT_PATH}?page=${page}&pageSize=${pageSize}`;

  return newUrl;
}
