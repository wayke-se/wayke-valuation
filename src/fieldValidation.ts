import { registrationNumberReg, emailReg } from './regex';

const fieldValidation = {
  requiredRegistrationNumber: (s?: string) => registrationNumberReg.test(s || ''),
  requiredNumberGreaterOrEqualThanZero: (s?: string | number) => {
    if (s === undefined || s === null) {
      return false;
    }
    const f = parseInt(s.toString(), 10);
    return !Number.isNaN(f) && f >= 0;
  },
  requiredWhenToSell: (s?: string) => ['1', '2', '3'].includes(s || ''),
  requiredString: (s?: string) => !!s,
  optionalString: (s?: string) => !s || !!s,
  requiredEmail: (s?: string | null) => emailReg.test(s || ''),
  requiredTrue: (s?: boolean) => s === true,
};

export default fieldValidation;
