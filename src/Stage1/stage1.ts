import {
  clearInputContainerError,
  createInput,
  createInputContainer,
  createOption,
  createSelect,
  createTextArea,
  setInputContainerError,
} from '../elements';
import validationMethods from './validationMethods';

export interface Stage1Validation {
  registrationNumber: boolean;
  milage: boolean;
  description: boolean;
}

export interface Stage1State {
  registrationNumber: string;
  milage: string;
  description: string;
}

const STAGE1_BUTTON_NEXT = 'STAGE1_BUTTON_NEXT';

interface LocalState {
  value: Stage1State;
  validation: Stage1Validation;
  interact: Stage1Validation;
}

const stage1 = (state: Stage1State, onNext: (_stage1: Stage1State) => void) => {
  const element = document.getElementById('content');
  const value = { ...state };
  const localState: LocalState = {
    value,
    validation: {
      registrationNumber: validationMethods.registrationNumber(value.registrationNumber),
      milage: validationMethods.milage(value.milage),
      description: validationMethods.description(value.description),
    },
    interact: { registrationNumber: false, milage: false, description: false },
  };

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

  if (element) {
    const heading = document.createElement('h2');
    heading.innerText = 'Värdera bilen gratis';
    element.appendChild(heading);

    const description = document.createElement('p');
    description.innerText =
      'Har du en bil du vill få värderad? Beskriv din bil så gervi dig ett uppskattat försäljningspris. Du förbrinder dig inte till något. Skriv in regrn, mätarställning samt beskrivning av din bil.';
    element.appendChild(description);

    createInputContainer({
      element,
      heading: 'Registreringsnummer',
      inputElement: createInput({
        value: state.registrationNumber,
        name: 'registrationNumber',
        autoComplete: 'off',
        onChange,
        onBlur,
      }),
    });

    const select = createSelect({ value: state.milage, name: 'milage', onChange });
    const option1 = createOption({
      value: '1',
      displayName: '0 - 5000 mil',
      selected: '1' === state.milage || undefined,
    });
    const option2 = createOption({
      value: '2',
      displayName: '5001 - 10000 mil',
      selected: '2' === state.milage || undefined,
    });
    const option3 = createOption({
      value: '3',
      displayName: '10001 - 15000 mil',
      selected: '3' === state.milage || undefined,
    });
    const option4 = createOption({
      value: '4',
      displayName: 'mer än 1500 mil',
      selected: '4' === state.milage || undefined,
    });

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);

    createInputContainer({
      element,
      heading: 'Miltal',
      inputElement: select,
    });

    createInputContainer({
      element,
      heading: 'Beskrivning',
      inputElement: createTextArea({
        value: state.description,
        name: 'description',
        onChange,
        onBlur,
      }),
    });

    const button = document.createElement('button');
    button.id = STAGE1_BUTTON_NEXT;
    button.innerText = 'Nästa';
    button.addEventListener('click', () => onNext(localState.value));

    element.appendChild(button);
  }
};

export default stage1;
