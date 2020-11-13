import { State } from '../..';
import Loader from '../../Components/Loader';
import section1 from './section1';
import section2 from './section2';
import section3 from './section3';
import section4 from './section4';
import section5 from './section5';

export interface Valuation {
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
      1000
    );
  });

const stage3 = async (
  state: State,
  onNext: () => void,
  changeStage1: () => void,
  changeStage2: () => void
) => {
  const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;
  if (element) {
    try {
      const pageMain = document.createElement('div');
      pageMain.className = 'page-main';

      const loader = Loader();
      element.appendChild(loader);

      const response = await fetchData(state);
      const { estimatedValue } = response;

      element.removeChild(loader);

      pageMain.appendChild(section1());
      pageMain.appendChild(section2({ state, valuation: response, changeStage1, changeStage2 }));
      pageMain.appendChild(section3({ estimatedValue }));
      pageMain.appendChild(section4());
      pageMain.appendChild(section5({ onClick: onNext }));

      element.appendChild(pageMain);
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  }
};

export default stage3;
