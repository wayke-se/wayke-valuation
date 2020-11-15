import { regexReg } from './regex';

const fieldValidation = {
  requiredRegistrationNumber: (s?: string) => regexReg.test(s || ''),
  requiredMilage: (s?: string) => ['1', '2', '3', '4'].includes(s || ''),
  requiredWhenToSell: (s?: string) => ['1', '2', '3', '4'].includes(s || ''),
  requiredString: (s?: string) => !!s,
  optionalString: (s?: string) => !s || !!s,
  requiredTrue: (s?: boolean) => s === true,
};

export default fieldValidation;
