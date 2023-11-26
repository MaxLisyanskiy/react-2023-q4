import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';
import { PAGE } from '../../shared/constants';
import classes from './Pagination.module.scss';

export interface PaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
}

const Pagination = ({ page, pageSize, totalCount }: PaginationProps) => {
  const router = useRouter();
  const { query } = router;
  const totalPages = Math.ceil(+totalCount / +pageSize);

  const handleChangePage = (type: 'prev' | 'next') => {
    const newPage = type === 'prev' ? page - 1 : page + 1;
    router.push({ query: { ...query, page: newPage } });
  };

  const handleChangePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(event.target.value);
    router.push({ query: { ...query, page: 1, pageSize: newPageSize } });
  };

  return (
    <div className={classes.pagination}>
      <ul className={classes.list}>
        <button
          className={classes.item}
          disabled={page <= PAGE}
          onClick={() => handleChangePage('prev')}
        >
          {'<'}
        </button>
        <li className={classes.item} data-testid={'paginationPage'}>
          {page}
        </li>
        <button
          className={classes.item}
          disabled={totalPages === 0 || page === totalPages}
          onClick={() => handleChangePage('next')}
          data-testid={'paginationNextBtn'}
        >
          {'>'}
        </button>
        <li>
          <select
            className={classes.select}
            value={pageSize}
            onChange={handleChangePageSize}
          >
            {[1, 5, 10, 20, 50].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
