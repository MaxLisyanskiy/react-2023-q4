import notFoundItemIMG from '../../assets/detail-not-found.png';
import classes from './DetailedCard.module.scss';
import DetailedCardItem from './DetailedCardItem';
import { IDetailedCard } from '@/types/card-type';
import { useRouter } from 'next/router';

const DetailedCard2 = ({ data }: { data: IDetailedCard }) => {
  const router = useRouter();
  const { query, pathname } = router;
  const { detailedId, ...queryWithoutDetailedId } = query;

  const handleRouterBack = () => {
    router.push({
      pathname,
      query: { ...queryWithoutDetailedId },
    });
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
          data-testid={'closeDetailedBtn'}
        >
          {'X'}
        </div>
        {data ? (
          <DetailedCardItem character={data} />
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
      </div>
    </section>
  );
};

export default DetailedCard2;
