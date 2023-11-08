import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { PAGE, PAGE_SIZE } from '../../utils/constants';
import { generateLink } from '../../utils/generate-link';

import classes from './ErrorPage.module.scss';

const ErrorPage = () => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <section className={classes.page}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className={classes.title}>
        <i>{errorMessage}</i>
      </p>
      <button className={classes.button}>
        <Link to={generateLink(PAGE, PAGE_SIZE)}>Back to main page?</Link>
      </button>
    </section>
  );
};

export default ErrorPage;
