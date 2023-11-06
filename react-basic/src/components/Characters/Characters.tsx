import { useEffect, useState } from 'react';
import { ICharacter, ICharacterResponse } from '../../types/characters';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import './Characters.scss';

const API_URL: string = 'https://api.pokemontcg.io/v2/cards';

interface PageInfoProps {
  search: string | null;
  page: number;
  pageSize: number;
  totalCount: number;
}

const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoProps>({
    search: null,
    page: 1,
    pageSize: 10,
    totalCount: 100,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const search = searchParams.get('search') ?? '';
    const page = searchParams.get('page') ?? '1';
    const pageSize = searchParams.get('pageSize') || '10';

    if (search) {
      setSearchParams({ search, page, pageSize });
    } else {
      setSearchParams({ page, pageSize });
    }

    setPageInfo({ ...pageInfo, search });

    if (
      search !== pageInfo.search ||
      Number(page) !== pageInfo.page ||
      Number(pageSize) !== pageInfo.pageSize
    ) {
      getFetchCharacters(search || '', page, pageSize);
    }

    localStorage.setItem('rss_project_01_search', '');
  }, [searchParams]); // eslint-disable-line

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
                      <Link to={`${item.id}`}>
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
