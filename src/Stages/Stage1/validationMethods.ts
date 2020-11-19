import fieldValidation from '../../fieldValidation';

const validationMethods = {
  registrationNumber: fieldValidation.requiredRegistrationNumber,
  milage: fieldValidation.requiredNumberGreaterOrEqualThanZero,
};

export default validationMethods;
