import { registrationNumberReg, emailReg, phoneReg } from './regex';

const fieldValidation = {
  requiredRegistrationNumber: (s?: string) => registrationNumberReg.test(s || ''),
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
  optionalPhone: (s?: string | null) => !s || phoneReg.test(s || ''),
  requiredEmail: (s?: string | null) => emailReg.test(s || ''),
  requiredTrue: (s?: boolean) => s === true,
};

export default fieldValidation;
