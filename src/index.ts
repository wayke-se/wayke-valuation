import './Public/styles/default.css';
import App from './Components/App';

window.addEventListener('DOMContentLoaded', (_) => {
  const app = new App({
    api: {
      address: 'https://ecom.wayketech.se',
      authority: 'ecom.wayketech.se',
    },
  });

  const button = document.createElement('button');
  button.textContent = 'Start Wayke valuation';
  button.addEventListener('click', () => app.render());
  document.body.append(button);
});
