export interface DataUsed {
  chassis: string;
  color: string;
  county: string;
  equipmentLevel: string | null;
  fuelType: string;
  gearboxType: string;
  hasTowbar: boolean;
  km: number;
  manufacturer: string;
  modelName: string;
  modelSeries: string;
  modelYear: number;
  seatCount: number;
  vinNumber: string;
}

export interface Price {
  avg: number;
  marketValueIndex: number;
  max: number;
  min: number;
  prediction: number;
  wayke: number | null;
}

export interface Valuation {
  dataUsed: DataUsed;
  price: Price;
  registrationNumber: string;
  requestId: string;
}
