import fieldValidation from '../../fieldValidation';

const validationMethods = {
  fname: fieldValidation.requiredString,
  lname: fieldValidation.requiredString,
  email: fieldValidation.requiredEmail,
  phone: fieldValidation.optionalPhone,
  branchId: fieldValidation.requiredString,
  whenToSell: fieldValidation.requiredWhenToSell,
  description: fieldValidation.optionalString,
  confirmTerms: fieldValidation.requiredTrue,
};

export default validationMethods;
