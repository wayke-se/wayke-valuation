import fieldValidation from '../../fieldValidation';

const validationMethods = {
  registrationNumber: fieldValidation.requiredRegistrationNumber,
  milage: fieldValidation.requiredMilage,
  description: fieldValidation.optionalString,
};

export default validationMethods;
