import { Settings } from './@types/Settings';

const verifySettings = (settings: Settings) => {
  if (!settings.apiAddress) {
    throw 'Must provide "apiAddress"';
  }
  if (!settings.conditionReduction) {
    throw 'Must provide "conditionReduction"';
  }
  if (!settings.conditionReduction.veryGood) {
    throw 'Must provide "conditionReduction.veryGood"';
  }

  if (!settings.conditionReduction.good) {
    throw 'Must provide "conditionReduction.good"';
  }

  if (!settings.conditionReduction.ok) {
    throw 'Must provide "conditionReduction.ok"';
  }

  if (!settings.branches) {
    throw 'Must provide "branches"';
  }

  if (settings.branches.length === 0) {
    throw 'Must provide entries in "branches"';
  }

  if (settings.branches.length !== settings.branches.filter((x) => x.id).length) {
    throw 'One or several items in "branches" is missing the property "id"';
  }
};

export default verifySettings;
