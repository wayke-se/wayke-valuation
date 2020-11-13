import Input from '../../Components/Input';
import InputContainer from '../../Components/InputContainer';
import Option from '../../Components/Option';
import { Select } from '../../Components/Select';
import { SelectContainer } from '../../Components/SelectContainer';
import TextArea from '../../Components/TextArea';
import { clearInputContainerError, setInputContainerError } from '../../elements';
import { LocalState1, Stage1State } from './stage1';
import validationMethods from './validationMethods';

interface Stage2Props {
  localState: LocalState1;
}

const stage2 = ({ localState }: Stage2Props) => {
  const onChange = (e: Event) => {
    if (e.currentTarget) {
      const currentTarget = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const name = currentTarget.name as keyof Stage1State;
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
      const name = currentTarget.name as keyof Stage1State;
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

  const section = document.createElement('section');
  section.className = 'page-section';

  InputContainer({
    element: section,
    htmlFor: 'wayke-valuation-registration-number',
    heading: 'Registreringsnummer',
    inputElement: Input({
      id: 'wayke-valuation-registration-number',
      value: localState.value.registrationNumber,
      name: 'registrationNumber',
      autoComplete: 'off',
      onChange,
      onBlur,
    }),
  });

  const select = Select({ value: localState.value.milage, name: 'milage', onChange });
  const option1 = Option({
    value: '1',
    displayName: '0 - 5000 mil',
    selected: '1' === localState.value.milage || undefined,
  });
  const option2 = Option({
    value: '2',
    displayName: '5001 - 10000 mil',
    selected: '2' === localState.value.milage || undefined,
  });
  const option3 = Option({
    value: '3',
    displayName: '10001 - 15000 mil',
    selected: '3' === localState.value.milage || undefined,
  });
  const option4 = Option({
    value: '4',
    displayName: 'mer än 1500 mil',
    selected: '4' === localState.value.milage || undefined,
  });

  select.appendChild(option1);
  select.appendChild(option2);
  select.appendChild(option3);
  select.appendChild(option4);

  SelectContainer({
    element: section,
    htmlFor: 'wayke-valuation-select',
    heading: 'Miltal',
    inputElement: select,
  });

  InputContainer({
    element: section,
    htmlFor: 'wayke-valuation-description',
    heading: 'Beskrivning',
    inputElement: TextArea({
      id: 'wayke-valuation-description',
      value: localState.value.description,
      name: 'description',
      onChange,
      onBlur,
    }),
  });

  return section;
};

export default stage2;
