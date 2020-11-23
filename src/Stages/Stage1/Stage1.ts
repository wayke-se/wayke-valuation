import { Settings } from '../../@types/Settings';
import { Valuation } from '../../@types/Valuation';
import { Vehicle } from '../../@types/Vehicle';
import Alert from '../../Components/Alert';
import Spinner from '../../Components/Spinner';
import { RequestError, sendRequest } from '../../Http/http';
import validationMethods from './validationMethods';

const cache: { [key: string]: Valuation | undefined } = {};
const setCache = (key: string, value: Valuation) => {
  cache[key] = value;
};
const getCache = (key: string) => {
  return cache?.[key] || undefined;
};

const createCacheKey = (state: Vehicle) =>
  `${state.registrationNumber}-${parseInt(state.milage, 10) * 10}`;

interface Stage1Validation {
  registrationNumber: boolean;
  milage: boolean;
}

interface Stage1State {
  value: Vehicle;
  validation: Stage1Validation;
  interact: Stage1Validation;
}

interface Stage1Props {
  settings: Settings;
  vehicle: Vehicle;
  onNext: (vehicle: Vehicle, valuation: Valuation) => void;
}

class Stage1 {
  private props: Stage1Props;
  private state: Stage1State;

  constructor(props: Stage1Props) {
    this.props = props;
    this.state = {
      value: props.vehicle,
      validation: {
        registrationNumber: validationMethods.registrationNumber(props.vehicle.registrationNumber),
        milage: validationMethods.milage(props.vehicle.milage),
      },
      interact: { registrationNumber: false, milage: false },
    };
  }

  private async getValuation(state: Vehicle) {
    const cachedResult = getCache(createCacheKey(state));
    if (cachedResult) {
      this.props.onNext(this.state.value, cachedResult);
      return;
    }

    const element = document.querySelector('[data-wayke-valuation-page]') as HTMLElement | null;
    const existingSection = document.querySelector('.status');
    const section = existingSection || document.createElement('section');
    section.className = 'page-section status';
    if (element) {
      try {
        section.innerHTML = Spinner();
        if (!existingSection) {
          element.append(section);
        }

        const _response = await sendRequest<Valuation>({
          method: 'GET',
          url: `${this.props.settings.url}/wip/extvehicle?regNo=${state.registrationNumber}&km=${
            parseInt(state.milage, 10) * 10
          }`,
        });
        setCache(createCacheKey(state), _response);
        this.props.onNext(this.state.value, _response);
      } catch (e: any) {
        if ((e as RequestError).status === 404) {
          section.innerHTML = Alert({
            type: 'error',
            header: 'Ett fel har inträffat.',
            body: `Det hittades inget fordon med registreringsnummer "${state.registrationNumber}". Kontrollera att det registreringsnumret stämmer.`,
          }).toString();
        } else {
          section.innerHTML = Alert({
            type: 'error',
            header: 'Ett fel har inträffat.',
            body: 'Vänligen försök igen.',
          }).toString();
        }
      }
    }
  }

  private onChange(e: Event) {
    if (e.currentTarget) {
      const currentTarget = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const name = currentTarget.name as keyof Vehicle;
      if (name === 'milage') {
        this.state.value[name] = currentTarget.value.replace(/\D/, '');
      } else {
        this.state.value[name] = currentTarget.value;
        this.state.value[name] = this.state.value[name].toUpperCase();
        currentTarget.value = this.state.value[name];
      }
      this.state.validation[name] = validationMethods[name](this.state.value[name]);

      if (this.state.interact[name] && currentTarget.parentElement?.parentElement) {
        if (!this.state.validation[name]) {
          currentTarget.parentElement.parentElement.classList.add('has-error');
        } else {
          currentTarget.parentElement.parentElement.classList.remove('has-error');
        }
      }
    }
  }

  private onBlur(e: Event) {
    if (e.currentTarget) {
      const currentTarget = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const name = currentTarget.name as keyof Vehicle;
      this.state.validation[name] = validationMethods[name](this.state.value[name]);
      if (!this.state.interact[name]) {
        this.state.interact[name] = true;
      }
      if (this.state.interact[name] && currentTarget.parentElement?.parentElement) {
        if (!this.state.validation[name]) {
          currentTarget.parentElement.parentElement.classList.add('has-error');
        } else {
          currentTarget.parentElement.parentElement.classList.remove('has-error');
        }
      }
    }
  }

  private TriggerAllFieldValidations() {
    this.state = {
      ...this.state,
      validation: {
        registrationNumber: validationMethods.registrationNumber(
          this.state.value.registrationNumber
        ),
        milage: validationMethods.milage(this.state.value.milage),
      },
      interact: {
        registrationNumber: true,
        milage: true,
      },
    };
    const element = document.querySelector('[data-wayke-valuation-page]') as HTMLElement | null;
    if (element) {
      const formGroups = element.querySelectorAll('.form-group');
      if (!this.state.validation.registrationNumber) {
        formGroups[0].classList.add('has-error');
      }

      if (!this.state.validation.milage) {
        formGroups[1].classList.add('has-error');
      }
    }
  }

  private onNextButton() {
    if (this.state?.validation.registrationNumber && this.state.validation.milage) {
      this.getValuation(this.state.value);
    } else {
      this.TriggerAllFieldValidations();
    }
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.onNextButton();
    }
  }

  render() {
    const element = document.querySelector('[data-wayke-valuation-page]') as HTMLElement | null;
    if (element) {
      element.innerHTML = `
          <section class="page-section">
            <h1 class="h6">Värdera bilen gratis</h1>
            <div data-wayke-valuation-content="">
              <p>Vill du veta vad din bil är värd idag? Ange registreringsnummer och mätarställning så får du kostnadsfritt ett uppskattat försäljningspris av din bil och du väljer sedan själv ifall du vill sälja.</p>
            </div>
          </section>
          <section class="page-section">
            <div data-wayke-valuation-form>
                <div class="form-group-row">
                    <div class="form-group is-half">
                        <label data-wayke-valuation-inputlabel="" for="wayke-valuation-registration-number">Registreringsnummer</label>
                        <div data-wayke-valuation-inputtext="">
                            <input placeholder="XXXXXX" maxlength="6" id="wayke-valuation-registration-number" name="registrationNumber" autocomplete="off">
                        </div>
                        <div class="form-alert">Ett giltigt registreringsnummer behöver anges.</div>
                    </div>
                    <div class="form-group is-half">
                      <label data-wayke-valuation-inputlabel="" for="wayke-valuation-milage">Miltal</label>
                      <div data-wayke-valuation-inputtext="">
                          <input placeholder="Ex. 2000" type="number" min="0" id="wayke-valuation-milage" name="milage" autocomplete="off">
                      </div>
                      <div class="form-alert">Ett giltigt miltal behöver anges.</div>
                  </div>
                </div>
            </div>
          </section>
          <section class="page-section page-section-bottom">
            <button id="stage1-next-button" data-wayke-valuation-button="full-width">Nästa</button>
          </section>
      `;

      const regInput = element.querySelector(
        '#wayke-valuation-registration-number'
      ) as HTMLInputElement | null;
      if (regInput) {
        regInput.addEventListener('input', (e) => this.onChange(e));
        regInput.addEventListener('keydown', (e) => this.onKeyDown(e));
        regInput.addEventListener('blur', (e) => this.onBlur(e));
        regInput.value = this.state.value.registrationNumber;
      }

      const milageInput = element.querySelector(
        '#wayke-valuation-milage'
      ) as HTMLInputElement | null;
      if (milageInput) {
        milageInput.addEventListener('input', (e) => this.onChange(e));
        milageInput.addEventListener('keydown', (e) => this.onKeyDown(e));
        milageInput.addEventListener('blur', (e) => this.onBlur(e));
        milageInput.value = this.state.value.milage;
      }

      const button = element.querySelector('#stage1-next-button') as HTMLButtonElement | null;
      if (button) {
        button.addEventListener('click', () => this.onNextButton());
      }
    }
  }
}

export default Stage1;
