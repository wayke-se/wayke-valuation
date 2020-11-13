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
