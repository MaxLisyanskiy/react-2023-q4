import { useEffect, useState } from 'react';
import './Error.css';

const ErrorBtn = () => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (error) throw new Error('Throw an Error example!');
  }, [error]);

  const handleThrowError = () => {
    setError(true);
  };

  return (
    <button className="error_btn" onClick={handleThrowError}>
      Throw Error?
    </button>
  );
};

export default ErrorBtn;
