import { regexReg } from './regex';

const fieldValidation = {
  requiredRegistrationNumber: (s?: string) => regexReg.test(s || ''),
  requiredNumberGreaterOrEqualThanZero: (s?: string | number) => {
    if (s === undefined || s === null) {
      return false;
    }
    const f = parseInt(s.toString(), 10);
    return f !== NaN && f >= 0;
  },
  requiredWhenToSell: (s?: string) => ['1', '2', '3', '4'].includes(s || ''),
  requiredString: (s?: string) => !!s,
  optionalString: (s?: string) => !s || !!s,
  requiredTrue: (s?: boolean) => s === true,
};

export default fieldValidation;
