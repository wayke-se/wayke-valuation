import { Pair } from './@types/Pair';

const separateEveryThirdCharacter = (value: string) => {
  const characters = value.split('').reverse();
  let result = characters[0];

  for (let i = 1; i < characters.length; i += 1) {
    const shouldAddSeparator = i % 3 === 0;

    if (shouldAddSeparator) {
      result = ` ${result}`;
    }

    result = characters[i] + result;
  }

  return result;
};

export const formatPrice = (value: number, decimalSymbol = ',') => {
  if (value === null || value === undefined) {
    return null;
  }

  const roundedValue = Math.round(value);
  const stringValue = `${roundedValue}`;

  const parts = stringValue.split('.');
  const valueBeforeDecimal = parts[0];

  const separated = separateEveryThirdCharacter(valueBeforeDecimal);
  const hasDecimal = parts.length > 1;

  return hasDecimal ? separated + decimalSymbol + parts[1] : separated;
};

export const objToKeyValue = (obj: { [key: string]: string }): Pair[] =>
  Object.keys(obj).map((key) => ({
    key,
    value: obj[key],
  }));
