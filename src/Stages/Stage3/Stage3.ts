import { Settings } from '../../@types/Settings';
import { Valuation } from '../../@types/Valuation';
import Alert from '../../Components/Alert';
import { AppState } from '../../Components/App';
import Spinner from '../../Components/Spinner';
import { formatPrice } from '../../formats';
import { sendRequest } from '../../Http/http';
import { ValuationTranslation } from '../../translation';

const cache: { [key: string]: Valuation | undefined } = {};
const setCache = (key: string, value: Valuation) => {
  cache[key] = value;
};
const getCache = (key: string) => {
  return cache?.[key] || undefined;
};

const createCacheKey = (state: AppState) =>
  `${state.vehicle.registrationNumber}-${parseInt(state.vehicle.milage, 10) * 10}`;

interface Stage3Props {
  settings: Settings;
  state: AppState;
  changeStage1: () => void;
  changeStage2: () => void;
  onNext: (valuation: Valuation) => void;
}

class Stage3 {
  private response?: Valuation = undefined;
  private props: Stage3Props;
  constructor(props: Stage3Props) {
    this.props = props;
    this.response = getCache(createCacheKey(props.state));
  }

  private async getValuation(state: AppState) {
    const element = document.querySelector('[data-wayke-valuation-page]') as HTMLElement | null;
    if (element) {
      try {
        element.innerHTML = `<div class="page-main">${Spinner()}</div>`;
        const _response = await sendRequest<Valuation>({
          method: 'GET',
          url: `${this.props.settings.url}/wip/extvehicle?regNo=${
            state.vehicle.registrationNumber
          }&km=${parseInt(state.vehicle.milage, 10) * 10}`,
        });
        this.response = _response;
        setCache(createCacheKey(state), this.response);
        this.renderResult();
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    }
  }

  private _onNext() {
    if (this.response) {
      this.props.onNext(this.response);
    }
  }

  private renderResult() {
    const element = document.querySelector('[data-wayke-valuation-page]') as HTMLElement | null;
    if (element && this.response) {
      const { registrationNumber, dataUsed, price } = this.response;
      const {
        manufacturer,
        modelName,
        modelSeries,
        modelYear,
        fuelType,
        gearboxType,
        chassis,
      } = dataUsed;

      const fixedPrediction =
        this.props.settings.conditionReduction[this.props.state.condition] * price.prediction;

      element.innerHTML = `
        <div class="page-main">
          <section class="page-section">
            <h6>Uppskattat försäljningspris</h6>
            <div data-wayke-valuation-content="">
              <p>Nedan ser du vårt uppskattade värde av din bil.</p>
            </div>
          </section>
          <section class="page-section page-section-accent">
            <div class="repeat-m-half">
                <div data-wayke-valuation-box="">
                    <div data-wayke-valuation-columnrow="">
                        <div class="column">
                            <div class="font-medium">${registrationNumber}</div>
                            <div class="font-size-small">
                                ${manufacturer} ${modelSeries} ${modelName}, ${[
        modelYear,
        fuelType,
        gearboxType,
        chassis,
      ].join(', ')}
                            </div>
                        </div>
                        <div class="column">
                            <button data-wayke-valuation-button="light small">Ändra</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="repeat-m-half">
                <div data-wayke-valuation-box="">
                    <div data-wayke-valuation-columnrow="">
                        <div class="column">
                            <div class="font-medium">
                                ${ValuationTranslation[this.props.state.condition]}
                            </div>
                        </div>
                        <div class="column">
                            <button data-wayke-valuation-button="light small">Ändra</button>
                        </div>
                    </div>
                </div>
            </div>
          </section>
          <section class="page-section text-center">
            <div class="m-b-mini">Ungefärligt värde:</div>
            <div class="h4 no-margin">${formatPrice(fixedPrediction)} kr</div>
          </section>
          <section class="page-section">
            ${Alert({
              type: 'info',
              header: 'Ungefärlig värdering',
              body: 'Definitiv värdering sker vid möte med handlaren.',
            })}
          </section>
          <section class="page-section">
            <button data-wayke-valuation-button="full-width">Sälj via Wayke</button>
          </section>
        </div>
      `;

      const buttons = element.querySelectorAll('button');
      buttons.item(0).addEventListener('click', this.props.changeStage1);
      buttons.item(1).addEventListener('click', this.props.changeStage2);
      buttons.item(2).addEventListener('click', () => this._onNext());
    }
  }

  render() {
    if (this.response) {
      this.renderResult();
    } else if (this.props.state) {
      this.getValuation(this.props.state);
    }
  }
}

export default Stage3;
