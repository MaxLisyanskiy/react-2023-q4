import { useEffect, useState } from 'react';
import { ICharacter } from '../../types/characters';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { API_URL, PROJECT_PATH } from '../../utils/constants';
import './About.scss';
import Spinner from '../Spinner/Spinner';

const About = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getFetchCharacter(id || '');
  }, [id]);

  const getFetchCharacter = async (id: string): Promise<void> => {
    setIsLoading(true);

    try {
      const response: Response = await fetch(`${API_URL}/${id}`);

      if (response.status === 200) {
        const res: { data: ICharacter } = await response.json();
        setCharacter(res.data);
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRouterBack = () => {
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';

    const newUrl = `${PROJECT_PATH}?page=${page}&pageSize=${pageSize}`;
    navigate(search ? newUrl + `&search=${search}` : newUrl);
  };

  return (
    <section className="about">
      <div className="about__background" onClick={handleRouterBack}></div>
      {isLoading && (
        <div className="about__wrapp">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <>
          {character ? (
            <div className="about__item" key={character.id}>
              <div className="about__close" onClick={handleRouterBack}>
                {'X'}
              </div>
              <div className="item__wrapp">
                <h2 className="item__title">
                  {character.name} {character.hp}
                </h2>
                <h4 className="item__subtitle">
                  {'rarity'} - {character.rarity}
                </h4>
                <div className="item__additional">
                  <span>supertype:</span>
                  <p>{character.supertype}</p>
                </div>
                <div className="item__additional">
                  <span>evolvesFrom:</span>
                  <p>{character.evolvesFrom}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="about__wrapp">
              <div className="about__close" onClick={handleRouterBack}>
                {'X'}
              </div>
              <p>Opps... not found</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default About;
