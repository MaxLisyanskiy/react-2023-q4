import classes from './NotFound.module.scss';

const NotFound = () => {
  return (
    <section className={classes.page}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <button className={classes.button}>
        {/* <Link hre={generateLink(PAGE, PAGE_SIZE)}>Back to main page?</Link> */}
      </button>
    </section>
  );
};

export default NotFound;
