import fieldValidation from '../../fieldValidation';

const validationMethods = {
  registrationNumber: fieldValidation.requiredRegistrationNumber,
  milage: fieldValidation.requiredNumberGreaterOrEqualThanZero,
  description: fieldValidation.optionalString,
};

export default validationMethods;
