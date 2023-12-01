import { RefObject } from 'react';

interface FormInputProps {
  name: string;
  type: string;
  id: string;
  label: string;
  placeholder: string;
  inputRef: RefObject<HTMLInputElement>;
}

export const UncontrolledInput = (props: FormInputProps) => {
  const { name, type, id, label, placeholder, inputRef } = props;

  const onShowPassword = () => {
    const input = inputRef.current;
    if (input) {
      input.type === 'password'
        ? (input.type = 'text')
        : (input.type = 'password');
    }
  };

  return (
    <div className="input">
      <div className="input__content">
        {type !== 'checkbox' && (
          <label className="input__label" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          className="input__input"
          type={type}
          name={name}
          autoComplete={'on'}
          id={id}
          ref={inputRef}
          placeholder={placeholder}
        />
        {['password', 'confirmPassword'].includes(name) && (
          <div onClick={onShowPassword} />
        )}
        {type === 'checkbox' && (
          <label className="input__label" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
    </div>
  );
};
