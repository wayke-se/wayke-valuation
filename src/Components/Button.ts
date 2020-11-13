interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  const button = document.createElement('button');
  button.setAttribute('data-ecom-button', 'full-width');
  button.innerText = text;
  button.addEventListener('click', onClick);

  return button;
};

export default Button;
