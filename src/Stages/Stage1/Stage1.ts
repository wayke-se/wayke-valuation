import { Vehicle } from '../../@types/Vehicle';
import validationMethods from './validationMethods';

interface Stage1Validation {
  registrationNumber: boolean;
  milage: boolean;
  description: boolean;
}

interface Stage1State {
  value: Vehicle;
  validation: Stage1Validation;
  interact: Stage1Validation;
}

interface Stage1Props {
  vehicle: Vehicle;
  onNext: (vehicle: Vehicle) => void;
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
        description: validationMethods.description(props.vehicle.description),
      },
      interact: { registrationNumber: false, milage: false, description: false },
    };
  }

  private onChange(e: Event) {
    if (e.currentTarget) {
      const currentTarget = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const name = currentTarget.name as keyof Vehicle;
      this.state.value[name] = currentTarget.value;
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
        description: validationMethods.description(this.state.value.description),
      },
      interact: {
        registrationNumber: true,
        milage: true,
        description: true,
      },
    };
    const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;
    if (element) {
      const formGroups = element.querySelectorAll('.form-group');
      if (!this.state.validation.registrationNumber) {
        formGroups[0].classList.add('has-error');
      }

      if (!this.state.validation.milage) {
        formGroups[1].classList.add('has-error');
      }

      if (!this.state.validation.description) {
        formGroups[2].classList.add('has-error');
      }
    }
  }

  private onNextButton() {
    if (
      this.state?.validation.registrationNumber &&
      this.state.validation.milage &&
      this.state.validation.description
    ) {
      this.props.onNext(this.state.value);
    } else {
      this.TriggerAllFieldValidations();
    }
  }

  render() {
    const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;
    if (element) {
      element.innerHTML = `
        <div class="page-main">
          <section class="page-section">
            <h6>Värdera bilen gratis</h6>
            <div data-ecom-content="">
              <p>Har du en bil du vill få värderad? Beskriv din bil så gervi dig ett uppskattat försäljningspris. Du förbrinder dig inte till något. Skriv in regrn, mätarställning samt beskrivning av din bil.</p>
            </div>
          </section>
          <section class="page-section">
            <div data-ecom-form>
              <div class="form-group">
                <label data-ecom-input-label="" for="wayke-valuation-registration-number">Registreringsnummer</label>
                <div data-ecom-inputtext="">
                  <input id="wayke-valuation-registration-number" name="registrationNumber" autocomplete="off">
                </div>
                <div class="form-alert">Ett giltigt registreringsnummer behöver anges.</div>
              </div>
              <div class="form-group">
                <label data-ecom-input-label="" for="wayke-valuation-select">Miltal</label>
                <div data-ecom-select="">
                  <select id="wayke-valuation-select" class="select" name="milage">
                    <option value="1">0 - 5000 mil</option>
                    <option value="2">5001 - 10000 mil</option>
                    <option value="3">10001 - 15000 mil</option>
                    <option value="4">mer än 1500 mil</option>
                  </select>
                </div>
                <div class="form-alert">Måste välja ett val</div>
              </div>
              <div class="form-group">
                <label data-ecom-input-label="" for="wayke-valuation-description">Beskrivning</label>
                <div data-ecom-inputtext="">
                  <textarea name="description" id="wayke-valuation-description"></textarea>
                </div>
              </div>
            </div>
          </section>
          <section class="page-section">
            <button id="stage1-next-button" data-ecom-button="full-width">Nästa</button>
          </section>
      </div>
      `;

      const regInput = element.querySelector(
        '#wayke-valuation-registration-number'
      ) as HTMLInputElement;
      regInput.addEventListener('input', (e) => this.onChange(e));
      regInput.addEventListener('blur', (e) => this.onBlur(e));
      regInput.value = this.state.value.registrationNumber;

      const milageSelect = element.querySelector('#wayke-valuation-select') as HTMLSelectElement;
      milageSelect.addEventListener('input', (e) => this.onChange(e));
      milageSelect.value = this.state.value.milage;

      const descriptionTextArea = element.querySelector(
        '#wayke-valuation-description'
      ) as HTMLTextAreaElement;
      descriptionTextArea.addEventListener('input', (e) => this.onChange(e));
      descriptionTextArea.addEventListener('blur', (e) => this.onBlur(e));
      descriptionTextArea.value = this.state.value.description;

      const button = element.querySelector('#stage1-next-button') as HTMLButtonElement;
      button.addEventListener('click', () => this.onNextButton());
    }
  }
}

export default Stage1;
