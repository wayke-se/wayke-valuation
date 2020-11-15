import fieldValidation from '../../fieldValidation';

const validationMethods = {
  firstName: fieldValidation.requiredString,
  lastName: fieldValidation.requiredString,
  email: fieldValidation.requiredString,
  phone: fieldValidation.requiredString,
  whenToSell: fieldValidation.requiredMilage,
  confirmTerms: fieldValidation.requiredTrue,
};

export default validationMethods;
