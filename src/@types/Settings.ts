export interface ConditionReduction {
  veryGood: number;
  good: number;
  ok: number;
}

export interface Branch {
  id: string;
  name: string;
}

export interface Settings {
  auto?: boolean;
  logo?: string;
  branches: Branch[];
  apiAddress: string;
  conditionReduction: ConditionReduction;
}
