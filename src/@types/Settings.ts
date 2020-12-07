export interface ConditionReduction {
  veryGood: number;
  good: number;
  ok: number;
}

export interface Branch {
  id: string;
  name?: string;
}

export interface ColorPrimary {
  background: string;
  text: string;
}

export interface Settings {
  manualTrigger?: boolean;
  branches: Branch[];
  conditionReduction: ConditionReduction;
  colorPrimary?: ColorPrimary;
  logo?: string;
}

export interface AppSettings extends Settings {
  url: string;
}
