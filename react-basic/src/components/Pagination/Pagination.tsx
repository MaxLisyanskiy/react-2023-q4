import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECT_PATH } from '../../constants';
import { PageInfoProps } from '../../types/characters';
import './Pagination.scss';

const Pagination = ({ page, pageSize, totalCount, search }: PageInfoProps) => {
  const navigate = useNavigate();

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleChangePage = (type: 'prev' | 'next') => {
    const newUrl = `${PROJECT_PATH}?page=${
      type === 'prev' ? page - 1 : page + 1
    }&pageSize=${pageSize}`;

    navigate(search ? newUrl + `&search=${search}` : newUrl);
  };

  const handleChangePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    const newUrl = `${PROJECT_PATH}?page=1&pageSize=${event.target.value}`;

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
