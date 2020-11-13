import SectionHeading from '../../Components/SectionHeading';
import section2 from './section2';

export type ConditionType = 'GOOD' | 'BAD' | 'OK';

export interface Stage2State {
  condition?: ConditionType;
}

const stage2 = (state: Stage2State, onNext: (condition: ConditionType) => void) => {
  const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;
  if (element) {
    const pageMain = document.createElement('div');
    pageMain.className = 'page-main';

    const section1 = SectionHeading({
      header: 'Hur är bilens skick?',
      body: 'Välj det alternativ som passar bilens skick bäst.',
    });
    pageMain.appendChild(section1);

    const _section2 = section2(onNext);
    pageMain.appendChild(_section2);

    element.appendChild(pageMain);
  }
};

export default stage2;
