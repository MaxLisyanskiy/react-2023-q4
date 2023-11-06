import { ChangeEvent } from 'react';
import { PAGE } from '../../utils/constants';
import './Pagination.scss';

export interface PaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (pageNumber: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const Pagination = ({
  page,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(+totalCount / +pageSize);

  const handleChangePage = (type: 'prev' | 'next') => {
    onPageChange(type === 'prev' ? page - 1 : page + 1);
  };

  const handleChangePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(event.target.value));
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <button
          className="pagination__item"
          disabled={page <= PAGE}
          onClick={() => handleChangePage('prev')}
        >
          {'<'}
        </button>
        <li className="pagination__item">{page}</li>
        <button
          className="pagination__item"
          disabled={page === totalPages}
          onClick={() => handleChangePage('next')}
        >
          {'>'}
        </button>
        <li>
          <select
            className="pagination__select"
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
