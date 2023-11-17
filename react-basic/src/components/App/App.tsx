import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';
import { generateLink } from '../../utils/generate-link';
import { PAGE, PAGE_SIZE } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { pageSlice } from '../../store/reducers/PageSlice';

import Search from '../Search/Search';
import CardList from '../CardList/CardList';

const App = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') ?? String(PAGE);
  const pageSize = searchParams.get('pageSize') ?? String(PAGE_SIZE);

  const dispatch = useAppDispatch();
  const { changeCurrentPage, changeCurrentPageSize } = pageSlice.actions;

  const { currentPage, currentPageSize } = useAppSelector(
    (state) => state.pageReducer,
  );

  useEffect(() => {
    setSearchParams({ page, pageSize });
    dispatch(changeCurrentPage(Number(page)));
    dispatch(changeCurrentPageSize(Number(pageSize)));
  }, []); // eslint-disable-line

  const handleChangeSearch = (): void => {
    navigate(generateLink(currentPage, currentPageSize));
    dispatch(changeCurrentPage(PAGE));
  };

  const handleChangePage = (page: number): void => {
    navigate(generateLink(page, currentPageSize));
    dispatch(changeCurrentPage(page));
  };

  const handleChangePageSize = (pageSize: number): void => {
    navigate(generateLink(currentPage, pageSize));
    dispatch(changeCurrentPage(PAGE));
    dispatch(changeCurrentPageSize(pageSize));
  };

  return (
    <>
      <Search onChangeSearch={handleChangeSearch} />
      <main className="main">
        <h1 className="main-title">Welcome to the Pokémon Home</h1>
        <div className="main-wrapp">
          <CardList
            currentPage={currentPage}
            currentPageSize={currentPageSize}
            onPageChange={handleChangePage}
            onPageSizeChange={handleChangePageSize}
          />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default App;
