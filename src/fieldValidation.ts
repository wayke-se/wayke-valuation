import { regexReg } from './regex';

const fieldValidation = {
  requiredRegistrationNumber: (s?: string) => regexReg.test(s || ''),
  requiredMilage: (s?: string) => ['1', '2', '3', '4'].includes(s || ''),
  requiredString: (s?: string) => !!s,
};

export default fieldValidation;
