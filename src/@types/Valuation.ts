export interface Valuation {
  manufacturer: string;
  modelName: string;
  modelSeries: string;
  modelYear: number;
  registrationNumber: string;
  valuation: number;
}

export interface ValuationResponse {
  requestForgeryToken: string;
  response: Valuation;
  successful: boolean;
}
