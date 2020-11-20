import { Settings } from '../../@types/Settings';
import { Valuation } from '../../@types/Valuation';
import Alert from '../../Components/Alert';
import { NonOptionalAppState } from '../../Components/App';
import { formatPrice } from '../../formats';
import { ValuationTranslation } from '../../translation';

interface Stage3Props {
  settings: Settings;
  state: NonOptionalAppState;
  changeStage1: () => void;
  changeStage2: () => void;
  onNext: (valuation: Valuation) => void;
}

class Stage3 {
  private props: Stage3Props;
  constructor(props: Stage3Props) {
    this.props = props;
  }

  private _onNext() {
    this.props.onNext(this.props.state.valuation);
  }

  render() {
    const element = document.querySelector('[data-wayke-valuation-page]') as HTMLElement | null;
    if (element) {
      const { registrationNumber, dataUsed, price } = this.props.state.valuation;
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
          <section class="page-section">
            <h2 class="h6">Uppskattat försäljningspris</h2>
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
          <section class="page-section page-section-bottom">
            <button data-wayke-valuation-button="full-width">Bli kontaktad av en handlare</button>
          </section>
      `;

      const buttons = element.querySelectorAll('button');
      buttons.item(0).addEventListener('click', this.props.changeStage1);
      buttons.item(1).addEventListener('click', this.props.changeStage2);
      buttons.item(2).addEventListener('click', () => this._onNext());
    }
  }
}

export default Stage3;
