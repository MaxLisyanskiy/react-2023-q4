import { useEffect, useState } from 'react';
import { ICharacter, ICharacterResponse } from '../../types/characters';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { generateLink } from '../../utils/generate-link';
import { API_URL, PAGE, PAGE_SIZE, TOTAL_COUNT } from '../../utils/constants';
import './Characters.scss';

const Characters = ({ search }: { search: string }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [currentPageSize, setCurrentPageSize] = useState<number>(PAGE_SIZE);
  const [currentTotalCount, setCurrentTotalCount] =
    useState<number>(TOTAL_COUNT);

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const search = searchParams.get('search') ?? '';
    const page = searchParams.get('page') ?? String(PAGE);
    const pageSize = searchParams.get('pageSize') ?? String(PAGE_SIZE);

    if (search !== searchValue) {
      setSearchValue(search);
    }

    if (+page !== currentPage) {
      setCurrentPage(+page);
    }

    if (+pageSize !== currentPageSize) {
      setCurrentPageSize(+pageSize);
    }

    if (search) {
      setSearchParams({ search, page, pageSize });
    } else {
      setSearchParams({ page, pageSize });
    }

    getFetchCharacters(search, +page, +pageSize);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (search !== searchValue) {
      setSearchValue(search);
      getFetchCharacters(search, currentPage, currentPageSize);
    }
  }, [search]); // eslint-disable-line

  const getFetchCharacters = async (
    search: string,
    page: number,
    pageSize: number,
  ): Promise<void> => {
    setIsLoading(true);

    try {
      const response: Response = await fetch(
        search.trim() !== ''
          ? `${API_URL}?q=name:${search}&page=${page}&pageSize=${pageSize}`
          : `${API_URL}?page=${page}&pageSize=${pageSize}`,
      );

      if (response.status === 200) {
        const { data, page, pageSize, totalCount }: ICharacterResponse =
          await response.json();

        setCurrentPage(page);
        setCurrentPageSize(pageSize);
        setCurrentTotalCount(totalCount);
        setCharacters(data);
      } else {
        setCharacters([]);
      }
    } catch (error) {
      setCharacters([]);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePagination = (
    pageNumber: number,
    pageSizeValue: number,
  ) => {
    setCurrentPage(pageNumber);
    setCurrentPageSize(pageSizeValue);
    navigate(generateLink(pageNumber, pageSizeValue, searchValue));
    getFetchCharacters(searchValue, pageNumber, pageSizeValue);
  };

  return (
    <section className="characters">
      <div className="characters__section">
        {isLoading ? (
          <div className="characters__loading">Loading...</div>
        ) : (
          <>
            {characters.length > 0 ? (
              <ul className="list">
                {characters.map((item) => {
                  return (
                    <li className="item" key={item.id}>
                      <Link
                        to={generateLink(
                          currentPage,
                          currentPageSize,
                          searchValue,
                          item.id,
                        )}
                      >
                        <div>
                          <img src={item.images.small} alt={item.name} />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="characters__not-found">
                <p>Opps... not found</p>
              </div>
            )}
          </>
        )}
        <Pagination
          page={Number(currentPage)}
          pageSize={Number(currentPageSize)}
          totalCount={Number(currentTotalCount)}
          changePagination={(pageNumber, pageSizeValue) =>
            handleChangePagination(pageNumber, pageSizeValue)
          }
        />
      </div>
    </section>
  );
};

export default Characters;
