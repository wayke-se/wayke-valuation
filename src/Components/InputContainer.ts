interface InputContainerProps {
  element: HTMLElement;
  heading: string;
  htmlFor: string;
  inputElement: HTMLElement;
}

export const InputContainer = ({
  element,
  heading,
  htmlFor,
  inputElement,
}: InputContainerProps) => {
  const label = document.createElement('label');
  label.setAttribute('data-ecom-input-label', '');
  label.setAttribute('for', htmlFor);
  label.innerText = heading;

  const inputContainer = document.createElement('div');
  inputContainer.setAttribute('data-ecom-inputtext', '');

  inputContainer.appendChild(inputElement);

  element.appendChild(label);
  element.appendChild(inputContainer);
};

export default InputContainer;
