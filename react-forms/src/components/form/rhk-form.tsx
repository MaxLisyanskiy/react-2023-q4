import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { FormFieldsData } from '../../shared/form-fields-data';
import { validationSchema } from '../../shared/validation-schema';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { RHKInput } from '../input/rhk-input';
import { RHKCheckbox } from '../checkbox/rhk-checkbox';
import { RHKSelect } from '../select/rhk-select';
import { AppFields, FormInputs } from '../../types';
import { fileReader } from '../../utils/file-reader';
import { setNewForm } from '../../store/reducers/formSlice';
import { PathConstants } from '../../utils/router';

export const RHKForm = () => {
  const navigate = useNavigate();
  const { countries } = useAppSelector((state) => state.countriesReducer);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmitForm = async (formData: AppFields) => {
    const readerImage = formData.img ? await fileReader(formData.img[0]) : '';

    const validatedForm: FormInputs = {
      name: formData.name,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      password: formData.password,
      passwordRepeat: formData.passwordRepeat,
      country: formData.country,
      img: readerImage,
      t_c: formData.t_c ?? true,
    };
    dispatch(setNewForm(validatedForm));
    navigate(PathConstants.HOME);
  };

  return (
    <form
      className="form"
      autoComplete="on"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <RHKInput
        {...FormFieldsData.name}
        register={register}
        error={errors.name}
      />
      <RHKInput
        {...FormFieldsData.email}
        register={register}
        error={errors.email}
      />

      <div className="form__wrapp">
        <RHKInput
          {...FormFieldsData.age}
          register={register}
          error={errors.age}
        />
        <RHKSelect
          {...FormFieldsData.gender}
          data={['Male 👦', 'Female 👧']}
          register={register}
          error={errors.gender}
        />
      </div>

      <div className="form__passwords">
        <RHKInput
          {...FormFieldsData.password}
          register={register}
          error={errors.password}
        />
        <RHKInput
          {...FormFieldsData.passwordRepeat}
          register={register}
          error={errors.passwordRepeat}
        />
      </div>

      <RHKSelect
        {...FormFieldsData.countries}
        data={countries}
        register={register}
        error={errors['country']}
      />
      <RHKInput
        {...FormFieldsData.img}
        register={register}
        error={errors.img}
      />
      <RHKCheckbox
        {...FormFieldsData.t_c}
        register={register}
        error={errors['t_c']}
      />

      <button type="submit" className="form__submit">
        Submit
      </button>
    </form>
  );
};
