const headerStage = (
  element: HTMLElement,
  heading: string,
  stage: number,
  currentStage: number
) => {
  const li = document.createElement('li');
  li.classList.add('timeline-item');

  if (stage === currentStage) {
    li.classList.add('is-active');
  }

  const indicator = document.createElement('div');
  indicator.className = 'timeline-indicator';

  const label = document.createElement('div');
  label.className = 'timeline-label';
  label.innerText = `${stage}. ${heading}`;

  li.appendChild(indicator);
  li.appendChild(label);

  element.appendChild(li);
};

class Timeline {
  remove = () => {
    const timelineElement = document.querySelector('[data-ecom-timeline]') as HTMLElement | null;
    if (timelineElement) {
      timelineElement.innerHTML = '';
    }
  };
  render = (stage: number) => {
    const timelineElement = document.querySelector('[data-ecom-timeline]') as HTMLElement | null;
    if (timelineElement) {
      if (!timelineElement?.childElementCount) {
        const _timeline = document.createElement('div');
        _timeline.className = 'timeline';

        const ul = document.createElement('ul');
        ul.className = 'timeline-list';

        headerStage(ul, 'Beskriv bilen', 1, stage);
        headerStage(ul, 'Skicka', 2, stage);
        headerStage(ul, 'Värderingen', 3, stage);

        _timeline.appendChild(ul);
        timelineElement.appendChild(_timeline);
      } else {
        timelineElement.querySelectorAll('li').forEach((el, i) => {
          if (i === stage - 1) {
            el.classList.add('is-active');
          } else {
            el.classList.remove('is-active');
          }
        });
      }
    }
  };
}

export default Timeline;
