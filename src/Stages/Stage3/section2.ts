import { State } from '../..';
import { ValuationTranslation } from '../../translation';
import { Valuation } from './stage3';

interface ValuationRowProps {
  heading?: string;
  description: string;
  postDescription?: string;
  onClick: () => void;
}

const ValuationRow = ({ heading, description, postDescription, onClick }: ValuationRowProps) => {
  const row = document.createElement('div');
  row.className = 'repeat-m-half';

  const rowBox = document.createElement('div');
  rowBox.setAttribute('data-ecom-box', 'light');

  if (heading) {
    const rowBoxH2 = document.createElement('h2');
    rowBoxH2.className = 'h6';
    rowBoxH2.innerText = heading;

    rowBox.appendChild(rowBoxH2);
  }

  const rowBoxContent = document.createElement('div');
  rowBoxContent.setAttribute('data-ecom-content', '');

  const _description = document.createElement('b');
  _description.innerText = description;
  rowBoxContent.appendChild(_description);

  if (postDescription) {
    const _postDescription = document.createElement('span');
    _postDescription.innerText = postDescription;
    rowBoxContent.appendChild(_postDescription);
  }

  rowBox.appendChild(rowBoxContent);

  const rowBoxFooter = document.createElement('div');
  rowBoxFooter.className = 'box-footer box-footer-right';

  const button = document.createElement('button');
  button.setAttribute('data-ecom-button', 'small');
  button.innerText = 'Ändra';
  button.addEventListener('click', onClick);

  rowBoxFooter.appendChild(button);

  rowBox.appendChild(rowBoxFooter);

  row.appendChild(rowBox);

  return row;
};

interface Section2Props {
  state: State;
  valuation: Valuation;
  changeStage1: () => void;
  changeStage2: () => void;
}

const section2 = ({ state, valuation, changeStage1, changeStage2 }: Section2Props) => {
  const _section2 = document.createElement('section');
  _section2.className = 'page-section page-section-accent';

  const { manufacturer, modelSeries, modelYear, gearboxType, fuelType, segment } = valuation;

  const row1 = ValuationRow({
    heading: `${state.stage1.registrationNumber}, ${state.stage1.milage}`,
    description: `${manufacturer} ${modelSeries}`,
    postDescription: [modelYear, gearboxType, fuelType, segment].join(', '),
    onClick: changeStage1,
  });

  _section2.appendChild(row1);

  if (state.stage2.condition) {
    const row2 = ValuationRow({
      description: ValuationTranslation[state.stage2.condition],
      onClick: changeStage2,
    });

    _section2.appendChild(row2);
  }

  return _section2;
};

export default section2;
