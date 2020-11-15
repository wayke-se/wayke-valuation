import { Api } from '../../@types/Api';
import { Valuation } from '../../@types/Valuation';
import Alert from '../../Components/Alert';
import { AppState } from '../../Components/App';
import { sendRequestValuation } from '../../http/http';
import { ValuationTranslation } from '../../translation';

interface Stage3Props {
  api: Api;
  state: AppState;
  changeStage1: () => void;
  changeStage2: () => void;
  onNext: () => void;
}

class Stage3 {
  private response?: Valuation = undefined;
  private props: Stage3Props;
  constructor(props: Stage3Props) {
    this.props = props;
  }

  private async getValuation(state: AppState) {
    const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;
    if (element) {
      try {
        element.innerHTML = `
          <div class="page-main">
            <div class="loader"></div>
          </div>
        `;
        const _response = await sendRequestValuation(
          'GET',
          `${this.props.api.address}/v2/tradein/${state.vehicle.registrationNumber}?mileage=${
            2000 || state.vehicle.milage
          }&condition=${state.condition}`
        );
        this.response = _response.response;
        this.renderResult();
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    }
  }

  private renderResult() {
    const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;
    if (element && this.response) {
      const { manufacturer, modelName, modelSeries, modelYear, valuation } = this.response;
      element.innerHTML = `
        <div class="page-main">
          <section class="page-section">
            <h6>Uppskattat försäljningspris</h6>
            <div data-ecom-content="">
              <p>Nedan ser du vårt uppskattade värde av din bil.</p>
            </div>
          </section>
          <section class="page-section page-section-accent">
            <div class="repeat-m-half">
              <div data-ecom-box="light">
                <h2 class="h6">NYA710, 1</h2>
                <div data-ecom-content="">
                  <b>${manufacturer} ${modelSeries}</b><span>${[modelYear, modelName].join(
        ', '
      )}</span>
                </div>
                <div class="box-footer box-footer-right">
                  <button data-ecom-button="small">Ändra</button>
                </div>
              </div>
            </div>
            <div class="repeat-m-half">
              <div data-ecom-box="light">
                <div data-ecom-content="">
                  <b>${ValuationTranslation[this.props.state.condition]}</b>
                </div>
                <div class="box-footer box-footer-right">
                  <button data-ecom-button="small">Ändra</button>
                </div>
              </div>
            </div>
          </section>
          <section class="page-section">
            <div>${valuation} kr</div>
          </section>
          <section class="page-section">
            ${Alert({
              type: 'info',
              header: 'Ungefärlig värdering',
              body: 'Definitiv värdering sker vid möte med handlaren.',
            })}
          </section>
          <section class="page-section">
            <button data-ecom-button="full-width">Sälj via Wayke</button>
          </section>
        </div>
      `;

      const buttons = element.querySelectorAll('button');
      buttons.item(0).addEventListener('click', this.props.changeStage1);
      buttons.item(1).addEventListener('click', this.props.changeStage2);
      buttons.item(2).addEventListener('click', this.props.onNext);
    }
  }

  render() {
    if (this.props.state) {
      this.getValuation(this.props.state);
    }
  }
}

export default Stage3;
