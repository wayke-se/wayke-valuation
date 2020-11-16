import './Public/styles/default.css';
import App from './Components/App';

window.addEventListener('DOMContentLoaded', (_) => {
  const {
    WAYKE_BRANCH_ID,
    WAYKE_VALUATION_ADDRESS,
    WAYKE_CONDITION_REDUCTION_VERY_GOOD,
    WAYKE_CONDITION_REDUCTION_GOOD,
    WAYKE_CONDITION_REDUCTION_OK,
  } = process.env;
  const app = new App({
    branchId: WAYKE_BRANCH_ID as string,
    valuationAddress: WAYKE_VALUATION_ADDRESS as string,
    conditionReduction: {
      VeryGood: (WAYKE_CONDITION_REDUCTION_VERY_GOOD as unknown) as number,
      Good: (WAYKE_CONDITION_REDUCTION_GOOD as unknown) as number,
      Ok: (WAYKE_CONDITION_REDUCTION_OK as unknown) as number,
    },
  });

  const button = document.createElement('button');
  button.textContent = 'Start Wayke valuation';
  button.addEventListener('click', () => app.render());
  document.body.append(button);
});
