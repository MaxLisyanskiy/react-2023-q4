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
    .required('Field "Age" is required')
    .integer('Field "Age" must be an integer')
    .positive('Field "Age" must be a positive number'),
  gender: yup.string().required('Field "Gender" is required'),
  password: yup
    .string()
    .required('Field "Password" is required')
    .matches(
      /^(?=.*[a-zа-я])/,
      'Password must contain at least one lowercase letter',
    )
    .matches(
      /^(?=.*[A-ZА-Я])/,
      'Password must contain at least one uppercase letter',
    )
    .matches(/^(?=.*[0-9])/, 'Password must contain at least one number')
    .matches(
      /^(?=.*[!@#%&$^*()?><|+=])/,
      'Password must contain at least one special character',
    ),
  passwordRepeat: yup
    .string()
    .required('Field "Confirm Password" is required')
    .oneOf([yup.ref('password')], 'Passwords must match!'),
  img: yup
    .mixed<File>()
    .test('required', 'Field "Image" is required', (file) => Boolean(file))
    .test('size', 'The image size should not be more than "300kB"', (file) => {
      if (!file) return false;

      return file.size <= 30720;
    })
    .test('type', 'The image must be in "PNG" or "JPEG" format', (file) => {
      if (!file) return false;

      return file.type === 'image/jpeg' || file.type === 'image/png';
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
