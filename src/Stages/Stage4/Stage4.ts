import { clearInputContainerError, setInputContainerError } from '../../elements';
import validationMethods from './validationMethods';
import Alert from '../../Components/Alert';
import { Vehicle } from '../../@types/Vehicle';
import { Contact, ContactPayload } from '../../@types/Contact';
import { ConditionType } from '../../@types/ConditionType';

interface ContactValidation {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
}

interface Stage4Props {
  vehicle: Vehicle;
  condition: ConditionType;
  contact: Contact;
  onNext: () => void;
}

interface Stage4State {
  value: Contact;
  validation: ContactValidation;
  interact: ContactValidation;
}

const sendData = async (_payload: ContactPayload) =>
  new Promise<ContactPayload>((resolve) => {
    setTimeout(resolve.bind(null, _payload), 1000);
  });

class Stage4 {
  props: Stage4Props;
  state: Stage4State;
  constructor(props: Stage4Props) {
    this.props = props;
    this.state = {
      value: {
        ...this.props.contact,
      },
      validation: {
        firstName: validationMethods.firstName(this.props.contact.firstName),
        lastName: validationMethods.lastName(this.props.contact.lastName),
        email: validationMethods.email(this.props.contact.email),
        phone: validationMethods.phone(this.props.contact.phone),
      },
      interact: { firstName: false, lastName: false, email: false, phone: false },
    };
  }

  private onChange(e: Event) {
    if (e.currentTarget) {
      const currentTarget = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const name = currentTarget.name as keyof Contact;
      this.state.value[name] = currentTarget.value;
      this.state.validation[name] = validationMethods[name](this.state.value[name]);

      if (this.state.interact[name] && currentTarget.parentElement) {
        if (!this.state.validation[name]) {
          setInputContainerError(currentTarget.parentElement, 'Fel');
        } else {
          clearInputContainerError(currentTarget.parentElement);
        }
      }
    }
  }

  private onBlur(e: Event) {
    if (e.currentTarget && this.state) {
      const currentTarget = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
      const name = currentTarget.name as keyof Contact;
      this.state.validation[name] = validationMethods[name](this.state.value[name]);
      if (!this.state.interact[name]) {
        this.state.interact[name] = true;
      }
      if (this.state.interact[name] && currentTarget.parentElement) {
        if (!this.state.validation[name]) {
          setInputContainerError(currentTarget.parentElement, 'Fel');
        } else {
          clearInputContainerError(currentTarget.parentElement);
        }
      }
    }
  }

  private async onSend() {
    if (
      this.state?.validation.firstName &&
      this.state.validation.lastName &&
      this.state.validation.email &&
      this.state.validation.phone
    ) {
      const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;
      const statusNode = element?.querySelector('#wayke-statusNode') as
        | HTMLElement
        | null
        | undefined;
      if (statusNode) {
        try {
          statusNode.innerHTML = `
          <div class="loader"></div>
        `;
          const payload: ContactPayload = {
            contact: this.state.value,
            condition: this.props.condition,
            vehicle: this.props.vehicle,
          };

          // eslint-disable-next-line
          console.log('sending', payload);

          await sendData(payload);
        } catch (e) {
          // eslint-disable-next-line
          console.log('err', e);
          statusNode.innerHTML = Alert({
            type: 'error',
            header: 'Ett fel har inträffat',
            body: 'Det gick inte att skicka in intresseanmälan, försök igen.',
          }).toString();
        }

        this.props.onNext();
      }
    }
  }

  render() {
    const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;
    if (element) {
      element.innerHTML = `
        <div class="page-main">
          <section class="page-section">
            <h6>Fyll i intresseanmälan</h6>
            <div data-ecom-content="">
              <p>Låt oss hjälpa dig att själja din bil. Fyll i dina kontaktuppgifter så återkommer vi till dig inom kort. Du binder dig inte till något genom att skicka in en intresseanmälan.</p>
            </div>
          </section>
          <section class="page-section">
            <label data-ecom-input-label="" for="wayke-contact-first-name">Förnamn</label>
            <div data-ecom-inputtext="">
              <input id="wayke-contact-first-name" name="firstName" autocomplete="off">
            </div>
            <label data-ecom-input-label="" for="wayke-contact-last-name">Efternamn</label>
            <div data-ecom-inputtext="">
              <input id="wayke-contact-last-name" name="lastName" autocomplete="off">
            </div>
            <label data-ecom-input-label="" for="wayke-contact-email">E-postadress</label>
            <div data-ecom-inputtext="">
              <input id="wayke-contact-email" name="email" autocomplete="off">
            </div>
            <label data-ecom-input-label="" for="wayke-contact-phone">Telefonnummer</label>
            <div data-ecom-inputtext="">
              <input id="wayke-contact-phone" name="phone" autocomplete="off">
            </div>
          </section>
          <section class="page-section">
            <button data-ecom-button="full-width">Skicka intresseanmälan</button>
          </section>
          <div id="wayke-statusNode"></div>
        </div>
      `;

      const firstName = element.querySelector('#wayke-contact-first-name') as HTMLInputElement;
      firstName.addEventListener('input', (e) => this.onChange(e));
      firstName.addEventListener('blur', (e) => this.onBlur(e));
      firstName.value = this.state.value.firstName;

      const lastName = element.querySelector('#wayke-contact-last-name') as HTMLInputElement;
      lastName.addEventListener('input', (e) => this.onChange(e));
      lastName.addEventListener('blur', (e) => this.onBlur(e));
      lastName.value = this.state.value.lastName;

      const email = element.querySelector('#wayke-contact-email') as HTMLInputElement;
      email.addEventListener('input', (e) => this.onChange(e));
      email.addEventListener('blur', (e) => this.onBlur(e));
      email.value = this.state.value.email;

      const phone = element.querySelector('#wayke-contact-phone') as HTMLInputElement;
      phone.addEventListener('input', (e) => this.onChange(e));
      phone.addEventListener('blur', (e) => this.onBlur(e));
      phone.value = this.state.value.phone;

      const button = element.querySelector('button') as HTMLButtonElement;
      button.addEventListener('click', () => this.onSend());
    }
  }
}

export default Stage4;
