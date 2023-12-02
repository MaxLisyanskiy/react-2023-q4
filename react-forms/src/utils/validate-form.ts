import { ValidationError } from 'yup';
import { validationSchema } from '../shared/validation-schema';

interface ValidatingFormData {
  [key: string]: string | number | boolean | undefined | null | FileList;
}

interface ValidateData {
  t_c: boolean;
  name: string;
  email: string;
  age: number;
  gender: string;
  password: string;
  passwordRepeat: string;
  img: File;
  country: string;
}

interface ValidatingFormReturns {
  isValidated: boolean;
  validatedData?: ValidateData;
  errorMessages: Record<string, string>;
}

export const validatingForm = async (
  data: ValidatingFormData,
): Promise<ValidatingFormReturns> => {
  try {
    const validatedForm = (await validationSchema.validate(data, {
      abortEarly: false,
    })) as ValidateData;

    return {
      isValidated: true,
      validatedData: validatedForm,
      errorMessages: {},
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      const yupErros: Record<string, string> = {};

      error.inner.forEach((err) => {
        if (typeof err.path === 'string') {
          yupErros[err.path] = err.message;
        }
      });
      return { isValidated: false, errorMessages: yupErros };
    }

    return { isValidated: false, errorMessages: {} };
  }
};
