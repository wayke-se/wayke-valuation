import fieldValidation from '../../fieldValidation';

const validationMethods = {
  firstName: fieldValidation.requiredString,
  lastName: fieldValidation.requiredString,
  email: fieldValidation.requiredEmail,
  phoneNumber: fieldValidation.optionalPhone,
  branchId: fieldValidation.requiredString,
  whenToSell: fieldValidation.requiredWhenToSell,
  description: fieldValidation.optionalString,
  confirmTerms: fieldValidation.requiredTrue,
};

export default validationMethods;
