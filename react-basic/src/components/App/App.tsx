import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import Search from '../Search/Search';
import CardList from '../CardList/CardList';
import { useEffect, useState } from 'react';
import { generateLink } from '../../utils/generate-link';
import { PAGE, PAGE_SIZE } from '../../utils/constants';

const App = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') ?? String(PAGE);
  const pageSize = searchParams.get('pageSize') ?? String(PAGE_SIZE);

  const [currentPage, setCurrentPage] = useState<number>(Number(page));
  const [currentPageSize, setCurrentPageSize] = useState<number>(
    Number(pageSize),
  );

  useEffect(() => {
    setSearchParams({ page, pageSize });
  }, []); // eslint-disable-line

  const handleChangeSearch = (): void => {
    const newUrl = generateLink(currentPage, currentPageSize);
    navigate(newUrl);
    setCurrentPage(PAGE);
  };

  const handleChangePage = (page: number): void => {
    const newUrl = generateLink(page, currentPageSize);
    navigate(newUrl);
    setCurrentPage(page);
  };

  const handleChangePageSize = (pageSize: number): void => {
    const newUrl = generateLink(currentPage, pageSize);
    navigate(newUrl);
    setCurrentPageSize(pageSize);
    setCurrentPage(PAGE);
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
