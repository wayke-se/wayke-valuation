import fieldValidation from '../../fieldValidation';

const validationMethods = {
  fname: fieldValidation.requiredString,
  lname: fieldValidation.requiredString,
  email: fieldValidation.requiredEmail,
  phone: fieldValidation.optionalString,
  branchId: fieldValidation.requiredString,
  whenToSell: fieldValidation.requiredWhenToSell,
  description: fieldValidation.optionalString,
};

export default validationMethods;
