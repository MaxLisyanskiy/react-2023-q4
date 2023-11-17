import { useEffect, useState } from 'react';
import classes from './Error.module.scss';

const ErrorBtn = () => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (error) throw new Error('Throw an Error example!');
  }, [error]);

  const handleThrowError = () => {
    setError(true);
  };

  return (
    <button
      className={classes.throwErrorBtn}
      onClick={handleThrowError}
      data-testid={'errorBtn'}
    >
      Throw Error?
    </button>
  );
};

export default ErrorBtn;
