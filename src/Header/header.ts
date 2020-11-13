import Logo from '../Public/images/wayke-logo.svg';

const header = (onBack?: () => void) => {
  const headerElement = document.querySelector('[data-ecom-header]') as HTMLElement | null;
  if (!headerElement?.childElementCount) {
    const _header = document.createElement('div');
    _header.className = 'header';

    const headerAction = document.createElement('div');
    headerAction.className = 'header-action';

    const headerLogoContainer = document.createElement('div');
    headerLogoContainer.className = 'header-logo-container';

    const img = document.createElement('img');
    img.src = Logo;
    img.className = 'header-logo';
    img.alt = 'Logotype';
    headerLogoContainer.appendChild(img);

    const headerAction2 = document.createElement('div');
    headerAction2.className = 'header-action';

    _header.appendChild(headerAction);
    _header.appendChild(headerLogoContainer);
    _header.appendChild(headerAction2);

    headerElement?.appendChild(_header);
  }

  if (headerElement) {
    const headerAction1 = headerElement.querySelectorAll('.header-action')?.[0];

    if (headerAction1) {
      if (headerAction1.childElementCount) {
        headerAction1.innerHTML = '';
      }
      if (onBack) {
        const backButton = document.createElement('button');
        backButton.innerText = 'Tillbaka';
        backButton.addEventListener('click', onBack);
        headerAction1.appendChild(backButton);
      }
    }
  }
};

export default header;
