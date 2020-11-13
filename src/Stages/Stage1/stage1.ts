import section1 from './section1';
import section2 from './section2';
import Section3 from './section3';
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

export interface LocalState1 {
  value: Stage1State;
  validation: Stage1Validation;
  interact: Stage1Validation;
}

const stage1 = (state: Stage1State, onNext: (_stage1: Stage1State) => void) => {
  const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;
  const value = { ...state };
  const localState: LocalState1 = {
    value,
    validation: {
      registrationNumber: validationMethods.registrationNumber(value.registrationNumber),
      milage: validationMethods.milage(value.milage),
      description: validationMethods.description(value.description),
    },
    interact: { registrationNumber: false, milage: false, description: false },
  };

  if (element) {
    const pageMain = document.createElement('div');
    pageMain.className = 'page-main';

    pageMain.appendChild(section1());

    pageMain.appendChild(
      section2({
        localState,
      })
    );

    const section3 = Section3({
      onClick: () => onNext(localState.value),
    });

    pageMain.appendChild(section3);

    element.appendChild(pageMain);
  }
};

export default stage1;
