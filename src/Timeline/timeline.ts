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

const timeline = (stage: number) => {
  const timelineElement = document.querySelector('[data-ecom-timeline]') as HTMLElement | null;
  if (timelineElement) {
    if (!timelineElement?.childElementCount) {
      timelineElement.className = 'box';
      headerStage(timelineElement, 'Beskriv bilen', 1, stage);
      headerStage(timelineElement, 'Skicka', 2, stage);
      headerStage(timelineElement, 'Värderingen', 3, stage);
    } else {
      timelineElement.querySelectorAll(`.${HEADER_STAGE}`).forEach((el, i) => {
        if (i === stage - 1) {
          el.classList.add('checked');
        } else {
          el.classList.remove('checked');
        }
      });
    }
  }
};

export default timeline;
