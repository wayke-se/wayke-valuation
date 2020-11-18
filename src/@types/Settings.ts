export interface ConditionReduction {
  veryGood: number;
  good: number;
  ok: number;
}

export interface Branch {
  id: string;
  name?: string;
}

export interface Settings {
  manualTrigger?: boolean;
  branches: Branch[];
  url: string;
  conditionReduction: ConditionReduction;
}
