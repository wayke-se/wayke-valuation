import './Public/styles/default.css';
import App from './Components/App';
import { Branch } from './@types/Settings';

window.addEventListener('DOMContentLoaded', (_) => {
  const {
    WAYKE_BRANCHES,
    WAYKE_CONDITION_REDUCTION_VERY_GOOD,
    WAYKE_CONDITION_REDUCTION_GOOD,
    WAYKE_CONDITION_REDUCTION_OK,
  } = process.env;
  // eslint-disable-next-line
  const app = new App({
    branches: (WAYKE_BRANCHES as unknown) as Branch[],
    conditionReduction: {
      veryGood: (WAYKE_CONDITION_REDUCTION_VERY_GOOD as unknown) as number,
      good: (WAYKE_CONDITION_REDUCTION_GOOD as unknown) as number,
      ok: (WAYKE_CONDITION_REDUCTION_OK as unknown) as number,
    },
  });

  /*
  const button = document.createElement('button');
  button.textContent = 'Start Wayke valuation';
  button.addEventListener('click', () => app.render());
  document.body.append(button);
  */
});
