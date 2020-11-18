import validationMethods from './validationMethods';
import Alert from '../../Components/Alert';
import { Contact } from '../../@types/Contact';
import Spinner from '../../Components/Spinner';
import { sendRequest } from '../../Http/http';
import { Settings } from '../../@types/Settings';
import { Lead } from '../../@types/Lead';
import { NonOptionalAppState } from '../../Components/App';
import { objToKeyValue } from '../../formats';

interface ContactValidation {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phoneNumber: boolean;
  branchId: boolean;
  whenToSell: boolean;
  confirmTerms: boolean;
}

interface Stage4Props {
  state: NonOptionalAppState;
  settings: Settings;
  onNext: () => void;
}

interface Stage4State {
  value: Contact;
  validation: ContactValidation;
  interact: ContactValidation;
}
class Stage4 {
  props: Stage4Props;
  state: Stage4State;
  constructor(props: Stage4Props) {
    this.props = props;
    const value = { ...this.props.state.contact };

    this.state = {
      value,
      validation: {
        firstName: validationMethods.firstName(value.firstName),
        lastName: validationMethods.lastName(value.lastName),
        email: validationMethods.email(value.email),
        phoneNumber: validationMethods.phoneNumber(value.phoneNumber),
        branchId: validationMethods.branchId(value.branchId),
        whenToSell: validationMethods.whenToSell(value.whenToSell),
        confirmTerms: validationMethods.confirmTerms(value.confirmTerms),
      },
      interact: {
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        branchId: false,
        whenToSell: false,
        confirmTerms: false,
      },
    };
  }

  private onChange(e: Event) {
    if (e.currentTarget) {
      const currentTarget = e.currentTarget as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;
      const name = currentTarget.name as keyof Contact;
      if (name === 'confirmTerms') {
        this.state.value[name] = (currentTarget as HTMLInputElement).checked;
        this.state.validation[name] = validationMethods[name](this.state.value[name]);
      } else {
        this.state.value[name] = currentTarget.value;
        this.state.validation[name] = validationMethods[name](this.state.value[name]);
      }

      if (currentTarget.type === 'select-one' || name === 'confirmTerms') {
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

  private onBlur(e: Event) {
    if (e.currentTarget && this.state) {
      const currentTarget = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const name = currentTarget.name as keyof Omit<Contact, 'confirmTerms'>;
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
        firstName: validationMethods.firstName(this.state.value.firstName),
        lastName: validationMethods.lastName(this.state.value.lastName),
        email: validationMethods.email(this.state.value.email),
        phoneNumber: validationMethods.phoneNumber(this.state.value.phoneNumber),
        branchId: validationMethods.branchId(this.state.value.branchId),
        whenToSell: validationMethods.whenToSell(this.state.value.whenToSell),
        confirmTerms: validationMethods.confirmTerms(this.state.value.confirmTerms),
      },
      interact: {
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        branchId: true,
        whenToSell: true,
        confirmTerms: true,
      },
    };
    const element = document.querySelector('[data-wayke-valuation-page]') as HTMLElement | null;
    if (element) {
      const formGroups = element.querySelectorAll('.form-group');
      if (!this.state.validation.firstName) {
        formGroups[0].classList.add('has-error');
      }

      if (!this.state.validation.lastName) {
        formGroups[1].classList.add('has-error');
      }

      if (!this.state.validation.email) {
        formGroups[2].classList.add('has-error');
      }

      if (!this.state.validation.phoneNumber) {
        formGroups[3].classList.add('has-error');
      }

      if (!this.state.validation.whenToSell) {
        formGroups[4].classList.add('has-error');
      }

      if (!this.state.validation.confirmTerms) {
        formGroups[5].classList.add('has-error');
      }
    }
  }

  private async onSend() {
    if (
      this.state?.validation.firstName &&
      this.state.validation.lastName &&
      this.state.validation.email &&
      this.state.validation.phoneNumber &&
      this.state.validation.branchId &&
      this.state.validation.whenToSell &&
      this.state.validation.confirmTerms
    ) {
      const element = document.querySelector(
        '[data-wayke-valuation-page] .page-main'
      ) as HTMLElement | null;
      const existingSection = document.querySelector('.status');
      const section = existingSection || document.createElement('section');
      section.className = 'page-section status';
      if (element) {
        try {
          section.innerHTML = Spinner();
          if (!existingSection) {
            element.append(section);
          }

          const body: Lead = {
            firstName: this.state.value.firstName,
            lastName: this.state.value.lastName,
            type: 'valuation',
            phoneNumber: this.state.value.phoneNumber,
            branchId: this.state.value.branchId,
            email: this.state.value.email,
            userId: '00000000-0000-0000-0000-000000000000',
            metaData: objToKeyValue({
              condition: this.props.state.condition,
              whenToSell: this.state.value.whenToSell,
              registrationNumber: this.props.state.vehicle.registrationNumber,
              description: this.props.state.vehicle.description,
              milage: this.props.state.vehicle.milage,
              valuation: `${this.props.state.valuation.price.prediction}`,
              conditionReductionVeryGood: `${this.props.settings.conditionReduction.veryGood}`,
              conditionReductionGood: `${this.props.settings.conditionReduction.good}`,
              conditionReductionOk: `${this.props.settings.conditionReduction.ok}`,
            }),
          };

          await sendRequest<any>({
            method: 'POST',
            url: `${this.props.settings.url}/lead`,
            body,
          });

          this.props.onNext();
        } catch (e) {
          section.innerHTML = Alert({
            type: 'error',
            header: 'Ett fel har inträffat',
            body: 'Det gick inte att skicka in intresseanmälan, försök igen.',
          }).toString();
        }
      }
    } else {
      this.TriggerAllFieldValidations();
    }
  }

  render() {
    const element = document.querySelector('[data-wayke-valuation-page]') as HTMLElement | null;
    if (element) {
      element.innerHTML = `
        <div class="page-main">
          <section class="page-section">
            <h6>Fyll i intresseanmälan</h6>
            <div data-wayke-valuation-content="">
              <p>Låt oss hjälpa dig att själja din bil. Fyll i dina kontaktuppgifter så återkommer vi till dig inom kort. Du binder dig inte till något genom att skicka in en intresseanmälan.</p>
            </div>
          </section>
          <section class="page-section">
            <div data-wayke-valuation-form>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-contact-first-name">Förnamn</label>
                <div data-wayke-valuation-inputtext="">
                  <input placeholder="Förnamn" id="wayke-contact-first-name" name="firstName">
                </div>
                <div class="form-alert">Ange ditt förnamn.</div>
              </div>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-contact-last-name">Efternamn</label>
                <div data-wayke-valuation-inputtext="">
                  <input placeholder="Efternamn" id="wayke-contact-last-name" name="lastName">
                </div>
                <div class="form-alert">Ange ditt efternamn.</div>
              </div>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-contact-email">E-postadress</label>
                <div data-wayke-valuation-inputtext="">
                  <input placeholder="E-postadress" id="wayke-contact-email" name="email">
                </div>
                <div class="form-alert">Ange din e-postadress.</div>
              </div>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-contact-phone-number">Telefonnummer</label>
                <div data-wayke-valuation-inputtext="">
                  <input placeholder="Telefonnummer" id="wayke-contact-phone-number" name="phoneNumber">
                </div>
                <div class="form-alert">Ange ditt telefonnummer.</div>
              </div>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-contact-branch-id">Anläggning</label>
                <div data-wayke-valuation-select="">
                  <select id="wayke-contact-branch-id" class="select" name="branchId">
                  </select>
                </div>
                <div class="form-alert">Måste välja ett val</div>
              </div>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-contact-when-to-sell">När vill du sälja bilen</label>
                <div data-wayke-valuation-select="">
                  <select id="wayke-contact-when-to-sell" class="select" name="branch">
                    <option value="1">Snarast</option>
                    <option value="2">Inom 1 månad</option>
                    <option value="3">Inom ett halvår</option>
                    <option value="4">Mer än 1 år</option>
                  </select>
                </div>
                <div class="form-alert">Måste välja ett val</div>
              </div>
              <div class="form-group">
                <div data-wayke-valuation-inputselection="checkbox">
                  <input type="checkbox" id="wayke-contact-confirm-terms" name="confirmTerms" />
                  <label for="wayke-contact-confirm-terms">
                    <span class="text">Jag bekärftar att jag är över 16 år och samtycker till att mina uppgifter behandlas i Waykes databas.</span>
                  </label>
                </div>
                <div class="form-alert">Du behöver samtycka.</div>
              </div>
            </div>
          </section>
          <section class="page-section">
            <button data-wayke-valuation-button="full-width">Skicka intresseanmälan</button>
          </section>
        </div>
      `;

      const firstName = element.querySelector(
        '#wayke-contact-first-name'
      ) as HTMLInputElement | null;
      if (firstName) {
        firstName.addEventListener('input', (e) => this.onChange(e));
        firstName.addEventListener('blur', (e) => this.onBlur(e));
        firstName.value = this.state.value.firstName;
      }

      const lastName = element.querySelector('#wayke-contact-last-name') as HTMLInputElement | null;
      if (lastName) {
        lastName.addEventListener('input', (e) => this.onChange(e));
        lastName.addEventListener('blur', (e) => this.onBlur(e));
        lastName.value = this.state.value.lastName;
      }

      const email = element.querySelector('#wayke-contact-email') as HTMLInputElement | null;
      if (email) {
        email.addEventListener('input', (e) => this.onChange(e));
        email.addEventListener('blur', (e) => this.onBlur(e));
        email.value = this.state.value.email;
      }

      const phoneNumber = element.querySelector(
        '#wayke-contact-phone-number'
      ) as HTMLInputElement | null;
      if (phoneNumber) {
        phoneNumber.addEventListener('input', (e) => this.onChange(e));
        phoneNumber.addEventListener('blur', (e) => this.onBlur(e));
        phoneNumber.value = this.state.value.phoneNumber;
      }

      const branchId = element.querySelector(
        '#wayke-contact-branch-id'
      ) as HTMLSelectElement | null;
      if (branchId) {
        if (this.props.settings.branches.length > 1) {
          branchId.addEventListener('input', (e) => this.onChange(e));
          branchId.value = this.state.value.branchId;
          branchId.innerHTML = this.props.settings.branches
            .map((branch) => `<option value="${branch.id}">${branch.name || branch.id}</option>`)
            .join(' ');
        } else {
          const parentElement = branchId.parentElement?.parentElement;
          const parentParentElement = parentElement?.parentElement;
          if (parentElement && parentParentElement) {
            parentParentElement.removeChild(parentElement);
          }
        }
      }

      const whenToSell = element.querySelector(
        '#wayke-contact-when-to-sell'
      ) as HTMLSelectElement | null;
      if (whenToSell) {
        whenToSell.addEventListener('input', (e) => this.onChange(e));
        whenToSell.value = this.state.value.whenToSell;
      }

      const confirmTerms = element.querySelector(
        '#wayke-contact-confirm-terms'
      ) as HTMLInputElement | null;
      if (confirmTerms) {
        confirmTerms.addEventListener('input', (e) => this.onChange(e));
        confirmTerms.checked = this.state.value.confirmTerms;
      }

      const button = element.querySelector('button') as HTMLButtonElement | null;
      if (button) {
        button.addEventListener('click', () => this.onSend());
      }
    }
  }
}

export default Stage4;
