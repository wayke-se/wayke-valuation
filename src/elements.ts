export const clearInputContainerError = (e: HTMLElement) => {
  const element = e.querySelector('.error');
  if (element) {
    e.removeChild(element);
  }
};

export const setInputContainerError = (e: HTMLElement, errorMessage: string) => {
  const element = e.querySelector('.error');
  if (element) {
    if (element.innerHTML !== errorMessage) {
      element.innerHTML = errorMessage;
    }
  } else {
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.innerText = errorMessage;
    e.appendChild(errorElement);
  }
};

interface CreateTextAreaProps {
  value: string;
  type?: string;
  name?: string;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export const createTextArea = ({ value, name, onChange, onBlur }: CreateTextAreaProps) => {
  const textArea = document.createElement('textarea');
  textArea.value = value;

  if (name) {
    textArea.name = name;
  }

  if (onChange) {
    textArea.addEventListener('input', onChange);
  }

  if (onBlur) {
    textArea.addEventListener('blur', onBlur);
  }

  return textArea;
};

interface CreateOptionProps {
  value: string | number;
  displayName?: string;
  selected?: boolean;
}

export const createOption = ({ value, displayName, selected }: CreateOptionProps) => {
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

interface CreateSelectProps {
  value: string;
  name?: string;
  onChange?: (e: Event) => void;
}

export const createSelect = ({ value, name, onChange }: CreateSelectProps) => {
  const select = document.createElement('select');
  select.value = value;

  if (name) {
    select.name = name;
  }

  if (onChange) {
    select.addEventListener('input', onChange);
  }

  return select;
};

interface CreateInputProps {
  value: string;
  type?: string;
  name?: string;
  autoComplete?: string;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export const createInput = ({
  value,
  type,
  name,
  autoComplete,
  onChange,
  onBlur,
}: CreateInputProps) => {
  const input = document.createElement('input');
  input.value = value;
  if (type) {
    input.type = type;
  }
  if (name) {
    input.name = name;
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

interface CreateInputContainerProps {
  element: HTMLElement;
  heading: string;
  inputElement: HTMLElement;
}

export const createInputContainer = ({
  element,
  heading,
  inputElement,
}: CreateInputContainerProps) => {
  const container = document.createElement('div');
  const _heading = document.createElement('p');
  _heading.innerText = heading;

  container.appendChild(_heading);
  container.appendChild(inputElement);

  element.appendChild(container);
};

interface CreateFrameProps {
  heading: string;
  usp: string[];
  buttonElement: HTMLButtonElement;
}

export const createFrame = ({ heading, usp, buttonElement }: CreateFrameProps) => {
  const _heading = document.createElement('h3');
  _heading.innerText = heading;

  const uspList = document.createElement('ul');
  usp.reverse().forEach((u) => {
    const li = document.createElement('li');
    li.innerText = u;
    uspList.appendChild(li);
  });

  const container = document.createElement('div');
  container.className = 'box';
  container.appendChild(_heading);
  container.appendChild(uspList);
  container.appendChild(buttonElement);

  return container;
};

interface ResultFrameProps {
  heading?: string;
  description: string;
  postDescription?: string;
  buttonElement: HTMLButtonElement;
}

export const resultFrame = ({
  heading,
  description,
  postDescription,
  buttonElement,
}: ResultFrameProps) => {
  const container = document.createElement('div');
  container.className = 'box';
  if (heading) {
    const _heading = document.createElement('p');
    _heading.innerText = heading;
    container.appendChild(_heading);
  }

  const descriptionElement = document.createElement('div');
  const _description = document.createElement('b');
  _description.innerText = description;
  descriptionElement.appendChild(_description);

  if (postDescription) {
    const _postDescription = document.createElement('span');
    _postDescription.innerText = postDescription;
    descriptionElement.appendChild(_postDescription);
  }
  container.appendChild(descriptionElement);
  container.appendChild(buttonElement);

  return container;
};
