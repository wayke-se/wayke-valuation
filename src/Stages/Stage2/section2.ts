import { ValuationTranslation } from '../../translation';
import { ConditionType } from './stage2';

interface ConditionRow {
  condition: ConditionType;
  header: string;
  usp: string[];
}

const createRow = (conditionRow: ConditionRow, onSelect: () => void) => {
  const row = document.createElement('div');
  row.className = 'repeat-m-half';

  const rowBox = document.createElement('div');
  rowBox.setAttribute('data-ecom-box', 'light');

  const rowBoxH2 = document.createElement('h2');
  rowBoxH2.className = 'h6';
  rowBoxH2.innerText = ValuationTranslation[conditionRow.condition];

  const rowBoxContent = document.createElement('div');
  rowBoxContent.setAttribute('data-ecom-content', '');

  const rowBoxContentUl = document.createElement('ul');
  conditionRow.usp.forEach((_usp) => {
    const li = document.createElement('li');
    li.innerText = _usp;
    rowBoxContentUl.appendChild(li);
  });

  rowBoxContent.appendChild(rowBoxContentUl);

  const rowBoxFooter = document.createElement('div');
  rowBoxFooter.className = 'box-footer box-footer-right';

  const button = document.createElement('button');
  button.setAttribute('data-ecom-button', 'small');
  button.innerText = 'Välj';
  button.addEventListener('click', onSelect);

  rowBoxFooter.appendChild(button);

  rowBox.appendChild(rowBoxH2);
  rowBox.appendChild(rowBoxContent);
  rowBox.appendChild(rowBoxFooter);

  row.appendChild(rowBox);

  return row;
};

const ConditionRows: ConditionRow[] = [
  {
    condition: 'GOOD',
    header: 'Mycket bra skick',
    usp: [
      'Inga repor eller skador',
      'Servad vid varje tillfälle med stämplar i serviceboken',
      'Däck med väldigt bra (mönsterdjup 5-8 mm)',
    ],
  },
  {
    condition: 'OK',
    header: 'Bra skick',
    usp: [
      'Några mindre repor och/eller skador',
      'Servad vid varje tillfälle med stämplar i serviceboken',
      'Däck som inte behöver bytas (mönsterdjup om 3-5 mm)',
    ],
  },
  {
    condition: 'BAD',
    header: 'Helt okej skick',
    usp: [
      'Finns en del repor och skador',
      'Inte servad vid varje tillfälle',
      'Däck som behöver bytas (mönsterdjup under 3mm)',
    ],
  },
];

const section2 = (onNext: (condition: ConditionType) => void) => {
  const _section2 = document.createElement('section');
  _section2.className = 'page-section page-section-accent';

  ConditionRows.forEach((conditionRow) =>
    _section2.appendChild(createRow(conditionRow, () => onNext(conditionRow.condition)))
  );

  return _section2;
};

export default section2;
