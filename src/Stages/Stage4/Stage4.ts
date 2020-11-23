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
  fname: boolean;
  lname: boolean;
  email: boolean;
  phone: boolean;
  branchId: boolean;
  whenToSell: boolean;
  description: boolean;
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
        fname: validationMethods.fname(value.fname),
        lname: validationMethods.lname(value.lname),
        email: validationMethods.email(value.email),
        phone: validationMethods.phone(value.phone),
        branchId: validationMethods.branchId(value.branchId),
        whenToSell: validationMethods.whenToSell(value.whenToSell),
        description: validationMethods.description(value.description),
        confirmTerms: validationMethods.confirmTerms(value.confirmTerms),
      },
      interact: {
        fname: false,
        lname: false,
        email: false,
        phone: false,
        branchId: false,
        whenToSell: false,
        description: false,
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
        fname: validationMethods.fname(this.state.value.fname),
        lname: validationMethods.lname(this.state.value.lname),
        email: validationMethods.email(this.state.value.email),
        phone: validationMethods.phone(this.state.value.phone),
        branchId: validationMethods.branchId(this.state.value.branchId),
        whenToSell: validationMethods.whenToSell(this.state.value.whenToSell),
        description: validationMethods.description(this.state.value.description),
        confirmTerms: validationMethods.confirmTerms(this.state.value.confirmTerms),
      },
      interact: {
        fname: true,
        lname: true,
        email: true,
        phone: true,
        branchId: true,
        whenToSell: true,
        description: true,
        confirmTerms: true,
      },
    };
    const element = document.querySelector('[data-wayke-valuation-page]') as HTMLElement | null;
    if (element) {
      const formGroups = element.querySelectorAll('.form-group');
      if (!this.state.validation.fname) {
        formGroups[0].classList.add('has-error');
      }

      if (!this.state.validation.lname) {
        formGroups[1].classList.add('has-error');
      }

      if (!this.state.validation.email) {
        formGroups[2].classList.add('has-error');
      }

      if (!this.state.validation.phone) {
        formGroups[3].classList.add('has-error');
      }

      if (!this.state.validation.whenToSell) {
        formGroups[4].classList.add('has-error');
      }

      if (!this.state.validation.description) {
        formGroups[5].classList.add('has-error');
      }

      if (!this.state.validation.confirmTerms) {
        formGroups[6].classList.add('has-error');
      }
    }
  }

  private async onSend() {
    if (
      this.state?.validation.fname &&
      this.state.validation.lname &&
      this.state.validation.email &&
      this.state.validation.phone &&
      this.state.validation.branchId &&
      this.state.validation.whenToSell &&
      this.state.validation.description &&
      this.state.validation.confirmTerms
    ) {
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

          const { condition, vehicle, valuation } = this.props.state;
          const { price, dataUsed } = valuation;
          const {
            manufacturer,
            modelName,
            modelSeries,
            modelYear,
            fuelType,
            gearboxType,
            chassis,
          } = dataUsed;
          const { veryGood, good, ok } = this.props.settings.conditionReduction;
          const body: Lead = {
            firstName: this.state.value.fname,
            lastName: this.state.value.lname,
            type: 'registrationOfInterestToSell',
            phoneNumber: this.state.value.phone,
            branchId: this.state.value.branchId,
            email: this.state.value.email,
            metaData: objToKeyValue({
              condition,
              whenToSell: this.state.value.whenToSell,
              registrationNumber: vehicle.registrationNumber,
              description: this.state.value.description,
              milage: vehicle.milage,
              pricePrediction: `${price.prediction}`,
              conditionReductionVeryGood: `${veryGood}`,
              conditionReductionGood: `${good}`,
              conditionReductionOk: `${ok}`,
              manufacturer,
              modelName,
              modelSeries,
              modelYear: `${modelYear}`,
              fuelType,
              gearboxType,
              chassis,
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
            header: 'Ett fel har inträffat.',
            body: 'Det gick inte att skicka in din intresseanmälan, vänligen försök igen.',
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
          <section class="page-section">
            <h2 class="h6">Fyll i intresseanmälan</h2>
            <div data-wayke-valuation-content="">
              <p>Låt oss hjälpa dig att sälja din bil. Fyll i dina kontaktuppgifter och välj vilken anläggning du vill ska hjälpa dig, så återkommer vi till dig inom kort. Du binder dig inte till något genom att skicka in en intresseanmälan.</p>
            </div>
          </section>
          <section class="page-section">
            <div data-wayke-valuation-form>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-valuation-contact-first-name">Förnamn</label>
                <div data-wayke-valuation-inputtext="">
                  <input placeholder="Förnamn" id="wayke-valuation-contact-first-name" name="fname" autocomplete="given-name">
                </div>
                <div class="form-alert">Ange ditt förnamn.</div>
              </div>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-valuation-contact-last-name">Efternamn</label>
                <div data-wayke-valuation-inputtext="">
                  <input placeholder="Efternamn" id="wayke-valuation-contact-last-name" name="lname" autocomplete="family-name">
                </div>
                <div class="form-alert">Ange ditt efternamn.</div>
              </div>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-valuation-contact-email">E-postadress</label>
                <div data-wayke-valuation-inputtext="">
                  <input placeholder="E-postadress" id="wayke-valuation-contact-email" name="email" autocomplete="email">
                </div>
                <div class="form-alert">Ange din e-postadress.</div>
              </div>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-valuation-contact-phone-number">Telefonnummer (valfritt)</label>
                <div data-wayke-valuation-inputtext="">
                  <input placeholder="Telefonnummer" id="wayke-valuation-contact-phone-number" name="phone" autocomplete="tel">
                </div>
                <div class="form-alert">Ange ditt telefonnummer.</div>
              </div>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-valuation-contact-branch-id">Anläggning</label>
                <div data-wayke-valuation-select="">
                  <select id="wayke-valuation-contact-branch-id" class="select" name="branchId">
                  </select>
                </div>
                <div class="form-alert">Måste välja ett val</div>
              </div>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-valuation-contact-when-to-sell">När vill du sälja bilen</label>
                <div data-wayke-valuation-select="">
                  <select id="wayke-valuation-contact-when-to-sell" class="select" name="whenToSell">
                    <option value="1">Snarast</option>
                    <option value="2">Inom 1 månad</option>
                    <option value="3">Inom ett halvår</option>
                    <option value="4">Mer än 1 år</option>
                  </select>
                </div>
                <div class="form-alert">Måste välja ett val</div>
              </div>
              <div class="form-group">
                <label data-wayke-valuation-inputlabel="" for="wayke-valuation-contact-description">Beskrivning (valfritt)</label>
                <div data-wayke-valuation-inputtext="">
                  <textarea placeholder="Är det något mer om din bil som du vill berätta för bilhandlaren, något som kan påverka värdet såsom servicehistorik, extrautrustning, vinterdäck?" name="description" id="wayke-valuation-contact-description"></textarea>
                </div>
              </div>
              <div class="form-group">
                <div data-wayke-valuation-inputselection="checkbox">
                  <input type="checkbox" id="wayke-valuation-contact-confirm-terms" name="confirmTerms" />
                  <label for="wayke-valuation-contact-confirm-terms">
                    <span class="text">Jag bekräftar att jag är över 18 år och samtycker till att mina uppgifter behandlas i vår teknikleverantör Waykes databas. </span>
                  </label>
                </div>
                <div class="form-alert">Du behöver samtycka.</div>
              </div>
            </div>
          </section>
          <section class="page-section page-section-bottom">
            <button data-wayke-valuation-button="full-width">Skicka intresseanmälan</button>
          </section>
      `;

      const firstName = element.querySelector(
        '#wayke-valuation-contact-first-name'
      ) as HTMLInputElement | null;
      if (firstName) {
        firstName.addEventListener('input', (e) => this.onChange(e));
        firstName.addEventListener('blur', (e) => this.onBlur(e));
        firstName.value = this.state.value.fname;
      }

      const lastName = element.querySelector(
        '#wayke-valuation-contact-last-name'
      ) as HTMLInputElement | null;
      if (lastName) {
        lastName.addEventListener('input', (e) => this.onChange(e));
        lastName.addEventListener('blur', (e) => this.onBlur(e));
        lastName.value = this.state.value.lname;
      }

      const email = element.querySelector(
        '#wayke-valuation-contact-email'
      ) as HTMLInputElement | null;
      if (email) {
        email.addEventListener('input', (e) => this.onChange(e));
        email.addEventListener('blur', (e) => this.onBlur(e));
        email.value = this.state.value.email;
      }

      const phoneNumber = element.querySelector(
        '#wayke-valuation-contact-phone-number'
      ) as HTMLInputElement | null;
      if (phoneNumber) {
        phoneNumber.addEventListener('input', (e) => this.onChange(e));
        phoneNumber.addEventListener('blur', (e) => this.onBlur(e));
        phoneNumber.value = this.state.value.phone;
      }

      const branchId = element.querySelector(
        '#wayke-valuation-contact-branch-id'
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
        '#wayke-valuation-contact-when-to-sell'
      ) as HTMLSelectElement | null;
      if (whenToSell) {
        whenToSell.addEventListener('input', (e) => this.onChange(e));
        whenToSell.value = this.state.value.whenToSell;
      }

      const descriptionTextArea = element.querySelector(
        '#wayke-valuation-contact-description'
      ) as HTMLTextAreaElement | null;
      if (descriptionTextArea) {
        descriptionTextArea.addEventListener('input', (e) => this.onChange(e));
        descriptionTextArea.addEventListener('blur', (e) => this.onBlur(e));
        descriptionTextArea.value = this.state.value.description;
      }

      const confirmTerms = element.querySelector(
        '#wayke-valuation-contact-confirm-terms'
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
