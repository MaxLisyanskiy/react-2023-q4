import {
  FieldError,
  RegisterOptions,
  UseFormRegisterReturn,
} from 'react-hook-form';

export interface FormInputs {
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  passwordRepeat: string;
  country: string;
  img: string;
  t_c: boolean;
}

export type AppFields = {
  img?: FileList | undefined;
  t_c?: boolean | undefined;
  name: string;
  email: string;
  age: number;
  gender: string;
  password: string;
  passwordRepeat: string;
  country: string;
};

export enum RegisterKeys {
  name = 'name',
  email = 'email',
  age = 'age',
  gender = 'gender',
  password = 'password',
  passwordRepeat = 'passwordRepeat',
  img = 'img',
  country = 'country',
  t_c = 't_c',
}

export interface RHKInputProps {
  name: string;
  type: string;
  id: string;
  label: string;
  placeholder: string;
  inputKey: RegisterKeys;
  error?: FieldError | undefined;
  register: (
    name: RegisterKeys,
    options?: RegisterOptions<AppFields, RegisterKeys> | undefined,
  ) => UseFormRegisterReturn<RegisterKeys>;
}
