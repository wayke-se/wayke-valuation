interface OptionProps {
  value: string | number;
  displayName?: string;
  selected?: boolean;
}

export const Option = ({ value, displayName, selected }: OptionProps) => {
  const option = document.createElement('option');
  option.value = `${value}`;

  if (displayName) {
    option.innerText = displayName;
  }

  if (selected) {
    option.selected = selected;
  }

  return option;
};
export default Option;
