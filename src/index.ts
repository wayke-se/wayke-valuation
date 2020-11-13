import './Public/styles/default.css';

import timeline from './Timeline/timeline';
import stage1, { Stage1State } from './Stage1/stage1';
import stage2, { ConditionType, Stage2State } from './Stage2/stage2';
import stage3 from './Stage3/stage3';
import modal from './Modal/modal';
import header from './Header/header';

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
  };

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
    timeline(state.currentStage);
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
    timeline(state.currentStage);
    clearPageChildren();
    stage2(state.stage2, onNext, onBack);
  };

  const initializeStage3 = () => {
    state = {
      ...state,
      currentStage: 3,
    };
    const onNext = () => {};

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
    timeline(state.currentStage);
    stage3(state, onNext, onBack, onChangeStage1, onChangeStage2);
  };

  initializeStage1();
});
