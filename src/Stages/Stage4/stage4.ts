import { State } from '../..';
import Alert from '../../Components/Alert';
import Loader from '../../Components/Loader';
import { Stage1State } from '../Stage1/stage1';
import section1 from './section1';
import section2 from './section2';
import Section3 from './section3';
import validationMethods from './validationMethods';

const STATUS_NODE = 'wayke-statusNode';

interface PayloadContact {
  vehicle: Stage1State;
  contact: Contact;
}

interface ContactValidation {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
}

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const sendData = async (_payload: PayloadContact) =>
  new Promise<PayloadContact>((resolve) => {
    setTimeout(resolve.bind(null, _payload), 1000);
  });

export interface LocalStage4 {
  value: Contact;
  validation: ContactValidation;
  interact: ContactValidation;
}

const stage4 = (state: State, onNext: () => void) => {
  const statusNode = document.createElement('div');
  statusNode.id = STATUS_NODE;
  const value = { ...state.stage4 };
  const localState: LocalStage4 = {
    value,
    validation: {
      firstName: validationMethods.firstName(value.firstName),
      lastName: validationMethods.lastName(value.lastName),
      email: validationMethods.email(value.email),
      phone: validationMethods.phone(value.phone),
    },
    interact: { firstName: false, lastName: false, email: false, phone: false },
  };

  const onSend = async () => {
    if (
      !localState.validation.firstName ||
      !localState.validation.lastName ||
      !localState.validation.email ||
      !localState.validation.phone
    ) {
      // eslint-disable-next-line
      console.log('err');
    } else {
      const payload = {
        vehicle: state.stage1,
        contact: localState.value,
      };
      // eslint-disable-next-line
      console.log('sending', payload);

      try {
        const loader = Loader();
        statusNode.innerHTML = '';
        statusNode.appendChild(loader);
        await sendData(payload);
        onNext();
      } catch (e) {
        // eslint-disable-next-line
        console.log('err', e);
        const alert = Alert({
          type: 'error',
          content: 'Det gick inte att skicka in intresseanmälan, försök igen.',
        });
        statusNode.innerHTML = '';
        statusNode.appendChild(alert);
      }
    }
  };

  const element = document.querySelector('[data-ecom-page]') as HTMLElement | null;

  if (element) {
    const pageMain = document.createElement('div');
    pageMain.className = 'page-main';

    pageMain.appendChild(section1());

    pageMain.appendChild(
      section2({
        localState,
      })
    );

    pageMain.appendChild(Section3({ onClick: onSend }));

    pageMain.appendChild(statusNode);
    element.appendChild(pageMain);
  }
};

export default stage4;
