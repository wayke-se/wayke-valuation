interface InputProps {
  value: string;
  id?: string;
  type?: string;
  name?: string;
  autoComplete?: string;
  placeholder?: string;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export const Input = ({
  value,
  id,
  type,
  name,
  autoComplete,
  placeholder,
  onChange,
  onBlur,
}: InputProps) => {
  const input = document.createElement('input');
  input.value = value;
  if (type) {
    input.type = type;
  }

  if (id) {
    input.id = id;
  }

  if (name) {
    input.name = name;
  }

  if (placeholder) {
    input.placeholder = placeholder;
  }

  if (autoComplete) {
    input.autocomplete = autoComplete;
  }

  if (onChange) {
    input.addEventListener('input', onChange);
  }

  if (onBlur) {
    input.addEventListener('blur', onBlur);
  }
  return input;
};

export default Input;
