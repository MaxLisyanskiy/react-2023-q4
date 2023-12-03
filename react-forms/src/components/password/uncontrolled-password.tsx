import { RefObject } from 'react';

interface FormInputProps {
  name: string;
  type: string;
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  inputRef: RefObject<HTMLInputElement>;
  onChange: () => void;
}

export const UncontrolledPassword = (props: FormInputProps) => {
  const { name, type, id, label, placeholder, error, inputRef, onChange } =
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
            name={name}
            autoComplete="on"
            id={id}
            ref={inputRef}
            placeholder={placeholder}
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
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};
