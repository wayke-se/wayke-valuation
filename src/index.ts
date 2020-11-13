import './Public/styles/default.css';

import Timeline from './Timeline/timeline';
import stage1, { Stage1State } from './Stages/Stage1/stage1';
import stage2, { ConditionType, Stage2State } from './Stages/Stage2/stage2';
import stage3 from './Stages/Stage3/stage3';
import stage4, { Contact } from './Stages/Stage4/stage4';
import modal from './Modal/modal';
import header from './Header/header';
import stage5 from './Stages/Stage5/stage5';

const clearPageChildren = () => {
  const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;
  if (element) {
    element.innerHTML = '';
  }
};

export interface State {
  currentStage: number;
  stage1: Stage1State;
  stage2: Stage2State;
  stage4: Contact;
}

window.addEventListener('DOMContentLoaded', (_) => {
  let state: State = {
    currentStage: 1,
    stage1: {
      registrationNumber: 'NYA710',
      milage: '1',
      description: '',
    },
    stage2: {},
    stage4: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  };

  const _timeline = new Timeline();

  modal();
  const initializeStage1 = () => {
    state = {
      ...state,
      currentStage: 1,
    };
    const onNext = (_stage1: Stage1State) => {
      state = {
        ...state,
        currentStage: 2,
        stage1: { ..._stage1 },
      };
      initializeStage2();
    };

    clearPageChildren();
    header();
    // timeline(state.currentStage);
    _timeline.render(state.currentStage);
    stage1(state.stage1, onNext);
  };

  const initializeStage2 = () => {
    state = {
      ...state,
      currentStage: 2,
    };
    const onNext = (condition: ConditionType) => {
      state = {
        ...state,
        currentStage: 3,
        stage2: {
          condition,
        },
      };
      initializeStage3();
    };

    const onBack = () => {
      initializeStage1();
    };

    header(onBack);
    // timeline(state.currentStage);
    _timeline.render(state.currentStage);
    clearPageChildren();
    stage2(state.stage2, onNext);
  };

  const initializeStage3 = () => {
    state = {
      ...state,
      currentStage: 3,
    };
    const onNext = () => {
      state = {
        ...state,
        currentStage: 4,
      };
      initializeStage4();
    };

    const onBack = () => {
      initializeStage2();
    };

    const onChangeStage1 = () => {
      initializeStage1();
    };

    const onChangeStage2 = () => {
      initializeStage2();
    };

    clearPageChildren();
    header(onBack);
    // timeline(state.currentStage);
    _timeline.render(state.currentStage);
    stage3(state, onNext, onChangeStage1, onChangeStage2);
  };

  const initializeStage4 = () => {
    state = {
      ...state,
      currentStage: 4,
    };

    const onNext = () => {
      initializeStage5();
    };

    const onBack = () => {
      initializeStage3();
    };

    clearPageChildren();
    header(onBack);
    _timeline.remove();
    stage4(state, onNext);
  };

  const initializeStage5 = () => {
    state = {
      ...state,
      currentStage: 5,
    };

    clearPageChildren();
    header();
    _timeline.remove();
    stage5();
  };

  initializeStage1();
});
