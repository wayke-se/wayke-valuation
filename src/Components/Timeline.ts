class Timeline {
  changeStage(stage: number) {
    const timelineElement = document.querySelector('#timeline-wrapper') as HTMLElement | null;
    if (timelineElement) {
      timelineElement.querySelectorAll('li').forEach((el, i) => {
        if (i === stage - 1) {
          el.classList.add('is-active');
        } else {
          el.classList.remove('is-active');
        }
      });
    }
  }

  remove() {
    const timelineElement = document.querySelector('#timeline-wrapper') as HTMLElement | null;
    if (timelineElement) {
      timelineElement.innerHTML = '';
    }
  }

  render() {
    const timelineElement = document.querySelector('#timeline-wrapper') as HTMLElement | null;
    if (timelineElement) {
      timelineElement.innerHTML = `
        <div data-wayke-valuation-timeline>
            <div class="timeline">
                <ul class="timeline-list">
                    <li class="timeline-item is-active">
                        <div class="timeline-indicator"></div>
                        <div class="timeline-label">1. Beskriv bilen</div>
                    </li>
                    <li class="timeline-item">
                        <div class="timeline-indicator"></div>
                        <div class="timeline-label">2. Skick</div>
                    </li>
                    <li class="timeline-item">
                        <div class="timeline-indicator"></div>
                        <div class="timeline-label">3. Värdering</div>
                    </li>
                </ul>
            </div>
        </div>
      `;
    }
  }
}

export default Timeline;
