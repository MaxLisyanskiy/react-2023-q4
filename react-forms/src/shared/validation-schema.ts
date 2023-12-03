import * as yup from 'yup';
import { object } from 'yup';
import { setupStore } from '../store/store';

const countries = setupStore().getState().countriesReducer.countries;

export const validationSchema = object({
  name: yup
    .string()
    .required('Field "Name" is required')
    .uppercase('Field "Name" must begin with an uppercase letter'),
  email: yup
    .string()
    .required('Field "Email" is required')
    .email('Field "Email" is not valid'),
  age: yup
    .number()
    .typeError('Field "Age" must be a number')
    .required('Field "Age" is required')
    .integer('Field "Age" must be an integer')
    .positive('Field "Age" must be a positive number'),
  gender: yup
    .string()
    .required('Field "Gender" is required')
    .test('includes in list', "Country doesn't exist", (text) => {
      const allGenres = ['male 👦', 'female 👧'];
      return allGenres.includes(text.toLowerCase());
    }),
  password: yup
    .string()
    .required('Field "Password" is required')
    .matches(/^(?=.*[a-zа-я])/, 'Password must contain one Lowercase letter')
    .matches(/^(?=.*[A-ZА-Я])/, 'Password must contain one Uppercase letter')
    .matches(/^(?=.*[0-9])/, 'Password must contain one Number')
    .matches(
      /^(?=.*[!@#%&$^*()?><|+=])/,
      'Password must contain one Special character',
    )
    .min(8, 'Password Strength: weak. Must contain 8 characters'),
  passwordRepeat: yup
    .string()
    .required('Field "Confirm Password" is required')
    .oneOf([yup.ref('password')], 'Passwords must match!'),
  img: yup
    .mixed<FileList>()
    .test('required', 'Field "Image" is required', (file) => Boolean(file))
    .test('size', 'The image size should not be more than "300kB"', (files) => {
      if (!files || !files[0]) return false;

      return files[0].size <= 307200;
    })
    .test('type', 'The image must be in "PNG" or "JPEG" format', (files) => {
      if (!files || !files[0]) return false;

      return files[0].type === 'image/jpeg' || files[0].type === 'image/png';
    }),
  country: yup
    .string()
    .required('Field "Country" is required')
    .test('includes in list', "Country doesn't exist", (text) => {
      const allCountries = countries.map((country) => country.toLowerCase());
      return allCountries.includes(text.toLowerCase());
    }),
  t_c: yup
    .boolean()
    .test('accepted-t_c', 'Field "T&C" must be accepted', (checked) => checked),
});
