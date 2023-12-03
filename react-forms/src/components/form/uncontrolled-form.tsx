import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormFieldsData } from '../../shared/form-fields-data';
import { setNewForm } from '../../store/reducers/formSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { FormInputs } from '../../types';
import { fileReader } from '../../utils/file-reader';
import { PathConstants } from '../../utils/router';
import { validatingForm } from '../../utils/validate-form';
import { UncontrolledCheckbox } from '../checkbox/uncontrolled-checkbox';
import { UncontrolledInput } from '../input/uncontrolled-input';
import { UncontrolledPassword } from '../password/uncontrolled-password';
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

  const [passwordType, setPasswordType] = useState<string>('password');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      age: Number(ageRef.current?.value),
      gender: genderRef.current?.value,
      password: passwordRef.current?.value,
      passwordRepeat: passwordRepeatRef.current?.value,
      country: countryRef.current?.value,
      img: imgRef.current?.files,
      t_c: t_cRef.current?.checked,
    };

    const { isValidated, validatedData, errorMessages } =
      await validatingForm(formData);

    if (isValidated && validatedData) {
      const readerImage = formData.img ? await fileReader(formData.img[0]) : '';

      const validatedForm: FormInputs = {
        name: validatedData.name,
        email: validatedData.email,
        age: validatedData.age,
        gender: validatedData.gender,
        password: validatedData.password,
        passwordRepeat: validatedData.passwordRepeat,
        country: validatedData.country,
        img: readerImage,
        t_c: validatedData.t_c ?? true,
      };

      dispatch(setNewForm(validatedForm));
      setErrors({});
      navigate(PathConstants.HOME);
    } else {
      setErrors(errorMessages);
    }
  };

  return (
    <form className="form" autoComplete="on" onSubmit={handleSubmit}>
      <UncontrolledInput
        {...FormFieldsData.name}
        inputRef={nameRef}
        error={errors['name']}
      />
      <UncontrolledInput
        {...FormFieldsData.email}
        inputRef={emailRef}
        error={errors['email']}
      />

      <div className="form__wrapp">
        <UncontrolledInput
          {...FormFieldsData.age}
          inputRef={ageRef}
          error={errors['age']}
        />
        <UncontrolledSelect
          {...FormFieldsData.gender}
          data={['Male 👦', 'Female 👧']}
          inputRef={genderRef}
          error={errors['gender']}
        />
      </div>

      <div className="form__passwords">
        <UncontrolledPassword
          {...{ ...FormFieldsData.password, type: passwordType }}
          inputRef={passwordRef}
          onChange={() =>
            setPasswordType(passwordType === 'password' ? 'string' : 'password')
          }
          error={errors['password']}
        />
        <UncontrolledPassword
          {...{ ...FormFieldsData.passwordRepeat, type: passwordType }}
          inputRef={passwordRepeatRef}
          onChange={() =>
            setPasswordType(passwordType === 'password' ? 'string' : 'password')
          }
          error={errors['passwordRepeat']}
        />
      </div>

      <UncontrolledSelect
        {...FormFieldsData.countries}
        data={countries}
        inputRef={countryRef}
        error={errors['country']}
      />
      <UncontrolledInput
        {...FormFieldsData.img}
        inputRef={imgRef}
        error={errors['img']}
      />
      <UncontrolledCheckbox
        {...FormFieldsData.t_c}
        inputRef={t_cRef}
        error={errors['t_c']}
      />

      <button type="submit" className="form__submit">
        Submit
      </button>
    </form>
  );
};
