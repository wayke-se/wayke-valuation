import fieldValidation from '../../fieldValidation';

const validationMethods = {
  firstName: fieldValidation.requiredString,
  lastName: fieldValidation.requiredString,
  email: fieldValidation.requiredString,
  phone: fieldValidation.requiredString,
  whenToSell: fieldValidation.requiredWhenToSell,
  confirmTerms: fieldValidation.requiredTrue,
};

export default validationMethods;
