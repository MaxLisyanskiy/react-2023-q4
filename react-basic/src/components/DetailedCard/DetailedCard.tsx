import { useEffect, useState } from 'react';
import { IDetailedCard } from '../../types/card-type';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { PAGE, PAGE_SIZE, PROJECT_PATH } from '../../utils/constants';
import Spinner from '../Spinner/Spinner';
import notFoundItemIMG from '../../assets/detail-not-found.png';
import classes from './DetailedCard.module.scss';
import { getDetailedCard } from '../../services/fetchData';
import DetailedCardItem from './DetailedCardItem';

const DetailedCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [character, setCharacter] = useState<IDetailedCard | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getFetchDetailedCard(id || '');
  }, [id]);

  const getFetchDetailedCard = async (id: string): Promise<void> => {
    setIsLoading(true);

    getDetailedCard(id)
      .then(({ data }) => setCharacter(data))
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRouterBack = () => {
    const page = searchParams.get('page') || PAGE;
    const pageSize = searchParams.get('pageSize') || PAGE_SIZE;

    navigate(`${PROJECT_PATH}?page=${page}&pageSize=${pageSize}`);
  };

  return (
    <section className={classes.section} data-testid={'detailedCard'}>
      <div className={classes.background} onClick={handleRouterBack}></div>

      <div
        className={
          !character
            ? `${classes.wrapp} ${classes.wrappActive}`
            : `${classes.wrapp}`
        }
      >
        <div
          className={classes.close}
          onClick={handleRouterBack}
          id={'closeBtn'}
          data-testid={'closeBtn'}
        >
          {'X'}
        </div>

        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            {character ? (
              <DetailedCardItem character={character} />
            ) : (
              <div>
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
      </div>
    </section>
  );
};

export default DetailedCard;
