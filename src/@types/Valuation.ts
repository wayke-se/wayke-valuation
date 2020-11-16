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

export interface MarketInfo {
  branchName: string;
  daysPublished: number;
  imageUrl: string[];
  price: number;
  shortDescription: string;
  url: string;
}

export interface Market {
  blocket: MarketInfo | null;
  bytbil: MarketInfo | null;
  wayke: MarketInfo | null;
}
export interface MarketItem {
  branchName: string;
  equipmentLevel: string | null;
  fuelType: string;
  gearboxType: string;
  imageUrl: string[];
  isPredictionVehicle: boolean;
  km: number;
  manufacturer: string;
  market: Market;
  modelName: string;
  modelSeries: string;
  modelYear: number;
  price: number;
  sellerType: string;
  shortDescription: string;
  url: string;
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
  carCount: number;
  dataUsed: DataUsed;
  market: MarketItem[];
  marketMatchLevel: number;
  mdsValue: 67.5;
  onMarket: false;
  possibleEquipmentLvels: any[];
  price: Price;
  registrationNumber: string;
  regressionCarCount: number;
  regressionMatchLevel: number;
  requestId: string;
  soldCount: number;
}
