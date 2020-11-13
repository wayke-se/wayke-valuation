import Input from '../../Components/Input';
import InputContainer from '../../Components/InputContainer';
import { clearInputContainerError, setInputContainerError } from '../../elements';
import { LocalStage4, Contact } from './stage4';
import validationMethods from './validationMethods';

interface Section2Props {
  localState: LocalStage4;
}

const section2 = ({ localState }: Section2Props) => {
  const section = document.createElement('section');
  section.className = 'page-section';

  const onChange = (e: Event) => {
    if (e.currentTarget) {
      const currentTarget = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const name = currentTarget.name as keyof Contact;
      localState.value[name] = currentTarget.value;
      localState.validation[name] = validationMethods[name](localState.value[name]);

      if (localState.interact[name] && currentTarget.parentElement) {
        if (!localState.validation[name]) {
          setInputContainerError(currentTarget.parentElement, 'Fel');
        } else {
          clearInputContainerError(currentTarget.parentElement);
        }
      }
    }
  };

  const onBlur = (e: Event) => {
    if (e.currentTarget) {
      const currentTarget = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const name = currentTarget.name as keyof Contact;
      localState.validation[name] = validationMethods[name](localState.value[name]);
      if (!localState.interact[name]) {
        localState.interact[name] = true;
      }
      if (localState.interact[name] && currentTarget.parentElement) {
        if (!localState.validation[name]) {
          setInputContainerError(currentTarget.parentElement, 'Fel');
        } else {
          clearInputContainerError(currentTarget.parentElement);
        }
      }
    }
  };

  InputContainer({
    element: section,
    htmlFor: 'wayke-contact-first-name',
    heading: 'Förnamn',
    inputElement: Input({
      id: 'wayke-contact-first-name',
      value: localState.value.firstName,
      name: 'firstName',
      autoComplete: 'off',
      onChange,
      onBlur,
    }),
  });

  InputContainer({
    element: section,
    htmlFor: 'wayke-contact-last-name',
    heading: 'Efternamn',
    inputElement: Input({
      id: 'wayke-contact-last-name',
      value: localState.value.lastName,
      name: 'lastName',
      autoComplete: 'off',
      onChange,
      onBlur,
    }),
  });

  InputContainer({
    element: section,
    htmlFor: 'wayke-contact-email',
    heading: 'E-postadress',
    inputElement: Input({
      id: 'wayke-contact-email',
      value: localState.value.email,
      name: 'email',
      autoComplete: 'off',
      onChange,
      onBlur,
    }),
  });

  InputContainer({
    element: section,
    htmlFor: 'wayke-contact-phone',
    heading: 'Telefonnummer',
    inputElement: Input({
      id: 'wayke-contact-phone',
      value: localState.value.phone,
      name: 'phone',
      autoComplete: 'off',
      onChange,
      onBlur,
    }),
  });

  return section;
};

export default section2;
