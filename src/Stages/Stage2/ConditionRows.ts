import { ConditionType } from '../../@types/ConditionType';

interface ConditionRow {
  condition: ConditionType;
  header: string;
  usp: string[];
}

const ConditionRows: ConditionRow[] = [
  {
    condition: 'veryGood',
    header: 'Mycket bra skick',
    usp: [
      'Inga repor eller skador',
      'Servad vid varje tillfälle med stämplar i serviceboken',
      'Däck med väldigt bra (mönsterdjup 5-8 mm)',
    ],
  },
  {
    condition: 'good',
    header: 'Bra skick',
    usp: [
      'Några mindre repor och/eller skador',
      'Servad vid varje tillfälle med stämplar i serviceboken',
      'Däck som inte behöver bytas (mönsterdjup om 3-5 mm)',
    ],
  },
  {
    condition: 'ok',
    header: 'Helt okej skick',
    usp: [
      'Finns en del repor och skador',
      'Inte servad vid varje tillfälle',
      'Däck som behöver bytas (mönsterdjup under 3mm)',
    ],
  },
];

export default ConditionRows;
