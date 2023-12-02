import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UncontrolledInputs } from '../../shared/uncontrolleds-data';
import { setNewForm } from '../../store/reducers/formSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { fileReader } from '../../utils/file-reader';
import { validatingForm } from '../../utils/validate-form';
import { UncontrolledCheckbox } from '../checkbox/uncontrolled-checkbox';
import { UncontrolledInput } from '../input/uncontrolled-input';
import { UncontrolledSelect } from '../select/uncontrolled-select';

export const UncontrolledForm = () => {
  const navigate = useNavigate();
  const { countries } = useAppSelector((state) => state.countriesReducer);
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const t_cRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      passwordRepeat: passwordRepeatRef.current?.value,
      gender: genderRef.current?.value,
      img: imgRef.current?.files,
      country: countryRef.current?.value,
      t_c: t_cRef.current?.checked,
    };

    const { isValidated, validatedData, errorMessages } =
      await validatingForm(formData);

    if (isValidated && validatedData) {
      const readerImage = formData.img ? await fileReader(formData.img[0]) : '';

      dispatch(setNewForm({ ...validatedData, img: readerImage }));
      setErrors({});
      navigate('/');
    } else {
      setErrors(errorMessages);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <UncontrolledInput
        {...UncontrolledInputs.name}
        inputRef={nameRef}
        error={errors['name']}
      />
      <UncontrolledInput
        {...UncontrolledInputs.email}
        inputRef={emailRef}
        error={errors['email']}
      />

      <div className="form__wrapp">
        <UncontrolledInput
          {...UncontrolledInputs.age}
          inputRef={ageRef}
          error={errors['age']}
        />
        <UncontrolledSelect
          {...UncontrolledInputs.gender}
          data={['Male 👦', 'Female 👧']}
          inputRef={genderRef}
          error={errors['gender']}
        />
      </div>

      <div className="form__passwords">
        <UncontrolledInput
          {...UncontrolledInputs.password}
          inputRef={passwordRef}
          error={errors['password']}
        />
        <UncontrolledInput
          {...UncontrolledInputs.passwordRepeat}
          inputRef={passwordRepeatRef}
          error={errors['passwordRepeat']}
        />
      </div>

      <UncontrolledSelect
        {...UncontrolledInputs.countries}
        data={countries}
        inputRef={countryRef}
        error={errors['country']}
      />
      <UncontrolledInput
        {...UncontrolledInputs.img}
        inputRef={imgRef}
        error={errors['img']}
      />
      <UncontrolledCheckbox
        {...UncontrolledInputs.t_c}
        inputRef={t_cRef}
        error={errors['t_c']}
      />

      <button type="submit" className="form__submit">
        Submit
      </button>
    </form>
  );
};
