import { useEffect, useState } from 'react';
import { ICharacter } from '../../types/characters';
import { useParams } from 'react-router-dom';

const API_URL: string = 'https://api.pokemontcg.io/v2/cards';

const About = () => {
  const { id } = useParams();

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
        // const data: ICharacterResponse = await response.json();
        const res = await response.json();
        setCharacter(res.data);
        console.log(res.data);
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="characters__section">
      {isLoading ? (
        <div className="characters__loading">Loading...</div>
      ) : (
        <>
          {character ? (
            <div className="item" key={character.id}>
              {/* <div>
                <img src={character.images.small} alt={character.name} />
              </div> */}
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
            <div className="characters__not-found">
              <p>Opps... not found</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default About;
