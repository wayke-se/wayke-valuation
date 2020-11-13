import { createFrame } from '../elements';

export type ConditionType = 'GOOD' | 'BAD' | 'OK';

export interface Stage2State {
  condition?: ConditionType;
}

const stage2 = (
  state: Stage2State,
  onNext: (condition: ConditionType) => void,
  onBack: () => void
) => {
  const element = document.getElementById('content');
  if (element) {
    const frame1Button = document.createElement('button');
    frame1Button.innerText = 'Välj';
    frame1Button.addEventListener('click', () => onNext('GOOD'));

    const frame2Button = document.createElement('button');
    frame2Button.innerText = 'Välj';
    frame2Button.addEventListener('click', () => onNext('OK'));

    const frame3Button = document.createElement('button');
    frame3Button.innerText = 'Välj';
    frame3Button.addEventListener('click', () => onNext('BAD'));

    const frame1 = createFrame({
      heading: 'Mycket bra skick',
      usp: [
        'Inga repor eller skador',
        'Servad vid varje tillfälle med stämplar i serviceboken',
        'Däck med väldigt bra (mönsterdjup 5-8 mm)',
      ],
      buttonElement: frame1Button,
    });

    const frame2 = createFrame({
      heading: 'Bra skick',
      usp: [
        'Några mindre repor och/eller skador',
        'Servad vid varje tillfälle med stämplar i serviceboken',
        'Däck som inte behöver bytas (mönsterdjup om 3-5 mm)',
      ],
      buttonElement: frame2Button,
    });

    const frame3 = createFrame({
      heading: 'Helt okej skick',
      usp: [
        'Finns en del repor och skador',
        'Inte servad vid varje tillfälle',
        'Däck som behöver bytas (mönsterdjup under 3mm)',
      ],
      buttonElement: frame3Button,
    });

    element.appendChild(frame1);
    element.appendChild(frame2);
    element.appendChild(frame3);

    const backButton = document.createElement('button');
    backButton.innerText = 'Tillbaka';
    backButton.addEventListener('click', onBack);

    element.appendChild(backButton);
  }
};

export default stage2;
