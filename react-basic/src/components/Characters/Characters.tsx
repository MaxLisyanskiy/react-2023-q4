import { useEffect, useState } from 'react';
import { ICharacter } from '../../types/characters';
import notFoundIMG from '../../assets/not-found.webp';
import { useSearchParams } from 'react-router-dom';

import './Characters.css';
import Pagination from '../Pagination/Pagination';

// const API_URL: string = 'https://rickandmortyapi.com/api/character';
// const API_URL: string = 'https://api.slingacademy.com/v1/sample-data/users';
const API_URL: string = 'https://hn.algolia.com/api/v1/search';

// { searchValue }: { searchValue: string }

const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<string>('1');

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

    if (search) {
      setSearchParams({ search, page, limit });
    } else {
      setSearchParams({ page, limit });
    }

    setCurrentPage(page);
    // setSearchParams({ page: '1', limit: '20' });
    // getFetchCharacters(search ?? '');
    getFetchCharacters(search, page, limit);
    // localStorage.setItem('rss_project_01_search', search ?? '');
    localStorage.setItem('rss_project_01_search', '');
  }, [searchParams]);

  const getFetchCharacters = async (search: string, page: string, limit: string): Promise<void> => {
    setLoading(true);

    try {
      const response: Response = await fetch(
        search.trim() !== ''
          ? `${API_URL}?query=${search}&page=${page}&hitsPerPage=${limit}`
          : `${API_URL}?page=${page}&hitsPerPage=${limit}`,
      );

      if (response.status === 200) {
        // const data: ICharacterResponse = await response.json();
        const data = await response.json();
        console.log(data.hits);
        setCharacters(data.hits);
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

  // const handleChangeUsersLimit = () => {

  // }

  return (
    <main className="characters">
      <h1 className="characters__title">The random users list</h1>

      <section className="characters__section">
        {loading ? (
          <div className="characters__loading">Loading...</div>
        ) : (
          <>
            {characters.length > 0 ? (
              <ul className="list">
                {characters.map((item) => {
                  return (
                    <li className="item" key={item.id}>
                      <div>
                        <img src={item.profile_picture} alt={item.first_name} />
                      </div>
                      <div className="item__wrapp">
                        <h2 className="item__title">
                          {item.first_name} {item.last_name}
                        </h2>
                        <h4 className="item__subtitle">
                          {'Country'} - {item.country}
                        </h4>
                        <div className="item__additional">
                          <span>Gender:</span>
                          <p>{item.gender}</p>
                        </div>
                        <div className="item__additional">
                          <span>Job:</span>
                          <p>{item.job}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="characters__not-found">
                <p>Opps... not found</p>
                <img src={notFoundIMG} alt="notFoundIMG" />
              </div>
            )}
          </>
        )}
        <Pagination page={currentPage} />
      </section>
    </main>
  );
};

export default Characters;
