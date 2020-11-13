import { State } from '..';
import { resultFrame } from '../elements';
import { ValuationTranslation } from '../translation';

interface Valuation {
  manufacturer: string;
  modelSeries: string;
  modelYear: number;
  gearboxType: string;
  fuelType: string;
  segment: string;
  estimatedValue: number;
}

const fetchData = async (_state: State) =>
  new Promise<Valuation>((resolve) => {
    setTimeout(
      resolve.bind(null, {
        manufacturer: 'Volvo',
        modelSeries: 'V60',
        modelYear: 2016,
        gearboxType: 'Automat',
        fuelType: 'Diesel',
        segment: 'Liten Kombi',
        estimatedValue: 129000,
      }),
      2000
    );
  });

const stage3 = async (
  state: State,
  onNext: () => void,
  onBack: () => void,
  changeStage1: () => void,
  changeStage2: () => void
) => {
  const element = document.getElementById('content');
  if (element) {
    try {
      const loader = document.createElement('div');
      loader.className = 'loader';
      element.appendChild(loader);

      const response = await fetchData(state);
      const {
        manufacturer,
        modelSeries,
        modelYear,
        gearboxType,
        fuelType,
        segment,
        estimatedValue,
      } = response;

      element.removeChild(loader);
      const heading = document.createElement('h2');
      heading.innerText = 'Uppskattat försäljningspris';
      element.appendChild(heading);

      const description = document.createElement('p');
      description.innerText = 'Nedan ser du vårt uppskattade värde av din bil.';
      element.appendChild(description);

      const stage1ResultButton = document.createElement('button');
      stage1ResultButton.innerText = 'Ändra';
      stage1ResultButton.addEventListener('click', () => changeStage1());
      const stage1Result = resultFrame({
        heading: `${state.stage1.registrationNumber}, ${state.stage1.milage}`,
        description: `${manufacturer} ${modelSeries}`,
        postDescription: [modelYear, gearboxType, fuelType, segment].join(', '),
        buttonElement: stage1ResultButton,
      });
      element.appendChild(stage1Result);

      if (state.stage2.condition) {
        const stage2ResultButton = document.createElement('button');
        stage2ResultButton.innerText = 'Ändra';
        stage2ResultButton.addEventListener('click', () => changeStage2());
        const stage2Result = resultFrame({
          description: ValuationTranslation[state.stage2.condition],
          buttonElement: stage2ResultButton,
        });
        element.appendChild(stage2Result);
      }

      const esitmatedValueContainer = document.createElement('div');
      esitmatedValueContainer.className = 'box';
      esitmatedValueContainer.innerText = `${estimatedValue}`;

      element.appendChild(esitmatedValueContainer);
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  }
};

export default stage3;
