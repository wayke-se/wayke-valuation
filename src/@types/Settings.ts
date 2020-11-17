export interface ConditionReduction {
  VeryGood: number;
  Good: number;
  Ok: number;
}

export interface Settings {
  auto?: boolean;
  logo?: string;
  branchId: string;
  valuationAddress: string;
  conditionReduction: ConditionReduction;
}
