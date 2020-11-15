import { ConditionType } from './ConditionType';
import { Vehicle } from './Vehicle';

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ContactPayload {
  vehicle: Vehicle;
  contact: Contact;
  condition: ConditionType;
}
