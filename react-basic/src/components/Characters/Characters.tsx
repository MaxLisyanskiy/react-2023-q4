import { useEffect, useState } from 'react';
import {
  ICharacter,
  ICharacterResponse,
  PageInfoProps,
} from '../../types/characters';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { generateLink } from '../../utils/generate-link';
import './Characters.scss';

const API_URL: string = 'https://api.pokemontcg.io/v2/cards';

const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [currentPageSize, setCurrentPageSize] = useState<string | null>(null);

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoProps>({
    search: null,
    page: 1,
    pageSize: 10,
    totalCount: 100,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') ?? '1';
    const pageSize = searchParams.get('pageSize') || '10';

    if (search !== searchValue) {
      setSearchValue(search);
    }

    if (page !== currentPage) {
      setCurrentPage(page);
    }

    if (pageSize !== currentPageSize) {
      setCurrentPageSize(pageSize);
    }

    if (search) {
      setSearchParams({ search, page, pageSize });
    } else {
      setSearchParams({ page, pageSize });
    }

    setPageInfo({ ...pageInfo, search });

    localStorage.setItem('rss_project_01_search', '');
  }, [searchParams]); // eslint-disable-line

  useEffect(() => {
    getFetchCharacters(
      searchValue || '',
      currentPage || '1',
      currentPageSize || '10',
    );
  }, [searchValue, currentPage, currentPageSize]); // eslint-disable-line

  const getFetchCharacters = async (
    search: string,
    page: string,
    pageSize: string,
  ): Promise<void> => {
    setLoading(true);

    try {
      const response: Response = await fetch(
        search.trim() !== ''
          ? `${API_URL}?q=name:${search}&page=${page}&pageSize=${pageSize}`
          : `${API_URL}?page=${page}&pageSize=${pageSize}`,
      );

      if (response.status === 200) {
        const { data, page, pageSize, totalCount }: ICharacterResponse =
          await response.json();
        setPageInfo({ ...pageInfo, page, pageSize, totalCount });
        setCharacters(data);
      } else {
        setCharacters([]);
      }
    } catch (error) {
      setCharacters([]);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="characters">
      <div className="characters__section">
        {loading ? (
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
                          currentPage || '',
                          currentPageSize || '',
                          searchValue || '',
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
          page={pageInfo.page}
          pageSize={pageInfo.pageSize}
          totalCount={pageInfo.totalCount}
          search={pageInfo.search}
        />
      </div>
    </section>
  );
};

export default Characters;
