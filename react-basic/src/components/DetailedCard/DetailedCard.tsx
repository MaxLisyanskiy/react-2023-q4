import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { PAGE, PAGE_SIZE, PROJECT_PATH } from '../../utils/constants';
import Spinner from '../Spinner/Spinner';
import notFoundItemIMG from '../../assets/detail-not-found.png';
import classes from './DetailedCard.module.scss';
import { pokemonAPI } from '../../services/fetchData';
import DetailedCardItem from './DetailedCardItem';
import { useAppDispatch } from '../../store/redux-hooks';
import { viewModeSlice } from '../../store/reducers/ViewModeSlice';

const DetailedCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const { changeViewMode } = viewModeSlice.actions;

  useEffect(() => {
    dispatch(changeViewMode(true));
  }, [id]); //eslint-disable-line

  const { data, isLoading } = pokemonAPI.useGetDetailedCardQuery(id ?? '');

  const handleRouterBack = () => {
    const page = searchParams.get('page') || PAGE;
    const pageSize = searchParams.get('pageSize') || PAGE_SIZE;

    navigate(`${PROJECT_PATH}?page=${page}&pageSize=${pageSize}`);

    dispatch(changeViewMode(false));
  };

  return (
    <section className={classes.section} data-testid={'detailedCard'}>
      <div className={classes.background} onClick={handleRouterBack}></div>

      <div
        className={
          !data ? `${classes.wrapp} ${classes.wrappActive}` : `${classes.wrapp}`
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
            {data ? (
              <DetailedCardItem character={data.data} />
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
