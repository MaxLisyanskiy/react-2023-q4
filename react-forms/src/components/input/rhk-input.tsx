import { RHKInputProps } from '../../types';

export const RHKInput = (props: RHKInputProps) => {
  const { type, id, label, placeholder, inputKey, error, register } = props;

  const min_max = type === 'number' ? { min: 0, max: 100 } : '';

  return (
    <div className="input">
      <div className="input__content">
        {type !== 'checkbox' && (
          <label className="input__label" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          className={`input__input ${error ? 'error' : ''}`}
          type={type}
          {...min_max}
          autoComplete={'on'}
          id={id}
          placeholder={placeholder}
          {...register(inputKey)}
        />
        {type === 'checkbox' && (
          <label className="input__label" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      {error && <p className="input__error">{error.message}</p>}
    </div>
  );
};
