import { useEffect, useState } from 'react';
import { ICharacter, ICharacterResponse } from '../../types/characters';
import notFoundIMG from '../../assets/not-found.webp';
import './Characters.css';
import { useParams } from 'react-router-dom';

const API_URL: string = 'https://rickandmortyapi.com/api/character';

// { searchValue }: { searchValue: string }

const Characters = () => {
  const { search } = useParams();

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getFetchCharacters(search ?? '');
    localStorage.setItem('rss_project_01_search', search ?? '');
  }, [search]);

  const getFetchCharacters = async (value: string): Promise<void> => {
    setLoading(true);

    try {
      const response: Response = await fetch(value.trim() !== '' ? `${API_URL}?name=${value}` : API_URL);

      if (response.status === 200) {
        const data: ICharacterResponse = await response.json();
        setCharacters(data.results);
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
    <main className="characters">
      <h1 className="characters__title">The Rick and Morty Characters</h1>

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
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item__wrapp">
                        <h2 className="item__title">{item.name}</h2>
                        <h4 className="item__subtitle">
                          {item.species} - {item.gender}
                        </h4>
                        <div className="item__additional">
                          <span>Last known location:</span>
                          <p>{item.location.name}</p>
                        </div>
                        <div className="item__additional">
                          <span>First seen in:</span>
                          <p>{item.origin.name}</p>
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
      </section>
    </main>
  );
};

export default Characters;
