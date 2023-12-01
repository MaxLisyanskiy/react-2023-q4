import { useRef } from 'react';
import { UncontrolledInputs } from '../../shared/uncontrolleds-data';
import { useAppSelector } from '../../store/redux-hooks';
import { UncontrolledCheckbox } from '../checkbox/uncontrolled-checkbox';
import { UncontrolledInput } from '../input/uncontrolled-input';
import { UncontrolledSelect } from '../select/uncontrolled-select';

export const UncontrolledForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const t_cRef = useRef<HTMLInputElement>(null);

  const { countries } = useAppSelector((state) => state.countriesReducer);

  return (
    <form className="form" ref={formRef}>
      <UncontrolledInput {...UncontrolledInputs.name} inputRef={nameRef} />
      <UncontrolledInput {...UncontrolledInputs.email} inputRef={emailRef} />

      <div className="form__wrapp">
        <UncontrolledInput {...UncontrolledInputs.age} inputRef={ageRef} />
        <UncontrolledSelect
          {...UncontrolledInputs.gender}
          data={['Male 👦', 'Female 👧']}
          inputRef={genderRef}
        />
      </div>

      <div className="form__passwords">
        <UncontrolledInput
          {...UncontrolledInputs.password}
          inputRef={passwordRef}
        />
        <UncontrolledInput
          {...UncontrolledInputs.passwordRepeat}
          inputRef={passwordRepeatRef}
        />
      </div>

      <UncontrolledSelect
        {...UncontrolledInputs.countries}
        data={countries}
        inputRef={countryRef}
      />
      <UncontrolledInput {...UncontrolledInputs.img} inputRef={imgRef} />
      <UncontrolledCheckbox {...UncontrolledInputs.t_c} inputRef={t_cRef} />

      <button type="submit" className="form__submit">
        Submit
      </button>
    </form>
  );
};
