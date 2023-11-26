import { PAGE, PAGE_SIZE } from '@/shared/constants';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classes from './Error.module.scss';

const ErrorPage500 = () => {
  const router = useRouter();

  return (
    <section className={classes.page}>
      <h1 className={classes.title} data-testid={'500Title'}>
        Oops! 500
      </h1>
      <Image
        className={classes.img}
        src="/error.webp"
        width={500}
        height={500}
        alt="500-page-img"
      />
      <button
        onClick={() =>
          router.push({
            pathname: '/',
            query: {
              page: PAGE,
              pageSize: PAGE_SIZE,
            },
          })
        }
      >
        Back to main page?
      </button>
    </section>
  );
};

export default ErrorPage500;
