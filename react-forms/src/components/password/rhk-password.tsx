import { RHKInputProps } from '../../types';

interface RHKPasswordProps extends RHKInputProps {
  onChange: () => void;
}

export const RHKPassword = (props: RHKPasswordProps) => {
  const { type, id, label, placeholder, inputKey, error, register, onChange } =
    props;

  return (
    <div className="input">
      <div className="input__content">
        {type !== 'checkbox' && (
          <label className="input__label" htmlFor={id}>
            {label}
          </label>
        )}
        <div className="input__wrapp-password">
          <input
            className={`input__password ${error ? 'error' : ''}`}
            type={type}
            autoComplete="on"
            id={id}
            placeholder={placeholder}
            {...register(inputKey)}
          />
          <div className="input__show-password" onClick={onChange}>
            {type === 'password' ? <span>🙈</span> : <span>🙉</span>}
          </div>
        </div>
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
