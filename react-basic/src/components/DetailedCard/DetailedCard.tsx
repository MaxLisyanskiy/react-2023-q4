import { useEffect, useState } from 'react';
import { IDetailedCard } from '../../types/card-type';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { API_URL, PAGE, PAGE_SIZE, PROJECT_PATH } from '../../utils/constants';
import Spinner from '../Spinner/Spinner';
import notFoundItemIMG from '../../assets/detail-not-found.png';
import classes from './DetailedCard.module.scss';

const DetailedCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [character, setCharacter] = useState<IDetailedCard | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getFetchCharacter(id || '');
  }, [id]);

  const getFetchCharacter = async (id: string): Promise<void> => {
    setIsLoading(true);

    try {
      const response: Response = await fetch(
        `${API_URL}/${id}?select=id,name,images,hp,rarity,supertype,flavorText`,
      );

      if (response.status === 200) {
        const res: { data: IDetailedCard } = await response.json();
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
    const page = searchParams.get('page') || PAGE;
    const pageSize = searchParams.get('pageSize') || PAGE_SIZE;

    navigate(`${PROJECT_PATH}?page=${page}&pageSize=${pageSize}`);
  };

  return (
    <section className={classes.section}>
      <div className={classes.background} onClick={handleRouterBack}></div>

      {isLoading && (
        <div className={classes.wrapp}>
          <Spinner />
        </div>
      )}

      {!isLoading && (
        <>
          {character ? (
            <div className={classes.item} key={character.id}>
              <div className={classes.close} onClick={handleRouterBack}>
                {'X'}
              </div>
              <div className={classes.itemImg}>
                <img src={character.images.small} alt={character.name} />
              </div>
              <h2 className={classes.itemTitle}>
                {character.name} <span>HP: {character.hp} </span>
              </h2>
              <p className={classes.itemAdditional}>
                <span>Rarity:</span> {character.rarity}
              </p>
              <p className={classes.itemAdditional}>
                <span>Supertype:</span> {character.supertype}
              </p>
              <div className={classes.itemAdditional}>
                <span>Description:</span> {character.flavorText}
              </div>
            </div>
          ) : (
            <div className={classes.wrapp}>
              <div className={classes.close} onClick={handleRouterBack}>
                {'X'}
              </div>
              <p className={classes.notFoundText}>Opps... not found</p>
              <img
                className={classes.notFoundImg}
                src={notFoundItemIMG}
                alt="not-found-pockemon"
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default DetailedCard;
