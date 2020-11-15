import './Public/styles/default.css';
import App from './Components/App';

window.addEventListener('DOMContentLoaded', (_) => {
  const app = new App({
    api: {
      address: 'https://ecom.wayketech.se',
      authority: 'ecom.wayketech.se',
    },
  });
  app.render();
  return;
});
