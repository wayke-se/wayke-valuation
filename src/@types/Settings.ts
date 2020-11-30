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
  conditionReduction: ConditionReduction;
}

export interface AppSettings extends Settings {
  url: string;
}
