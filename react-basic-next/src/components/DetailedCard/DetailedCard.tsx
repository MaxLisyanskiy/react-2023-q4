import classes from './DetailedCard.module.scss';
import DetailedCardItem from './DetailedCardItem';
import { IDetailedCard } from '@/types/card-type';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { PAGE, PAGE_SIZE } from '@/shared/constants';

const DetailedCard = ({ data }: { data: IDetailedCard | null }) => {
  const router = useRouter();
  const { query } = router;
  const { detailed, page, pageSize, ...otherQuery } = query;

  const handleRouterBack = () => {
    router.push({
      pathname: '/',
      query: {
        page: page ?? PAGE,
        pageSize: pageSize ?? PAGE_SIZE,
        ...otherQuery,
      },
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
          <div data-testid={'detailedCardEmpty'}>
            <p className={classes.notFoundText}>Opps... not found</p>
            <Image
              className={classes.notFoundImg}
              src="/detail-not-found.png"
              width={100}
              height={100}
              alt="not-found-pockemon"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailedCard;
