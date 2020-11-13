import './Public/styles/default.css';

import header from './Header/header';
import stage1, { Stage1State } from './Stage1/stage1';
import stage2, { ConditionType, Stage2State } from './Stage2/stage2';
import stage3 from './Stage3/stage3';

const clearElementsChildren = () => {
  const element = document.getElementById('content');
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

  const root = document.getElementById('root');
  const headerElement = document.createElement('div');
  headerElement.id = 'header';
  const content = document.createElement('div');
  content.id = 'content';

  root?.appendChild(headerElement);
  root?.appendChild(content);

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

    clearElementsChildren();
    header(state.currentStage);
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

    header(state.currentStage, onBack);
    clearElementsChildren();
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

    clearElementsChildren();
    header(state.currentStage, onBack);
    stage3(state, onNext, onBack, onChangeStage1, onChangeStage2);
  };

  initializeStage1();
});
