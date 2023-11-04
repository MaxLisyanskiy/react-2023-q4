import './Pagination.scss';

interface PaginationProps {
  page: string;
}

const Pagination = (props: PaginationProps) => {
  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item">{'<'}</li>
        <li className="pagination__item">{props.page}</li>
        <li className="pagination__item">{'>'}</li>
        <li>
          <select>
            <option>10</option>
            <option>20</option>
          </select>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
