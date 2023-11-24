import { PAGE, PAGE_SIZE } from '@/shared/constants';
import { useRouter } from 'next/router';
import classes from './NotFound.module.scss';

const NotFound = () => {
  const router = useRouter();
  const { query } = router;
  const { page, pageSize, ...otherQuery } = query;

  return (
    <section className={classes.page}>
      <h1 data-testid={'notFoundTitle'}>Oops! 404</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <button
        className={classes.button}
        onClick={() =>
          router.push({
            pathname: '/',
            query: {
              page: page ?? PAGE,
              pageSize: pageSize ?? PAGE_SIZE,
              ...otherQuery,
            },
          })
        }
      >
        Back to main page?
      </button>
    </section>
  );
};

export default NotFound;
