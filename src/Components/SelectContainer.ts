interface SelectContainerProps {
  element: HTMLElement;
  heading: string;
  htmlFor: string;
  inputElement: HTMLElement;
}

export const SelectContainer = ({
  element,
  heading,
  htmlFor,
  inputElement,
}: SelectContainerProps) => {
  const label = document.createElement('label');
  label.setAttribute('data-ecom-input-label', '');
  label.setAttribute('for', htmlFor);
  label.innerText = heading;

  const inputContainer = document.createElement('div');
  inputContainer.setAttribute('data-ecom-select', '');

  inputContainer.appendChild(inputElement);

  element.appendChild(label);
  element.appendChild(inputContainer);
};
