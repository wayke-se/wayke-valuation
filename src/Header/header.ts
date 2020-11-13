const HEADER_BACK_BUTTON_ID = 'HEADER_BACK_BUTTON_ID';
const HEADER_STAGE = 'HEADER_STAGE';

const headerStage = (
  element: HTMLElement,
  heading: string,
  stage: number,
  currentStage: number
) => {
  const s = document.createElement('div');
  s.classList.add(HEADER_STAGE);
  s.innerText = `${stage}. ${heading}`;
  if (stage === currentStage) {
    s.classList.add('checked');
  }
  element.appendChild(s);
};

const header = (stage: number, onBack?: () => void) => {
  const headerElement = document.getElementById('header');
  if (headerElement) {
    if (!headerElement?.childElementCount) {
      headerElement.className = 'box';
      headerStage(headerElement, 'Beskriv bilen', 1, stage);
      headerStage(headerElement, 'Skicka', 2, stage);
      headerStage(headerElement, 'Värderingen', 3, stage);
    } else {
      headerElement.querySelectorAll(`.${HEADER_STAGE}`).forEach((el, i) => {
        if (i === stage - 1) {
          el.classList.add('checked');
        } else {
          el.classList.remove('checked');
        }
      });
    }

    if (onBack) {
      const backButtonExist = headerElement.querySelector(`#${HEADER_BACK_BUTTON_ID}`);
      if (backButtonExist) {
        headerElement.removeChild(backButtonExist);
      }
      const backButton = document.createElement('button');
      backButton.id = HEADER_BACK_BUTTON_ID;
      backButton.innerText = 'Tillbaka';
      backButton.addEventListener('click', onBack);
      headerElement?.prepend(backButton);
    } else {
      const backButton = headerElement.querySelector(`#${HEADER_BACK_BUTTON_ID}`);
      if (backButton) {
        headerElement.removeChild(backButton);
      }
    }
  }
};

export default header;
