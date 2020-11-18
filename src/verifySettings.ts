import { Settings } from './@types/Settings';

const pre = 'Wayke Valuation -';

const verifySettings = (settings: Settings) => {
  if (!settings.url) {
    throw `${pre} Must provide "url"`;
  }
  if (!settings.conditionReduction) {
    throw `${pre} Must provide "conditionReduction"`;
  }
  if (
    settings.conditionReduction.veryGood !== null ||
    settings.conditionReduction.veryGood !== undefined
  ) {
    throw `${pre} Must provide "conditionReduction.veryGood"`;
  }

  if (settings.conditionReduction.good !== null || settings.conditionReduction.good !== undefined) {
    throw `${pre} Must provide "conditionReduction.good"`;
  }

  if (settings.conditionReduction.ok !== null || settings.conditionReduction.ok !== undefined) {
    throw `${pre} Must provide "conditionReduction.ok"`;
  }

  if (!settings.branches) {
    throw `${pre} Must provide "branches"`;
  }

  if (settings.branches.length === 0) {
    throw `${pre} Must provide entries in "branches"`;
  }

  if (settings.branches.length !== settings.branches.filter((x) => x.id).length) {
    throw `${pre} One or several items in "branches" is missing the property "id"`;
  }
};

export default verifySettings;
