import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pagination.scss';

interface PaginationProps {
  search: string | null;
  page: number;
  pageSize: number;
  totalCount: number;
}

const Pagination = ({
  page,
  pageSize,
  totalCount,
  search,
}: PaginationProps) => {
  const navigate = useNavigate();

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleChangePage = (type: 'prev' | 'next') => {
    const newUrl = `/react-2023-q4/react-basic?page=${
      type === 'prev' ? page - 1 : page + 1
    }&pageSize=${pageSize}`;

    navigate(search ? newUrl + `&search=${search}` : newUrl);
  };

  const handleChangePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    const newUrl = `/react-2023-q4/react-basic?page=${page}&pageSize=${event.target.value}`;

    navigate(search ? newUrl + `&search=${search}` : newUrl);
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <button
          className="pagination__item"
          disabled={page <= 1}
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
          <select onChange={handleChangePageSize}>
            <option>1</option>
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
