export interface ConditionReduction {
  VeryGood: number;
  Good: number;
  Ok: number;
}

export interface Branch {
  id: string;
  name: string;
}

export interface Settings {
  auto?: boolean;
  logo?: string;
  branchId: string;
  branches: Branch[];
  valuationAddress: string;
  leadAddress: string;
  conditionReduction: ConditionReduction;
}
