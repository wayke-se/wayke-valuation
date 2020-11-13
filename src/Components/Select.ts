interface SelectProps {
  value: string;
  name?: string;
  onChange?: (e: Event) => void;
}

export const Select = ({ value, name, onChange }: SelectProps) => {
  const select = document.createElement('select');
  select.className = 'select';
  select.value = value;

  if (name) {
    select.name = name;
  }

  if (onChange) {
    select.addEventListener('input', onChange);
  }

  return select;
};
