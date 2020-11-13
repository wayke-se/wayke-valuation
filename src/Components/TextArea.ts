interface TextAreaProps {
  value: string;
  id?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export const TextArea = ({ value, id, placeholder, name, onChange, onBlur }: TextAreaProps) => {
  const textArea = document.createElement('textarea');
  textArea.value = value;

  if (name) {
    textArea.name = name;
  }

  if (id) {
    textArea.id = id;
  }

  if (placeholder) {
    textArea.placeholder = placeholder;
  }

  if (onChange) {
    textArea.addEventListener('input', onChange);
  }

  if (onBlur) {
    textArea.addEventListener('blur', onBlur);
  }

  return textArea;
};

export default TextArea;
